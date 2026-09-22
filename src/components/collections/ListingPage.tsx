import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { CoverPicture } from "@/components/media/CoverPicture";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/typography/SectionHeading";
import type { CategorySlug, Product } from "@/lib/products";

type ListingPageProps = {
  breadcrumbs: readonly Crumb[];
  heading: { primary: string; secondary?: string };
  description?: string;
  products: readonly Product[];
  cover?: { desktopSrc: string; mobileSrc: string; alt: string };
  showCategoryFilter?: boolean;
  initialCategory?: "all" | CategorySlug;
  /** Extra sections rendered before the grid (family story, carousels…). */
  children?: ReactNode;
  /** Sections rendered after the grid (reference index…). */
  after?: ReactNode;
};

/**
 * Catalogue listing modelled on alexanderferros.com/en/products/mens-watches:
 * wide cover, breadcrumbs, then a 4-column product grid.
 */
export function ListingPage({
  breadcrumbs,
  heading,
  description,
  products,
  cover,
  showCategoryFilter = true,
  initialCategory = "all",
  children,
  after,
}: ListingPageProps) {
  return (
    <PageShell solidHeader>
      {cover ? (
        <div className="relative aspect-[9/16] w-full overflow-hidden md:aspect-[5/2]" data-reveal="media">
          <CoverPicture desktopSrc={cover.desktopSrc} mobileSrc={cover.mobileSrc} alt={cover.alt} priority />
        </div>
      ) : null}

      <Breadcrumbs items={breadcrumbs} className="mt-2" />

      <header className="rail pt-10 pb-12 md:pt-14 md:pb-16" data-reveal>
        <SectionHeading as="h1" primary={heading.primary} secondary={heading.secondary} />
        {description ? <p className="type-body mt-6 max-w-2xl text-fg/75">{description}</p> : null}
      </header>

      {children}

      <section id="san-pham" className="pb-24 md:pb-32" aria-label="Danh sách sản phẩm">
        <ProductGrid key={initialCategory} products={products} showCategoryFilter={showCategoryFilter} initialCategory={initialCategory} />
      </section>

      {after}
    </PageShell>
  );
}
