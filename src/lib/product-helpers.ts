/**
 * Pure helpers and types that client components can import without pulling
 * the full catalogue JSON into the browser bundle. Data queries live in
 * `./products.ts`.
 */
import { routes } from "@/config/site";

export type ProductCategory = "Đồng hồ nam" | "Đồng hồ nữ";
export type CategorySlug = "nam" | "nu";

export type Product = {
  /** Hero product shot used on cards and as the first gallery frame. */
  image: string;
  /** Official photography for this exact variant (wrist, detail and lifestyle shots). */
  images: string[];
  name: string;
  sku: string;
  slug: string;
  price: string;
  variantId: string;
  category: ProductCategory;
  familySlug: string;
  description: string;
  specifications: [string, string][];
};

export const categoryLabel: Record<CategorySlug, ProductCategory> = {
  nam: "Đồng hồ nam",
  nu: "Đồng hồ nữ",
};

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return value === "nam" || value === "nu";
}

/** Listing route for the category a product belongs to. */
export function categoryRoute(product: Pick<Product, "category">) {
  return product.category === categoryLabel.nam ? routes.mens : routes.womens;
}

/** "alexander-ferros-2241s" -> "2241S" */
export function familyReference(familySlug: string) {
  return familySlug.replace(/^alexander-ferros-/, "").replaceAll("-", " ").toUpperCase();
}

export function familyDisplayName(familySlug: string) {
  return `Alexander Ferros ${familyReference(familySlug)}`;
}

export function getSpecification(product: Product, pattern: RegExp) {
  return product.specifications.find(([label]) => pattern.test(label))?.[1];
}

export function parsePrice(price: string) {
  return Number(price.replace(/\D/g, ""));
}

export function searchProducts(source: readonly Product[], query: string) {
  const normalized = query.trim().toLocaleLowerCase("vi");
  if (!normalized) return [...source];
  return source.filter((product) =>
    `${product.name} ${product.sku}`.toLocaleLowerCase("vi").includes(normalized),
  );
}
