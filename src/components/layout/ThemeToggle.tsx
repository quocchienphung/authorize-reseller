"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/config/site";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function resolveTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", onChange);
  };
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the attribute still applies.
  }
  for (const notify of listeners) notify();
}

/** Sun / moon switch. Follows the OS until the visitor picks a side. */
export function ThemeToggle({ className }: { className?: string }) {
  // Server snapshot is "dark" (the brand default); the client corrects it after hydration.
  const theme = useSyncExternalStore(subscribe, resolveTheme, () => "dark" as Theme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      className={cn("inline-flex size-[38px] items-center justify-center transition-opacity hover:opacity-60", className)}
    >
      {isDark ? <Sun className="size-[22px] stroke-[1.35]" aria-hidden="true" /> : <Moon className="size-[22px] stroke-[1.35]" aria-hidden="true" />}
    </button>
  );
}
