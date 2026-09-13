import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Audemars Piguet style underlined text link. */
export function LineLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "relative inline-block self-start text-sm font-medium leading-6 transition-opacity duration-200 hover:opacity-60",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:content-['']",
        className,
      )}
    >
      {children}
    </Link>
  );
}
