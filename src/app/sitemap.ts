import type { MetadataRoute } from "next";
import { routes, siteConfig, stores } from "@/config/site";
import { productFamilies, products } from "@/lib/products";

const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap[number] => ({
  url: `${siteConfig.url}${path === "/" ? "" : path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

/** Every public route: static pages, then collections, products and showrooms. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(routes.home, 1, "weekly"),
    entry(routes.collections, 0.9, "weekly"),
    entry(routes.catalogue, 0.9, "weekly"),
    entry(routes.latest, 0.8, "weekly"),
    entry(routes.mens, 0.8, "weekly"),
    entry(routes.womens, 0.8, "weekly"),
    entry(routes.pricing, 0.7, "weekly"),
    entry(routes.services, 0.6, "monthly"),
    entry(routes.warranty, 0.6, "monthly"),
    entry(routes.faq, 0.5, "monthly"),
    entry(routes.appointment, 0.6, "monthly"),
    entry(routes.stores, 0.7, "monthly"),
    entry(routes.contact, 0.7, "monthly"),
    ...stores.map((store) => entry(routes.store(store.slug), 0.6, "monthly")),
    ...productFamilies.map((family) => entry(routes.family(family), 0.7, "weekly")),
    ...products.map((product) => entry(routes.product(product.slug), 0.6, "weekly")),
  ];
}
