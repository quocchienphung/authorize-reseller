"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SPLASH_DONE_EVENT, SPLASH_LEAVE_EVENT } from "./scroll-controller";

const REVEAL_SELECTOR = "[data-reveal]";

/**
 * Drives the `data-reveal` CSS hooks in globals.css. Elements already inside
 * the viewport reveal immediately; the rest reveal when scrolled into view.
 * Elements the user jumps past (anchor links, scroll restoration) are revealed
 * without animation so nothing is left hidden above the fold. On the very
 * first load the pass waits for the splash screen to lift so the hero animates
 * in front of the user instead of behind the curtain.
 *
 * While the curtain is up the targets stay painted underneath it (the curtain
 * covers them, so nothing is visible), which lets the browser record the
 * Largest Contentful Paint at first paint instead of ~3 s later. They are
 * hidden — instantly, transitions are off under `data-splash` — the moment the
 * curtain starts lifting, and animate in exactly as before once it is gone.
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

    // Hide reveal targets so they can animate in once `run` marks them. With
    // the splash up this waits for the curtain to start leaving (see above).
    const hide = () => {
      root.dataset.motion = "ready";
    };

    const run = () => {
      if (cancelled) return;
      // Mounted after the curtain had already started leaving: hide now, reveal a frame later.
      if (root.dataset.motion !== "ready") {
        hide();
        frame = window.requestAnimationFrame(run);
        return;
      }

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
      window.addEventListener(SPLASH_LEAVE_EVENT, hide, { once: true });
      window.addEventListener(SPLASH_DONE_EVENT, run, { once: true });
    } else {
      hide();
      // One frame later so in-view elements have painted hidden and transition in.
      frame = window.requestAnimationFrame(run);
    }

    return () => {
      cancelled = true;
      window.removeEventListener(SPLASH_LEAVE_EVENT, hide);
      window.removeEventListener(SPLASH_DONE_EVENT, run);
      window.removeEventListener("scroll", revealPassed);
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      delete root.dataset.motion;
      for (const node of document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)) delete node.dataset.revealed;
    };
  }, [pathname]);

  return null;
}
