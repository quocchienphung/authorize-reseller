import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageShell } from "@/components/layout/PageShell";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { LineLink } from "@/components/ui/LineLink";
import { PillLink } from "@/components/ui/PillLink";
import { routes } from "@/config/site";
import {
  categoryRoute,
  familyReference,
  getRelatedProducts,
  getSpecification,
  getVariants,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCarousel } from "./ProductCarousel";
import { ProductGallery } from "./ProductGallery";

const keyFacts: { label: string; pattern: RegExp }[] = [
  { label: "Kích thước", pattern: /Kích thước/i },
  { label: "Bộ máy", pattern: /Bộ máy/i },
  { label: "Chống nước", pattern: /chống nước/i },
  { label: "Dây đeo", pattern: /Chất liệu dây/i },
  { label: "Mặt kính", pattern: /mặt kính/i },
];

export function ProductDetailPage({ product }: { product: Product }) {
  const reference = familyReference(product.familySlug);
  const variants = getVariants(product);
  const related = getRelatedProducts(product, 12);
  const facts = keyFacts
    .map((fact) => ({ label: fact.label, value: getSpecification(product, fact.pattern) }))
    .filter((fact): fact is { label: string; value: string } => Boolean(fact.value));
  const categoryHref = categoryRoute(product);

  return (
    <PageShell solidHeader>
      <Breadcrumbs
        className="mt-2"
        items={[
          { label: "Bộ sưu tập", href: routes.collections },
          { label: product.category, href: categoryHref },
          { label: product.sku },
        ]}
      />

      {/* Hero: copy on the left, hero shot on the right */}
      <section className="rail grid gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center lg:gap-20 lg:pb-28">
        <div className="flex flex-col lg:order-1" data-reveal>
          <Eyebrow>{product.category}</Eyebrow>
          <SectionHeading as="h1" primary="Alexander Ferros" secondary={product.sku} secondaryVariant="code" className="mt-5" />
          <p className="mt-8 text-2xl font-light">{product.price}</p>
          <p className="type-body mt-6 max-w-[440px] text-fg/75">{product.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PillLink href={routes.appointment}>Đặt lịch trải nghiệm</PillLink>
            <LineLink href={routes.contact}>Liên hệ tư vấn</LineLink>
          </div>
        </div>

        <div className="min-w-0 lg:order-2">
          <ProductGallery hero={product.image} photos={product.images} name={product.name} />
        </div>
      </section>

      {/* Key facts */}
      {facts.length ? (
        <section className="rail border-y border-line py-10" aria-label="Thông số nổi bật">
          <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5" data-reveal>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="type-eyebrow text-fg/55">{fact.label}</dt>
                <dd className="m-0 mt-2 text-lg font-light">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* Variants of the same reference */}
      {variants.length > 1 ? (
        <section className="rail py-20 md:py-24" aria-label={`Các phiên bản ${reference}`}>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
            <SectionHeading primary={`Dòng ${reference}`} secondary={`${variants.length} phiên bản`} />
            <LineLink href={routes.family(product.familySlug)}>Xem toàn bộ dòng {reference}</LineLink>
          </div>
          <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8" data-reveal="fade">
            {variants.map((variant) => {
              const isCurrent = variant.slug === product.slug;
              return (
                <li key={variant.slug}>
                  <Link
                    href={routes.product(variant.slug)}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={variant.name}
                    className={cn(
                      "group/variant block border bg-tile transition-colors",
                      isCurrent ? "border-fg" : "border-line hover:border-fg/60",
                    )}
                  >
                    <span className="relative block aspect-square">
                      <Image src={variant.image} alt="" fill sizes="140px" quality={75} className="object-contain p-[12%]" />
                    </span>
                    <span className="block border-t border-line px-2 py-2 text-center text-[11px] tracking-[0.08em] text-fg/80 uppercase">
                      {variant.sku}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* Full specifications */}
      <section id="thong-so" className="rail border-t border-line py-20 md:py-24" aria-label="Thông số kỹ thuật">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <div data-reveal>
            <SectionHeading primary="Thông số" secondary="kỹ thuật" />
            <p className="type-body mt-6 text-fg/70">
              Mỗi sản phẩm được kiểm định và căn chỉnh tại Việt Nam trước khi bàn giao, đi kèm chứng nhận và thẻ bảo hành chính hãng.
            </p>
            <LineLink href={routes.warranty} className="mt-6">
              Chính sách bảo hành
            </LineLink>
          </div>
          <dl className="m-0 divide-y divide-line border-y border-line" data-reveal="fade">
            {product.specifications.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 py-4 text-[15px]">
                <dt className="font-light text-fg/60">{label}</dt>
                <dd className="m-0 font-light">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length ? (
        <ProductCarousel
          primary="CÓ THỂ BẠN"
          secondary="sẽ thích"
          products={related}
          link={{ label: `Xem tất cả ${product.category.toLowerCase()}`, href: categoryHref }}
        />
      ) : null}
    </PageShell>
  );
}
