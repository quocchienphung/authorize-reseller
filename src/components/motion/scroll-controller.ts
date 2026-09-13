import type Lenis from "lenis";

/**
 * Tiny bridge between the Lenis instance (owned by <SmoothScroll />) and any
 * component that needs to pause scrolling, e.g. the splash screen or the
 * navigation drawer. Falls back to a plain overflow lock when Lenis is absent.
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

export const SPLASH_DONE_EVENT = "brand:splash-done";
