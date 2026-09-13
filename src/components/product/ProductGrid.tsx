"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryLabel, parsePrice, searchProducts, type CategorySlug, type Product } from "@/lib/product-helpers";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type CategoryFilter = "all" | CategorySlug;
type SortOrder = "default" | "price-asc" | "price-desc";

type ProductGridProps = {
  products: readonly Product[];
  /** Hide the men/women tabs when the list is already scoped to one category. */
  showCategoryFilter?: boolean;
  initialCategory?: CategoryFilter;
};

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "nam", label: categoryLabel.nam },
  { value: "nu", label: categoryLabel.nu },
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
];

const toolbarButtonClass =
  "h-10 rounded-full border px-5 text-sm transition-colors duration-200 border-fg/25 text-fg/75 hover:border-fg hover:text-fg";

/** Filterable, searchable catalogue grid (4 columns on desktop like alexanderferros.com). */
export function ProductGrid({ products, showCategoryFilter = true, initialCategory = "all" }: ProductGridProps) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [sort, setSort] = useState<SortOrder>("default");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const scoped = products.filter(
      (product) => category === "all" || product.category === categoryLabel[category],
    );
    const matched = searchProducts(scoped, query);
    if (sort === "price-asc") matched.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === "price-desc") matched.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return matched;
  }, [category, products, query, sort]);

  return (
    <div className="rail">
      <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        {showCategoryFilter ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc danh mục">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={category === option.value}
                onClick={() => setCategory(option.value)}
                className={cn(toolbarButtonClass, category === option.value && "border-fg bg-fg text-surface hover:text-surface")}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 size-4 stroke-[1.5] text-fg/60" aria-hidden="true" />
            <span className="sr-only">Tìm theo tên hoặc mã</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên hoặc mã"
              className="h-10 w-full rounded-full border border-fg/25 bg-transparent pr-4 pl-11 text-sm text-fg placeholder:text-fg/45 focus:border-fg focus:outline-none sm:w-64"
            />
          </label>
          <label className="relative flex items-center">
            <span className="sr-only">Sắp xếp</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOrder)}
              className="h-10 appearance-none rounded-full border border-fg/25 bg-transparent px-5 pr-10 text-sm text-fg focus:border-fg focus:outline-none [&_option]:text-surface"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 size-4 stroke-[1.5] text-fg/60" aria-hidden="true" />
          </label>
        </div>
      </div>

      <p className="type-eyebrow my-6 text-fg/55" aria-live="polite">
        {visible.length} sản phẩm
      </p>

      {visible.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
          {visible.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              headingLevel="h2"
              priority={index < 4}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
            />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-fg/60">Không tìm thấy sản phẩm phù hợp.</p>
      )}
    </div>
  );
}
