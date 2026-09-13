import catalogue from "@/data/products.json";
import { categoryLabel, type Product } from "./product-helpers";

export * from "./product-helpers";

type ProductCatalogue = {
  count: number;
  products: Product[];
};

export const products: readonly Product[] = (catalogue as ProductCatalogue).products;

export const mensProducts = products.filter((product) => product.category === categoryLabel.nam);
export const womensProducts = products.filter((product) => product.category === categoryLabel.nu);

export const productFamilies = Array.from(new Set(products.map((product) => product.familySlug)));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFamilyProducts(familySlug: string) {
  return products.filter((product) => product.familySlug === familySlug);
}

export function getLatestProducts(limit = 48) {
  return products.slice(0, limit);
}

/** Every product sharing the same reference (other dial / strap options). */
export function getVariants(product: Product) {
  return products.filter((candidate) => candidate.familySlug === product.familySlug);
}

/** Same family first (other dial/strap variants), then the rest of the category. */
export function getRelatedProducts(product: Product, limit = 8) {
  const variants = products.filter(
    (candidate) => candidate.familySlug === product.familySlug && candidate.slug !== product.slug,
  );
  const sameCategory = products.filter(
    (candidate) =>
      candidate.category === product.category &&
      candidate.familySlug !== product.familySlug,
  );
  return [...variants, ...sameCategory].slice(0, limit);
}
