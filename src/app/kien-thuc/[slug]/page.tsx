import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/KnowledgePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleRoute, articles, getArticle } from "@/lib/articles";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type ArticleRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Không tìm thấy bài viết", robots: { index: false } };
  return pageMetadata({ title: article.title, description: article.excerpt, path: articleRoute(article) });
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <ArticlePage article={article} />
    </>
  );
}
