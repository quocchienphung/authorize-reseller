import { PageShell } from "@/components/layout/PageShell";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { SplitWords } from "@/components/typography/SplitWords";
import { PillLink } from "@/components/ui/PillLink";
import { routes } from "@/config/site";
import { getLatestProducts, mensProducts, womensProducts } from "@/lib/products";
import { ParallaxCover } from "./ParallaxCover";

const covers = [
  {
    title: "Đồng hồ nam",
    count: mensProducts.length,
    href: routes.mens,
    align: "start",
    desktopSrc: "/alexander-ferros/covers/mens-desktop.webp",
    mobileSrc: "/alexander-ferros/covers/mens-mobile.webp",
  },
  {
    title: "Đồng hồ nữ",
    count: womensProducts.length,
    href: routes.womens,
    align: "end",
    desktopSrc: "/alexander-ferros/covers/womens-desktop.webp",
    mobileSrc: "/alexander-ferros/covers/womens-mobile.webp",
  },
] as const;

/** One-to-one port of alexanderferros.com/en/products. */
export function CollectionsLanding() {
  return (
    <PageShell solidHeader>
      <section className="relative bg-surface text-fg">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-fg/8 to-transparent" aria-hidden="true" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-8 py-16 text-center md:px-20 md:py-24 lg:px-16 lg:py-32" data-reveal>
          <p className="type-eyebrow m-0 text-fg/70">Đồng hành cùng phong cách của bạn</p>
          <h1 className="mt-3 text-3xl font-light tracking-[0.08em] uppercase md:text-4xl lg:text-5xl"><SplitWords text="Đồng hồ" offset={1} /></h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg/85">
            Khám phá bộ sưu tập đồng hồ chất lượng cao và đa dạng của chúng tôi. Mỗi thiết kế là sự kết hợp hoàn hảo giữa
            phong cách hiện đại và chất lượng bền bỉ, giúp bạn tự tin thể hiện cá tính riêng.
          </p>
        </div>
      </section>

      {covers.map((cover, index) => (
        <ParallaxCover
          key={cover.href}
          desktopSrc={cover.desktopSrc}
          mobileSrc={cover.mobileSrc}
          alt={cover.title}
          align={cover.align}
          priority={index === 0}
        >
          <p className="type-eyebrow m-0 text-paper/75">{cover.count} phiên bản</p>
          <h2 className="mt-1 text-3xl font-light tracking-[0.08em] uppercase md:text-4xl lg:text-5xl"><SplitWords text={cover.title} offset={1} /></h2>
          <div className="mt-10">
            <PillLink href={cover.href} variant="onMedia">Xem thêm</PillLink>
          </div>
        </ParallaxCover>
      ))}

      <ProductCarousel primary="SẢN PHẨM" secondary="mới nhất" products={getLatestProducts(16)} link={{ label: "Xem tất cả sản phẩm mới", href: routes.latest }} />
    </PageShell>
  );
}
