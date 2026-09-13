"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    root.dataset.motion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        node.dataset.revealed = "true";
      } else {
        observer.observe(node);
      }
    }

    return () => {
      observer.disconnect();
      delete root.dataset.motion;
    };
  }, [pathname]);

  return null;
}
