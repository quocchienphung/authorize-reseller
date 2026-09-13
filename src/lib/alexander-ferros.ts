import catalogue from "@/data/alexander-ferros-products.json";

export type AlexanderFerrosProduct = {
  image: string;
  name: string;
  sku: string;
  slug: string;
  price: string;
  variantId: string;
  category: "Đồng hồ nam" | "Đồng hồ nữ";
  familySlug: string;
  description: string;
  specifications: [string, string][];
};

type Catalogue = {
  count: number;
  products: AlexanderFerrosProduct[];
};

export const productCatalogue = catalogue as Catalogue;
export const products = productCatalogue.products;
export const productFamilies = Array.from(new Set(products.map((product) => product.familySlug)));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFamilyProducts(familySlug: string) {
  return products.filter((product) => product.familySlug === familySlug);
}

export function familyDisplayName(familySlug: string) {
  const model = familySlug.replace(/^alexander-ferros-/, "").replaceAll("-", " ").toUpperCase();
  return `Alexander Ferros ${model}`;
}

export function getRelatedProducts(product: AlexanderFerrosProduct, limit = 8) {
  const sameFamily = products.filter(
    (candidate) => candidate.familySlug === product.familySlug && candidate.slug !== product.slug,
  );
  const sameCategory = products.filter(
    (candidate) =>
      candidate.category === product.category &&
      candidate.familySlug !== product.familySlug &&
      candidate.slug !== product.slug,
  );
  return [...sameFamily, ...sameCategory].slice(0, limit);
}

export function specificationValue(product: AlexanderFerrosProduct, pattern: RegExp) {
  return product.specifications.find(([label]) => pattern.test(label))?.[1];
}
