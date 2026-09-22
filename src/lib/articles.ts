/**
 * Knowledge-base ("Kiến thức") registry. Articles are plain data so they are
 * server-rendered, statically generated and listed in the sitemap without a
 * CMS. Adding an entry here gives it a route, metadata, breadcrumbs and
 * JSON-LD; while the list is empty the /kien-thuc routes return 404 and stay
 * out of the sitemap, so nothing thin is ever published.
 *
 * Suggested first clusters (write them one at a time, for real readers):
 *   alexander-ferros-cua-nuoc-nao · dong-ho-alexander-ferros-co-tot-khong ·
 *   dong-ho-automatic-la-gi · kinh-sapphire-la-gi · cach-chon-size-dong-ho ·
 *   miyota-8215-la-gi
 */
import { routes } from "@/config/site";

export type ArticleSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type Article = {
  slug: string;
  title: string;
  /** Meta description and listing teaser (≤ 160 characters). */
  excerpt: string;
  /** ISO date; also the sitemap lastModified. */
  publishedAt: string;
  updatedAt?: string;
  sections: readonly ArticleSection[];
  /** Commercial pages this article supports, rendered as descriptive links. */
  related: readonly { label: string; href: string }[];
};

export const articles: readonly Article[] = [];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleRoute(article: Pick<Article, "slug">) {
  return routes.article(article.slug);
}
