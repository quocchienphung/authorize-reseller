"use client";

import { useEffect, useRef, useState } from "react";
import { SPLASH_DONE_EVENT } from "@/components/motion/scroll-controller";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

/** How long each brand state rests before the strip advances. */
const HOLD_MS = 2600;
/** Duration of one vertical step; mirrored by the Tailwind `duration-700` class below. */
const TRANSITION_MS = 700;
/** Extra wait after a step so the invisible reset never lands on the last transition frame. */
const SNAP_SLACK_MS = 50;

type BrandItem = { type: "logo" } | { type: "text"; value: string; className: string };

/*
 * The strip ends with a second copy of the logo so the last visible step is
 * a real slide (reseller → logo). Once that step has settled we jump back to
 * item 0 with transitions disabled — both frames are pixel-identical, so the
 * reset is invisible and the loop never plays a reverse or catch-up move.
 */
const brandItems: readonly BrandItem[] = [
  { type: "logo" },
  {
    type: "text",
    value: siteConfig.reseller.name,
    className: "text-[clamp(11px,3.1vw,12.5px)] font-normal tracking-[0.18em] md:text-[13px]",
  },
  {
    type: "text",
    value: siteConfig.reseller.role,
    className: "text-[clamp(8px,2.35vw,9.5px)] font-normal tracking-[0.2em] md:text-[10px] md:tracking-[0.22em]",
  },
  { type: "logo" },
];

const LAST = brandItems.length - 1;

type BrandRotatorProps = {
  /** Sizing for the emblem; the viewport height follows it. */
  markClassName?: string;
  className?: string;
};

/**
 * Header branding as one continuous vertical strip:
 * logo → reseller name → reseller role → logo, forever.
 *
 * React only decides which item is current (one state update per step);
 * the browser's transition engine does the motion. The viewport is a fixed
 * box, so the surrounding navigation never reflows while the strip moves.
 */
export function BrandRotator({ markClassName, className }: BrandRotatorProps) {
  const [index, setIndex] = useState(0);
  // False on first paint and right after the silent reset, so those frames get no transition.
  const [animated, setAnimated] = useState(false);
  const looped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      clearTimeout(timer);
      // Never queue work while the tab is hidden or the opening curtain is still up;
      // `visibilitychange` / the splash-done event restart a clean hold afterwards.
      if (document.hidden || document.documentElement.dataset.splash === "active") return;

      if (index === LAST) {
        timer = setTimeout(() => {
          looped.current = true;
          setAnimated(false);
          setIndex(0);
        }, TRANSITION_MS + SNAP_SLACK_MS);
        return;
      }

      // A resting item waits HOLD; an item that slid in waits its own slide plus HOLD.
      let delay = animated ? TRANSITION_MS + HOLD_MS : HOLD_MS;
      if (!animated && looped.current) delay -= SNAP_SLACK_MS;

      timer = setTimeout(() => {
        // Curtain went up after we were scheduled: stay put, the splash-done event reschedules.
        if (document.documentElement.dataset.splash === "active") return;
        setAnimated(true);
        setIndex(index + 1);
      }, delay);
    };

    schedule();
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener(SPLASH_DONE_EVENT, schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener(SPLASH_DONE_EVENT, schedule);
    };
  }, [index, animated]);

  const motion = animated && "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none";

  return (
    <span
      aria-hidden="true"
      className={cn(
        // Fixed viewport: wide enough for the longest text, narrow enough to never crowd the mobile controls.
        "relative block h-12 w-[min(200px,calc(100vw-2*var(--rail)-168px))] overflow-hidden md:h-[58px] md:w-[220px]",
        className,
      )}
    >
      <span
        className={cn("flex h-full flex-col will-change-transform [backface-visibility:hidden]", motion)}
        style={{ transform: `translate3d(0, ${-index * 100}%, 0)` }}
      >
        {brandItems.map((item, itemIndex) => (
          <span
            key={itemIndex}
            className={cn(
              "flex h-full w-full shrink-0 items-center justify-center [backface-visibility:hidden]",
              motion,
            )}
            // Barely-there opacity shift so the strip reads as one solid mechanism, not a crossfade.
            style={{ opacity: itemIndex === index ? 1 : itemIndex < index ? 0.92 : 0.88 }}
          >
            {item.type === "logo" ? (
              <BrandMark className={cn("size-12 shrink-0", markClassName)} />
            ) : (
              // Size first: tailwind-merge treats `text-[…]` as owning line-height, so `leading-none` must come after it.
              <span className={cn(item.className, "font-sans leading-none uppercase whitespace-nowrap")}>{item.value}</span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
