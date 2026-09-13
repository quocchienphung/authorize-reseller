"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { registerLenis, scrollToTop } from "./scroll-controller";

/**
 * Inertia-based smooth scrolling (same feel as the GSAP ScrollSmoother setup
 * used on alexanderferros.com). Native scroll position is still the source of
 * truth, so IntersectionObserver / getBoundingClientRect keep working.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
    });
    registerLenis(lenis);

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  // Client-side navigations should start each page at the top; the initial
  // load keeps the browser's own scroll restoration.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return;
    scrollToTop(true);
  }, [pathname]);

  return null;
}
