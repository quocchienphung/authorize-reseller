import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type PillLinkProps = ComponentProps<typeof Link> & {
  /**
   * `solid`   – filled with the foreground colour, inverts on hover (default on surfaces).
   * `outline` – hairline border, fills on hover.
   * `onMedia` – white outline for use over photos / video.
   */
  variant?: "solid" | "outline" | "onMedia";
};

const variantClasses = {
  solid: "border-fg bg-fg text-surface hover:bg-transparent hover:text-fg",
  outline: "border-fg/60 bg-transparent text-fg hover:border-fg hover:bg-fg hover:text-surface",
  onMedia: "border-paper/80 bg-transparent text-paper hover:bg-paper hover:text-ink",
} as const;

/** Monochrome pill call-to-action in the Audemars Piguet register. */
export function PillLink({ className, children, variant = "solid", ...props }: PillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full border px-8 text-[12px] font-medium tracking-[0.16em] uppercase transition-[background-color,color,border-color] duration-300 ease-out",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
