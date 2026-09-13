import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type PillLinkProps = ComponentProps<typeof Link> & {
  variant?: "bronze" | "outline" | "paper";
};

const variantClasses = {
  bronze: "border-bronze bg-bronze text-paper hover:bg-bronze-deep hover:border-bronze-deep",
  outline: "border-paper/70 bg-transparent text-paper hover:bg-paper hover:text-ink",
  paper: "border-paper bg-paper text-ink hover:bg-paper/90",
} as const;

/**
 * Rounded call-to-action used across alexanderferros.com ("Discover the
 * collection", "See more"), including its diagonal light sweep on hover.
 */
export function PillLink({ className, children, variant = "bronze", ...props }: PillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group/pill relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border px-7 text-sm font-medium tracking-wide transition-colors duration-300 md:min-h-[51px] md:px-8",
        "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(-45deg,transparent_60%,rgb(255_255_255/0.45)_70%,transparent_100%)] before:bg-[length:250%_250%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full",
        variantClasses[variant],
        className,
      )}
    >
      <span className="relative">{children}</span>
    </Link>
  );
}
