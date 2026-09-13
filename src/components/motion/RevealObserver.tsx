"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SPLASH_DONE_EVENT } from "./scroll-controller";

const REVEAL_SELECTOR = "[data-reveal]";

/**
 * Drives the `data-reveal` CSS hooks in globals.css. Elements already inside
 * the viewport reveal immediately; the rest reveal when scrolled into view.
 * Elements the user jumps past (anchor links, scroll restoration) are revealed
 * without animation so nothing is left hidden above the fold. On the very
 * first load the pass waits for the splash screen to lift so the hero animates
 * in front of the user instead of behind the curtain.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const pending = new Set<HTMLElement>();
    let observer: IntersectionObserver | null = null;
    let frame = 0;
    let cancelled = false;

    const reveal = (node: HTMLElement) => {
      node.dataset.revealed = "true";
      pending.delete(node);
      observer?.unobserve(node);
    };

    // Catch elements that were skipped over by a large scroll jump.
    const revealPassed = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        for (const node of pending) {
          if (node.getBoundingClientRect().bottom < 0) reveal(node);
        }
      });
    };

    const run = () => {
      if (cancelled) return;
      root.dataset.motion = "ready";

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          }
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );

      for (const node of document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)) {
        const rect = node.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
        if (inView) {
          node.dataset.revealed = "true";
        } else {
          pending.add(node);
          observer.observe(node);
        }
      }

      window.addEventListener("scroll", revealPassed, { passive: true });
    };

    if (root.dataset.splash === "active") {
      window.addEventListener(SPLASH_DONE_EVENT, run, { once: true });
    } else {
      run();
    }

    return () => {
      cancelled = true;
      window.removeEventListener(SPLASH_DONE_EVENT, run);
      window.removeEventListener("scroll", revealPassed);
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      delete root.dataset.motion;
    };
  }, [pathname]);

  return null;
}
