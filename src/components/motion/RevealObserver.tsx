"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SPLASH_DONE_EVENT } from "./scroll-controller";

const REVEAL_SELECTOR = "[data-reveal]";

/**
 * Drives the `data-reveal` CSS hooks in globals.css. Elements already inside
 * the viewport reveal immediately; the rest reveal when scrolled into view.
 * On the very first load the pass waits for the splash screen to lift so the
 * hero animates in front of the user instead of behind the curtain.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let observer: IntersectionObserver | null = null;
    let safetyTimer = 0;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
      root.dataset.motion = "ready";

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );

      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
        if (inView) node.dataset.revealed = "true";
        else observer.observe(node);
      }

      // Never leave content hidden if an observer callback is missed.
      safetyTimer = window.setTimeout(() => {
        for (const node of nodes) node.dataset.revealed = "true";
        observer?.disconnect();
      }, 4000);
    };

    if (root.dataset.splash === "active") {
      window.addEventListener(SPLASH_DONE_EVENT, run, { once: true });
    } else {
      run();
    }

    return () => {
      cancelled = true;
      window.removeEventListener(SPLASH_DONE_EVENT, run);
      window.clearTimeout(safetyTimer);
      observer?.disconnect();
      delete root.dataset.motion;
    };
  }, [pathname]);

  return null;
}
