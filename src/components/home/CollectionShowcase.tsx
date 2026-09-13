import { ParallaxCover } from "@/components/collections/ParallaxCover";
import { SplitWords } from "@/components/typography/SplitWords";
import { PillLink } from "@/components/ui/PillLink";
import { routes } from "@/config/site";
import { products } from "@/lib/products";

/** "Our collection" parallax banner lifted from the alexanderferros.com homepage. */
export function CollectionShowcase() {
  return (
    <ParallaxCover
      ratio="hero"
      veil
      align="start"
      desktopSrc="/alexander-ferros/covers/our-collection.webp"
      mobileSrc="/alexander-ferros/covers/our-collection-mobile.webp"
      alt="Bộ sưu tập Alexander Ferros"
    >
      <h2 className="m-0 text-4xl font-medium tracking-tight md:text-5xl"><SplitWords text="Bộ sưu tập" /></h2>
      <p className="mt-4 mb-8 max-w-lg text-[17px] leading-relaxed font-light">
        Hơn {products.length} phiên bản được sản xuất đều đặn với số lượng giới hạn, đảm bảo tiêu chuẩn chất lượng cao nhất
        của dấu ấn Alexander Ferros Seal.
      </p>
      <PillLink href={routes.collections} variant="onMedia">Khám phá bộ sưu tập</PillLink>
    </ParallaxCover>
  );
}
