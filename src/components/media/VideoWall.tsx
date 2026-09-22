"use client";

import { useEffect, useRef } from "react";
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

/**
 * Four portrait films shown uncropped. Desktop: one 2.25:1 wall of four
 * 9:16 columns. Mobile: full-width 9:16 frames in a native horizontal snap
 * rail — the only element on the page that scrolls sideways. One observer
 * plays / pauses all films together while the wall is on screen.
 */
export function VideoWall({ films, className }: VideoWallProps) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const videos = Array.from(rail.querySelectorAll("video"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videos.forEach((video) => void video.play().catch(() => undefined));
          return;
        }
        videos.forEach((video) => video.pause());
      },
      { rootMargin: "20% 0px", threshold: 0.05 },
    );

    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className={cn(
        // Mobile: one full-width frame per swipe, scrollbar hidden, horizontal pans stay inside this box.
        "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none [touch-action:pan-x_pan-y] bg-ink",
        // Desktop: four equal 9:16 columns forming one 2.25:1 wall, no gaps.
        "md:grid md:aspect-[2.25/1] md:grid-cols-4 md:overflow-hidden",
        className,
      )}
    >
      {films.map((film) => (
        <div
          key={film.src}
          className="aspect-[9/16] w-full shrink-0 snap-start md:h-full md:w-auto md:min-w-0"
        >
          <video
            className="block h-full w-full object-contain"
            muted
            loop
            playsInline
            preload="metadata"
            poster={film.poster}
            aria-label={film.label}
          >
            <source src={film.src} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}
