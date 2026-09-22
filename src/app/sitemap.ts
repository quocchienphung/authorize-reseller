import type { MetadataRoute } from "next";
import { routes, stores } from "@/config/site";
import { articleRoute, articles } from "@/lib/articles";
import { productFamilies, products } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** lastModified is only set where a real date exists (articles); catalogue pages carry none rather than a fake "now". */
const entry = (path: string, priority: number, changeFrequency: Frequency, lastModified?: string): MetadataRoute.Sitemap[number] => ({
  url: absoluteUrl(path),
  changeFrequency,
  priority,
  ...(lastModified ? { lastModified } : {}),
});

/**
 * Every indexable route, generated from the same data the pages use, so new
 * products, families, showrooms and articles appear without manual edits.
 * Deliberately absent: /kien-thuc while empty, 404s, and filter query URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(routes.home, 1, "weekly"),
    entry(routes.collections, 0.9, "weekly"),
    entry(routes.catalogue, 0.9, "weekly"),
    entry(routes.mens, 0.9, "weekly"),
    entry(routes.womens, 0.9, "weekly"),
    entry(routes.latest, 0.8, "weekly"),
    entry(routes.pricing, 0.7, "weekly"),
    entry(routes.services, 0.6, "monthly"),
    entry(routes.warranty, 0.6, "monthly"),
    entry(routes.faq, 0.6, "monthly"),
    entry(routes.appointment, 0.5, "monthly"),
    entry(routes.stores, 0.7, "monthly"),
    entry(routes.contact, 0.6, "monthly"),
    ...stores.map((store) => entry(routes.store(store.slug), 0.7, "monthly")),
    ...productFamilies.map((family) => entry(routes.family(family), 0.7, "weekly")),
    ...products.map((product) => entry(routes.product(product.slug), 0.8, "weekly")),
    ...(articles.length ? [entry(routes.knowledge, 0.6, "weekly")] : []),
    ...articles.map((article) => entry(articleRoute(article), 0.6, "monthly", article.updatedAt ?? article.publishedAt)),
  ];
}
