"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxMediaProps = {
  children: ReactNode;
  /** Extra height (as a fraction of the frame) that gives the media room to slide. */
  overscan?: number;
  className?: string;
  mediaClassName?: string;
};

/**
 * Full-bleed image frame whose media drifts slower than the page, recreating
 * the `parallax-section` / `image-wrapper` behaviour from alexanderferros.com.
 * Runs entirely on transform so it composites on the GPU.
 */
export function ParallaxMedia({ children, overscan = 0.2, className, mediaClassName }: ParallaxMediaProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let visible = false;

    const paint = () => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the frame's top hits the bottom of the viewport, 1 when its bottom leaves the top.
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
      // Media is taller than the frame and anchored to its top; sliding it from
      // -travel to 0 makes it move slower than the page (classic background parallax).
      const travel = rect.height * overscan;
      media.style.transform = `translate3d(0, ${(-travel * (1 - progress)).toFixed(2)}px, 0)`;
    };

    const request = () => {
      if (!visible || ticking) return;
      ticking = true;
      window.requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) request();
    }, { rootMargin: "10% 0px" });

    observer.observe(frame);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    paint();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [overscan]);

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden bg-ink", className)}>
      <div
        ref={mediaRef}
        className={cn("absolute inset-x-0 top-0 will-change-transform", mediaClassName)}
        style={{ height: `${100 + overscan * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
