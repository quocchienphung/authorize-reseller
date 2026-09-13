import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductMosaicProps = {
  primary: string;
  secondary?: string;
  products: readonly Product[];
  link: { label: string; href: string };
};

/**
 * Lookbook-style grid from the Audemars Piguet homepage: one large tile and
 * four supporting tiles, all linking to product pages.
 */
export function ProductMosaic({ primary, secondary, products, link }: ProductMosaicProps) {
  const tiles = products.slice(0, 5);

  return (
    <section className="rail py-24 md:py-28" aria-label={`${primary} ${secondary ?? ""}`.trim()}>
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
        <SectionHeading primary={primary} secondary={secondary} />
        <LineLink href={link.href}>{link.label}</LineLink>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-[300px_300px]">
        {tiles.map((product, index) => {
          const isHero = index === 0;
          return (
            <Link
              key={product.slug}
              href={routes.product(product.slug)}
              data-reveal="media"
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className={cn(
                "group/tile relative block overflow-hidden border border-line bg-tile",
                isHero ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square md:aspect-auto",
              )}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={90}
                sizes={isHero ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-contain p-[8%] transition-transform duration-700 ease-out-soft group-hover/tile:scale-[1.05]"
              />
              <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-fg/85 px-3 py-2 text-xs text-surface">
                {product.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
