"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  showControl?: boolean;
};

/** Muted looping video that only plays while on screen. */
export function AutoplayVideo({ src, poster, label, className, showControl = true }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () =>
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) {
          void play();
          return;
        }
        video.pause();
        setPlaying(false);
      },
      { rootMargin: "20% 0px", threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      pausedByUser.current = true;
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      {showControl ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Tạm dừng ${label}` : `Phát ${label}`}
          className="absolute right-(--rail) bottom-8 z-10 inline-flex size-[42px] items-center justify-center rounded-none border border-paper/70 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
        </button>
      ) : null}
    </div>
  );
}
