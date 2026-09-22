"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { lockScroll, SPLASH_DONE_EVENT, SPLASH_LEAVE_EVENT, unlockScroll } from "@/components/motion/scroll-controller";
import { BrandMark } from "./BrandMark";
import styles from "./SplashScreen.module.css";

type Phase = "showing" | "leaving" | "hidden";

/** Timings in ms. The wordmark stagger is driven by CSS custom properties. */
const HOLD_DURATION = 2100;
const LEAVE_DURATION = 1100;
const REDUCED_HOLD = 200;
const REDUCED_LEAVE = 200;

/**
 * Opening curtain shown on first load, in the spirit of audemarspiguet.com:
 * a white panel where the emblem and the brand wordmark settle in letter by
 * letter, then the panel lifts to reveal the page.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("showing");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reducedMotion ? REDUCED_HOLD : HOLD_DURATION;
    const leave = reducedMotion ? REDUCED_LEAVE : LEAVE_DURATION;

    root.dataset.splash = "active";
    lockScroll();

    const leaveTimer = window.setTimeout(() => {
      setPhase("leaving");
      window.dispatchEvent(new Event(SPLASH_LEAVE_EVENT));
    }, hold);
    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      delete root.dataset.splash;
      unlockScroll();
      window.dispatchEvent(new Event(SPLASH_DONE_EVENT));
    }, hold + leave);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      if (root.dataset.splash === "active") {
        delete root.dataset.splash;
        unlockScroll();
      }
    };
  }, []);

  if (phase === "hidden") return null;

  const words = siteConfig.splashWordmark.toUpperCase().split(" ");
  let letterIndex = 0;

  return (
    <div className={styles.curtain} data-phase={phase} aria-hidden="true">
      <div className={styles.identity}>
        <BrandMark className={styles.mark} />
        <p className={styles.wordmark}>
          {words.map((word, wordIndex) => (
            <span className={styles.word} key={word}>
              {Array.from(word).map((letter) => {
                const index = letterIndex++;
                return (
                  <span
                    className={styles.letter}
                    style={{ "--letter-index": index } as React.CSSProperties}
                    key={`${wordIndex}-${index}`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <span className={styles.rule} />
      </div>
    </div>
  );
}
