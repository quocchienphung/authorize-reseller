import type Lenis from "lenis";

/**
 * Tiny bridge between the Lenis instance (owned by <SmoothScroll />) and any
 * component that needs to pause scrolling or follow scroll position. Falls
 * back to native scroll events when Lenis is absent (reduced motion).
 */
let lenisInstance: Lenis | null = null;
let lockCount = 0;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
  if (instance && lockCount > 0) instance.stop();
}

export function lockScroll() {
  lockCount += 1;
  document.documentElement.dataset.scrollLocked = "true";
  lenisInstance?.stop();
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  delete document.documentElement.dataset.scrollLocked;
  lenisInstance?.start();
}

export function scrollToTop(immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Subscribe to the smoothed scroll position. With Lenis the callback runs
 * inside its animation frame (already eased); otherwise on native scroll.
 */
export function onScroll(callback: (y: number) => void) {
  if (lenisInstance) {
    const handler = ({ scroll }: { scroll: number }) => callback(scroll);
    lenisInstance.on("scroll", handler);
    return () => lenisInstance?.off("scroll", handler);
  }
  const handler = () => callback(window.scrollY);
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}

export const SPLASH_DONE_EVENT = "brand:splash-done";
