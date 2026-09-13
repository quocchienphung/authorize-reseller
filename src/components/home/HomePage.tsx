import { PageShell } from "@/components/layout/PageShell";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ProductMosaic } from "@/components/product/ProductMosaic";
import { routes } from "@/config/site";
import { getLatestProducts, mensProducts, womensProducts } from "@/lib/products";
import { BrandStory, brandChapters } from "./BrandStory";
import { CollectionShowcase } from "./CollectionShowcase";
import { HeroStack } from "./HeroStack";

export function HomePage() {
  return (
    <PageShell>
      <HeroStack />
      <ProductCarousel primary="SẢN PHẨM" secondary="mới nhất" products={getLatestProducts(16)} link={{ label: "Xem tất cả sản phẩm mới", href: routes.latest }} />
      <CollectionShowcase />
      <ProductMosaic primary="ĐỒNG HỒ" secondary="nam" products={mensProducts.slice(0, 5)} link={{ label: `Xem ${mensProducts.length} mẫu đồng hồ nam`, href: routes.mens }} />
      <BrandStory chapter={brandChapters.origin} reverse />
      <BrandStory chapter={brandChapters.founder} />
      <ProductMosaic primary="ĐỒNG HỒ" secondary="nữ" products={womensProducts.slice(0, 5)} link={{ label: `Xem ${womensProducts.length} mẫu đồng hồ nữ`, href: routes.womens }} />
      <ProductCarousel primary="DÀNH CHO" secondary="phái đẹp" products={womensProducts.slice(5, 21)} link={{ label: "Xem tất cả đồng hồ nữ", href: routes.womens }} />
      <BrandStory chapter={brandChapters.quality} reverse />
    </PageShell>
  );
}
