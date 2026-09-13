import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/site";
import type { Product } from "@/lib/product-helpers";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  /** `sizes` hint forwarded to next/image. */
  sizes: string;
  headingLevel?: "h2" | "h3";
  className?: string;
  priority?: boolean;
};

/** Watch tile on a warm light surface, shared by carousels and grids. */
export function ProductCard({ product, sizes, headingLevel: Heading = "h3", className, priority = false }: ProductCardProps) {
  const href = routes.product(product.slug);

  return (
    <article className={cn("group/card flex flex-col", className)}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden border border-line bg-tile">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          quality={90}
          priority={priority}
          className="object-contain p-[10%] transition-transform duration-700 ease-out-soft group-hover/card:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="m-0 text-[11px] uppercase tracking-[0.12em] text-fg/55">{product.sku}</p>
        <Heading className="m-0 mt-1.5 text-[15px] font-light leading-snug">
          <Link href={href} className="transition-opacity hover:opacity-60">
            {product.name}
          </Link>
        </Heading>
        <p className="m-0 mt-2 text-sm font-normal">{product.price}</p>
      </div>
    </article>
  );
}
