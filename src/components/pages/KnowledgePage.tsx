import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { routes } from "@/config/site";
import { articleRoute, type Article } from "@/lib/articles";

const dateFormat = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "long", year: "numeric" });

/** Knowledge hub: one card per article, newest first. */
export function KnowledgePage({ articles }: { articles: readonly Article[] }) {
  const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <PageShell solidHeader>
      <PageIntro
        eyebrow="Kiến thức"
        primary="HIỂU VỀ"
        secondary="đồng hồ"
        description="Xuất xứ thương hiệu, bộ máy, chất liệu và cách chọn một chiếc Alexander Ferros phù hợp."
      />
      <section className="rail pb-28" aria-label="Danh sách bài viết">
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
          {sorted.map((article, index) => (
            <li
              key={article.slug}
              className="flex flex-col border border-line p-8 md:p-10"
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <p className="type-eyebrow m-0 text-fg/55">{dateFormat.format(new Date(article.publishedAt))}</p>
              <h2 className="m-0 mt-4 text-2xl font-light">
                <Link href={articleRoute(article)} className="transition-opacity hover:opacity-60">
                  {article.title}
                </Link>
              </h2>
              <p className="type-body mt-4 text-fg/70">{article.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

/** One article: breadcrumbs, H1, H2 sections, then descriptive links into the catalogue. */
export function ArticlePage({ article }: { article: Article }) {
  return (
    <PageShell solidHeader>
      <Breadcrumbs className="mt-2" items={[{ label: "Kiến thức", href: routes.knowledge }, { label: article.title }]} />
      <article className="rail pt-8 pb-28">
        <header className="max-w-3xl" data-reveal>
          <p className="type-eyebrow m-0 text-fg/55">
            <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>
          </p>
          <h1 className="type-display mt-5">{article.title}</h1>
          <p className="type-body mt-6 text-fg/75">{article.excerpt}</p>
        </header>
        <div className="mt-14 max-w-3xl">
          {article.sections.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-0" data-reveal>
              <h2 className="m-0 text-2xl font-light">{section.heading}</h2>
              <div className="prose-brand type-body mt-4 text-fg/80">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="m-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        {article.related.length ? (
          <aside className="mt-20 max-w-3xl border-t border-line pt-10" aria-label="Sản phẩm liên quan" data-reveal>
            <SectionHeading as="h2" primary="KHÁM PHÁ" secondary="bộ sưu tập" />
            <ul className="m-0 mt-8 flex list-none flex-col gap-4 p-0">
              {article.related.map((link) => (
                <li key={link.href}>
                  <LineLink href={link.href}>{link.label}</LineLink>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </PageShell>
  );
}
