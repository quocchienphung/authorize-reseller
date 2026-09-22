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
/** Belt drift while the page is still, in frame widths per second. */
const IDLE_SPEED = 1 / 9;
/** Belt pixels travelled per pixel of vertical scroll. */
const SCROLL_GAIN = 0.9;
/** Fastest the belt may go, in frame widths per second. */
const MAX_SPEED = 3;
/** How quickly the belt takes on / sheds the finger's speed (per frame). */
const INERTIA = 0.12;

/**
 * Four portrait films shown uncropped. Desktop: one 2.25:1 wall of four
 * 9:16 columns. Mobile: the same frames on an endless belt that glides
 * right → left (1 → 2 → 3 → 4 → 1 …) at a pace set by how fast the visitor
 * scrolls — faster scrolling turns the belt faster, either way, with a slow
 * drift when the page is still. The section stays in normal document flow:
 * nothing is pinned and vertical scrolling is never intercepted. One
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
    const measure = () => {
      frameW = items[0]?.offsetWidth || 1;
      railW = rail.clientWidth || 1;
      loopW = frameW * count;
    };

    let offset = 0;
    let speed = 0; // px / s, positive = belt moves left
    let scrollVel = 0; // px / s of the page
    let lastY = window.scrollY;
    let lastNow = 0;
    let near = false;
    let frame = 0;
    const playing = new Array<boolean>(items.length).fill(false);

    const paint = () => {
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

    const loop = (now: number) => {
      const dt = lastNow ? Math.min((now - lastNow) / 1000, 0.05) : 1 / 60;
      lastNow = now;

      const y = window.scrollY;
      const rawVel = (y - lastY) / dt;
      lastY = y;
      scrollVel += (rawVel - scrollVel) * INERTIA;

      const target = IDLE_SPEED * frameW + SCROLL_GAIN * scrollVel;
      const limit = MAX_SPEED * frameW;
      speed += (Math.max(-limit, Math.min(limit, target)) - speed) * INERTIA;

      offset = (((offset + speed * dt) % loopW) + loopW) % loopW;
      paint();
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame) return;
      lastNow = 0;
      lastY = window.scrollY;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    // Belt and films run only while the wall is near the viewport; the offset is kept, so nothing jumps on return.
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) start();
        else {
          stop();
          paint();
        }
      },
      { rootMargin: "40% 0px" },
    );
    const onResize = () => {
      measure();
      paint();
    };

    measure();
    paint();
    observer.observe(rail);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
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
        belt
          ? "overflow-hidden"
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
