import Image from "next/image";
import type { ReactNode } from "react";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { cn } from "@/lib/utils";

type ParallaxCoverProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  /** Overlay content: headings, copy and call-to-action. */
  children: ReactNode;
  /** Where the overlay content sits on desktop; mobile always centres at the bottom. */
  align?: "start" | "end" | "center";
  /** Frame proportions. `landscape` is the products page, `hero` the homepage banner. */
  ratio?: "landscape" | "hero";
  veil?: boolean;
  priority?: boolean;
  className?: string;
};

const alignClasses = {
  start: "lg:justify-start lg:text-left",
  center: "lg:justify-center lg:text-center",
  end: "lg:justify-end lg:text-right",
} as const;

const ratioClasses = {
  landscape: "aspect-[9/16] max-h-screen lg:aspect-video",
  hero: "aspect-[2/3] md:aspect-[3/2]",
} as const;

/**
 * Full-width cover image with a slow parallax drift — the signature block of
 * alexanderferros.com ("Our collection", "Men watches", "Woman watches").
 */
export function ParallaxCover({
  desktopSrc,
  mobileSrc,
  alt,
  children,
  align = "start",
  ratio = "landscape",
  veil = false,
  priority = false,
  className,
}: ParallaxCoverProps) {
  return (
    <section className={cn("relative w-full", ratioClasses[ratio], className)}>
      <ParallaxMedia className="absolute inset-0" overscan={ratio === "landscape" ? 0.2 : 0.16}>
        <Image src={desktopSrc} alt={alt} fill priority={priority} sizes="100vw" quality={90} className="object-cover max-md:hidden" />
        <Image src={mobileSrc} alt={alt} fill priority={priority} sizes="100vw" quality={90} className="object-cover md:hidden" />
      </ParallaxMedia>
      {veil ? <div className="pointer-events-none absolute inset-0 z-[1] bg-ink/40" aria-hidden="true" /> : null}
      <div
        className={cn(
          "rail absolute inset-0 z-[2] flex items-end justify-center text-center text-paper",
          ratio === "hero" && "lg:items-center",
          alignClasses[align],
        )}
      >
        <div className={cn("max-w-[35rem] 2xl:max-w-[52rem]", ratio === "hero" ? "py-10" : "pb-10")} data-reveal>
          {children}
        </div>
      </div>
    </section>
  );
}
