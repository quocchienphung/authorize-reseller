"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./Site.module.css";

type AutoVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  label: string;
  showControl?: boolean;
};

export function AutoVideo({
  src,
  poster,
  className = "",
  label,
  showControl = true,
}: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !manuallyPausedRef.current) {
          void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
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

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPausedRef.current = false;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      manuallyPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={`${styles.videoShell} ${className}`}>
      <video
        ref={videoRef}
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
          className={styles.videoControl}
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      ) : null}
    </div>
  );
}

