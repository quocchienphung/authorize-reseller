import catalogue from "@/data/products.json";

export type ProductCategory = "Đồng hồ nam" | "Đồng hồ nữ";
export type CategorySlug = "nam" | "nu";

export type Product = {
  image: string;
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

type ProductCatalogue = {
  count: number;
  products: Product[];
};

export const products: readonly Product[] = (catalogue as ProductCatalogue).products;

export const categoryBySlug: Record<CategorySlug, ProductCategory> = {
  nam: "Đồng hồ nam",
  nu: "Đồng hồ nữ",
};

export const categoryLabel: Record<CategorySlug, string> = {
  nam: "Đồng hồ nam",
  nu: "Đồng hồ nữ",
};

export const mensProducts = products.filter((product) => product.category === categoryBySlug.nam);
export const womensProducts = products.filter((product) => product.category === categoryBySlug.nu);

export const productFamilies = Array.from(new Set(products.map((product) => product.familySlug)));

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return value === "nam" || value === "nu";
}

export function getProductsByCategory(category: CategorySlug) {
  return category === "nam" ? mensProducts : womensProducts;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFamilyProducts(familySlug: string) {
  return products.filter((product) => product.familySlug === familySlug);
}

/** "alexander-ferros-2241s" -> "2241S" */
export function familyReference(familySlug: string) {
  return familySlug.replace(/^alexander-ferros-/, "").replaceAll("-", " ").toUpperCase();
}

export function familyDisplayName(familySlug: string) {
  return `Alexander Ferros ${familyReference(familySlug)}`;
}

export function getLatestProducts(limit = 48) {
  return products.slice(0, limit);
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

export function getVariants(product: Product) {
  return products.filter((candidate) => candidate.familySlug === product.familySlug);
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
