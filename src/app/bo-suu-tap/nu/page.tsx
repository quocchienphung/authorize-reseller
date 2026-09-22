import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { womensProducts } from "@/lib/products";
import { categoryMetadata, productListJsonLd } from "@/lib/seo";

export const metadata: Metadata = categoryMetadata("nu", womensProducts.length);

export default function WomensCollectionPage() {
  return (
    <ListingPage
      cover={{
        desktopSrc: "/alexander-ferros/covers/womens-desktop.webp",
        mobileSrc: "/alexander-ferros/covers/womens-mobile.webp",
        alt: "Đồng hồ nữ Alexander Ferros",
      }}
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Đồng hồ nữ" }]}
      heading={{ primary: "ĐỒNG HỒ NỮ", secondary: "Alexander Ferros chính hãng" }}
      description={`${womensProducts.length} phiên bản với tỷ lệ tinh tế và bảng màu đa dạng dành cho phái đẹp.`}
      products={womensProducts}
      showCategoryFilter={false}
    >
      <JsonLd data={productListJsonLd("Đồng hồ Alexander Ferros nữ", routes.womens, womensProducts)} />
    </ListingPage>
  );
}
