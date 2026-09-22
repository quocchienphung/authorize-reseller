import Link from "next/link";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { routes } from "@/config/site";
import { familyDisplayName, type Product } from "@/lib/product-helpers";

type FamilyIndexProps = {
  products: readonly Product[];
  /** Second heading line, e.g. "đồng hồ nam". */
  secondary: string;
};

/**
 * Text index of every reference family in a listing, so each family page is
 * one click from the category level instead of only reachable via a product.
 */
export function FamilyIndex({ products, secondary }: FamilyIndexProps) {
  const families = new Map<string, number>();
  for (const product of products) families.set(product.familySlug, (families.get(product.familySlug) ?? 0) + 1);
  if (families.size < 2) return null;

  return (
    <nav className="rail border-t border-line py-16 md:py-20" aria-label="Dòng sản phẩm">
      <div data-reveal>
        <SectionHeading primary="DÒNG SẢN PHẨM" secondary={secondary} />
      </div>
      <ul className="m-0 mt-10 flex list-none flex-wrap gap-x-8 gap-y-4 p-0" data-reveal="fade">
        {[...families].map(([slug, count]) => (
          <li key={slug}>
            <Link href={routes.family(slug)} className="text-sm font-light transition-opacity hover:opacity-60">
              {familyDisplayName(slug)} <span className="text-fg/55">· {count} phiên bản</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
