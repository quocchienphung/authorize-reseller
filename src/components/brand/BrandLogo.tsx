import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type BrandLogoProps = {
  /** Emblem only — used in the compact fixed header. */
  markOnly?: boolean;
  className?: string;
  markClassName?: string;
};

export function BrandLogo({ markOnly = false, className, markClassName }: BrandLogoProps) {
  return (
    <Link
      href={routes.home}
      aria-label={`${siteConfig.name} – Trang chủ`}
      className={cn("inline-flex items-center gap-3 text-current no-underline", className)}
    >
      <BrandMark className={cn("size-10 shrink-0", markClassName)} />
      {markOnly ? null : (
        <span className="font-display text-[15px] font-thin uppercase tracking-[0.26em] whitespace-nowrap">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
