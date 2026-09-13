"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type ProductCarouselProps = {
  primary: string;
  secondary?: string;
  products: readonly Product[];
  link?: { label: string; href: string };
  className?: string;
};

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-paper/40 transition-[opacity,background-color,color] hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-25";

/**
 * Audemars Piguet style novelty rail: sticky intro column on the left and a
 * free-scrolling track of product tiles on the right.
 */
export function ProductCarousel({
  primary,
  secondary,
  products,
  link = { label: "Xem tất cả sản phẩm", href: routes.catalogue },
  className,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products]);

  function scrollBy(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.72, 260), behavior: "smooth" });
  }

  return (
    <section className={cn("rail-left py-24 md:py-28", className)} aria-label={`${primary} ${secondary ?? ""}`.trim()}>
      <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
        <div className="flex flex-col lg:sticky lg:top-40 lg:self-start" data-reveal>
          <SectionHeading primary={primary} secondary={secondary} />
          <LineLink href={link.href} className="mt-7">
            {link.label}
          </LineLink>
        </div>

        <div className="min-w-0" data-reveal="fade">
          <div
            ref={trackRef}
            tabIndex={0}
            aria-label={`${primary} ${secondary ?? ""}`.trim()}
            className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pr-(--rail) pb-2 focus-visible:outline-none"
          >
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                sizes="(min-width: 1024px) 286px, 72vw"
                className="w-[min(286px,72vw)] shrink-0 snap-start"
              />
            ))}
          </div>

          <div className="mt-8 flex gap-3 pr-(--rail)">
            <button type="button" onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Sản phẩm trước" className={arrowClass}>
              <ArrowLeft className="size-4 stroke-[1.5]" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Sản phẩm tiếp theo" className={arrowClass}>
              <ArrowRight className="size-4 stroke-[1.5]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
