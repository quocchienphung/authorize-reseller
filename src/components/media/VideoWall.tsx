"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type WallFilm = {
  src: string;
  poster: string;
  label: string;
};

type VideoWallProps = {
  /** Portrait (9:16) films, rendered left → right in this order. */
  films: readonly WallFilm[];
  className?: string;
};

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
/** Vertical scroll (in viewport heights) that carries the belt one full frame. */
const SCROLL_PER_FRAME = 0.75;
/** How far the rendered belt closes on its target each frame: scrolling / settling / under the finger. */
const FOLLOW = 0.16;
const SETTLE = 0.11;
const DRAG_FOLLOW = 0.45;
/** No scroll change for this long counts as a stop → the belt parks on the nearest frame. */
const IDLE_MS = 140;
/** Finger travel before a horizontal drag is recognised, and the swipe that turns the belt one frame. */
const DRAG_START_PX = 6;
const SWIPE_FRACTION = 0.18;
const SWIPE_VELOCITY = 350; // px / s

/**
 * Four portrait films shown uncropped. Desktop: one 2.25:1 wall of four
 * 9:16 columns. Mobile: the same frames on an endless belt (1 → 2 → 3 → 4 →
 * 1 …) that the page scroll turns — scrolling down carries it left at the
 * visitor's own pace, scrolling up carries it back. When the finger stops,
 * the belt parks on the nearest whole frame. A horizontal swipe on the films
 * turns the belt one frame either way, looping without end. The section stays
 * in normal document flow: nothing is pinned and vertical scrolling is never
 * intercepted (touch-action: pan-y leaves it to the browser). One
 * requestAnimationFrame loop writes the transform straight to the DOM.
 */
