import type { Metadata } from "next";
import { FamilyIndex } from "@/components/collections/FamilyIndex";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { mensProducts } from "@/lib/products";
import { categoryMetadata, productListJsonLd } from "@/lib/seo";

export const metadata: Metadata = categoryMetadata("nam", mensProducts.length);

export default function MensCollectionPage() {
  return (
    <ListingPage
      cover={{
        desktopSrc: "/alexander-ferros/covers/mens-listing-desktop.webp",
        mobileSrc: "/alexander-ferros/covers/mens-listing-mobile.webp",
        alt: "Đồng hồ nam Alexander Ferros",
      }}
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Đồng hồ nam" }]}
      heading={{ primary: "ĐỒNG HỒ NAM", secondary: "Alexander Ferros chính hãng" }}
      description={`${mensProducts.length} phiên bản — từ thanh lịch cổ điển đến cá tính thể thao: máy Nhật Bản bền bỉ, vỏ thép 316L và kính sapphire chống trầy.`}
      products={mensProducts}
      showCategoryFilter={false}
      after={<FamilyIndex products={mensProducts} secondary="đồng hồ nam" />}
    >
      <JsonLd data={productListJsonLd("Đồng hồ nam Alexander Ferros", routes.mens, mensProducts)} />
    </ListingPage>
  );
}
