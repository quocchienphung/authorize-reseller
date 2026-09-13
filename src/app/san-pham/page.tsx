import type { Metadata } from "next";
import { HeaderNavigation } from "@/components/alexander-ferros/HeaderNavigation";
import { ProductCatalogue } from "@/components/alexander-ferros/ProductCatalogue";
import catalogueStyles from "@/components/alexander-ferros/ProductCatalogue.module.css";
import siteStyles from "@/components/alexander-ferros/Site.module.css";
import { SiteFooter } from "@/components/alexander-ferros/SiteFooter";
import { products } from "@/lib/alexander-ferros";

export const metadata: Metadata = {
  title: "Danh mục sản phẩm",
  description: `Khám phá ${products.length} mẫu đồng hồ Alexander Ferros chính hãng.`,
};

type CataloguePageProps = {
  searchParams: Promise<{ "danh-muc"?: string }>;
};

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const query = await searchParams;
  const initialCategory = query["danh-muc"] === "nam" || query["danh-muc"] === "nu"
    ? query["danh-muc"]
    : "all";

  return (
    <main className={`${siteStyles.site} ${catalogueStyles.page}`}>
      <HeaderNavigation solid />
      <header className={catalogueStyles.intro}>
        <p>Bộ sưu tập Alexander Ferros</p>
        <h1>ĐỒNG HỒ <em>CHÍNH HÃNG</em></h1>
        <span>Mỗi sản phẩm được hiển thị bằng đúng tên gọi, mã sản phẩm và hình ảnh chính thức.</span>
      </header>
      <ProductCatalogue products={products} initialCategory={initialCategory} />
      <SiteFooter />
    </main>
  );
}