export function VideoWall({ films, className }: VideoWallProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Belt mode is decided after mount; the server-rendered fallback is a native swipe rail.
  const [belt, setBelt] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    const update = () => setBelt(mobile.matches && !reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    if (window.matchMedia(REDUCED_QUERY).matches) return;

    const items = Array.from(track.children) as HTMLElement[];
    const videos = items.map((item) => item.querySelector("video")).filter((video): video is HTMLVideoElement => video !== null);

    if (!belt) {
      // Desktop wall: the first set plays together while on screen; the duplicate set is display:none.
      const shown = videos.slice(0, films.length);
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) shown.forEach((video) => void video.play().catch(() => undefined));
          else shown.forEach((video) => video.pause());
        },
        { rootMargin: "20% 0px", threshold: 0.05 },
      );
      observer.observe(rail);
      return () => observer.disconnect();
    }

    const count = films.length;
    let frameW = 1;
    let railW = 1;
    let loopW = 1;
    let pxPerFrame = 1;
    const measure = () => {
      frameW = items[0]?.offsetWidth || 1;
      railW = rail.clientWidth || 1;
      loopW = frameW * count;
      pxPerFrame = Math.max(1, window.innerHeight * SCROLL_PER_FRAME);
    };

    // Belt position in px along the endless track (unbounded; wrapped only when painted).
    let target = 0;
    let rendered = 0;
    let lastY = window.scrollY;
    let lastScrollAt = 0;
    let near = false;
    let frame = 0;
    const playing = new Array<boolean>(items.length).fill(false);

    const paint = () => {
      const offset = ((rendered % loopW) + loopW) % loopW;
      track.style.transform = `translate3d(${(-offset).toFixed(2)}px, 0, 0)`;
      // Only the frames actually inside the rail play; the rest wait silently.
      for (let i = 0; i < items.length; i++) {
        const x = i * frameW - offset;
        const visible = near && x + frameW > -frameW * 0.5 && x < railW + frameW * 0.5;
        if (visible === playing[i]) continue;
        playing[i] = visible;
        const video = videos[i];
        if (!video) continue;
        if (visible) void video.play().catch(() => undefined);
        else video.pause();
      }
    };

    // Drag state (pointer events; the browser keeps vertical pans for itself via touch-action: pan-y).
    let pointerId = -1;
    let dragging = false;
    let downX = 0;
    let downY = 0;
    let downTarget = 0;
    let dragX = 0;
    let dragAt = 0;
    let dragVelocity = 0;

    const nearestFrame = (value: number) => Math.round(value / frameW) * frameW;

    const loop = (now: number) => {
      const y = window.scrollY;
      if (y !== lastY) {
        // Scroll-linked: the belt travels with the page, one frame per SCROLL_PER_FRAME viewports.
        if (!dragging) target += ((y - lastY) / pxPerFrame) * frameW;
        lastY = y;
        lastScrollAt = now;
      }
      const idle = now - lastScrollAt > IDLE_MS;
      // Finger lifted → park on the nearest whole frame so nothing is cut off.
      if (idle && !dragging) target = nearestFrame(target);

      const ease = dragging ? DRAG_FOLLOW : idle ? SETTLE : FOLLOW;
      rendered += (target - rendered) * ease;
      if (Math.abs(target - rendered) < 0.05) rendered = target;
      paint();

      if (idle && !dragging && rendered === target) {
        // Parked: rebase so the unbounded counters never grow, and sleep until the next gesture.
        const base = Math.floor(rendered / loopW) * loopW;
        rendered -= base;
        target -= base;
        frame = 0;
        return;
      }
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame || !near) return;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const wake = () => {
      lastScrollAt = performance.now();
      start();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      dragging = false;
      downX = dragX = event.clientX;
      downY = event.clientY;
      dragAt = event.timeStamp;
      dragVelocity = 0;
      downTarget = nearestFrame(target);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - downX;
      if (!dragging) {
        const dy = event.clientY - downY;
        // Wait for a clear sideways intent; a vertical gesture belongs to the page.
        if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) < Math.abs(dy)) return;
        dragging = true;
        rail.setPointerCapture(pointerId);
      }
      const dt = Math.max(1, event.timeStamp - dragAt);
      dragVelocity = ((event.clientX - dragX) / dt) * 1000;
      dragX = event.clientX;
      dragAt = event.timeStamp;
      target = downTarget - dx; // finger left → belt left → next film
      wake();
    };
    const release = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = -1;
      if (!dragging) return;
      dragging = false;
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
      // A real swipe (distance or flick) turns exactly one frame in its direction; anything less springs back.
      const travelled = target - downTarget;
      const flick = Math.abs(dragVelocity) > SWIPE_VELOCITY ? -Math.sign(dragVelocity) : 0;
      const step = Math.abs(travelled) > frameW * SWIPE_FRACTION ? Math.sign(travelled) : flick;
      target = downTarget + step * frameW;
      lastScrollAt = 0; // count as idle so the belt settles straight away
      wake();
    };

    // Belt and films run only while the wall is near the viewport; the position is kept, so nothing jumps on return.
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) {
          lastY = window.scrollY;
          wake();
        } else {
          // Out of sight: park instantly so the wall is whole the moment it comes back.
          stop();
          target = nearestFrame(target);
          rendered = target;
          paint();
        }
      },
      { rootMargin: "40% 0px" },
    );
    const onResize = () => {
      measure();
      target = nearestFrame(target);
      rendered = target;
      paint();
    };

    measure();
    paint();
    observer.observe(rail);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", onResize);
    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", release);
    rail.addEventListener("pointercancel", release);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onResize);
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", release);
      rail.removeEventListener("pointercancel", release);
      track.style.transform = "";
      videos.forEach((video) => video.pause());
    };
  }, [belt, films.length]);

  return (
    <div
      ref={railRef}
      className={cn(
        "bg-ink",
        // Mobile fallback (no JS / reduced motion): one full-width frame per swipe, horizontal pans stay inside this box.
        // Belt: vertical pans stay with the browser, sideways drags reach the pointer handlers.
        belt
          ? "overflow-hidden select-none [touch-action:pan-y]"
          : "overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none [touch-action:pan-x_pan-y]",
        // Desktop: four equal 9:16 columns forming one 2.25:1 wall, no gaps.
        "md:aspect-[2.25/1] md:overflow-hidden",
        className,
      )}
    >
      {/* Belt: the four frames twice over, so the wrap from 4 back to 1 is invisible; the duplicate set only exists in belt mode. */}
      <div
        ref={trackRef}
        className="flex will-change-transform [backface-visibility:hidden] md:grid md:h-full md:grid-cols-4 md:will-change-auto"
      >
        {[...films, ...films].map((film, index) => {
          const duplicate = index >= films.length;
          return (
            <div
              key={`${film.src}-${index}`}
              className={cn("aspect-[9/16] w-full shrink-0 md:h-full md:w-auto md:min-w-0", !belt && "snap-start", duplicate && (belt ? "md:hidden" : "hidden"))}
              aria-hidden={duplicate || undefined}
            >
              <video
                className="block h-full w-full object-contain"
                muted
                loop
                playsInline
                preload="metadata"
                poster={film.poster}
                aria-label={duplicate ? undefined : film.label}
              >
                <source src={film.src} type="video/mp4" />
              </video>
            </div>
          );
        })}
      </div>
    </div>
  );
}
