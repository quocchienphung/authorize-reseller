import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { womensProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Đồng hồ nữ",
  description: `${womensProducts.length} mẫu đồng hồ nữ Alexander Ferros chính hãng.`,
};

export default function WomensCollectionPage() {
  return (
    <ListingPage
      cover={{
        desktopSrc: "/alexander-ferros/covers/womens-desktop.webp",
        mobileSrc: "/alexander-ferros/covers/womens-mobile.webp",
        alt: "Đồng hồ nữ Alexander Ferros",
      }}
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Đồng hồ nữ" }]}
      heading={{ primary: "ĐỒNG HỒ NỮ", secondary: `${womensProducts.length} phiên bản` }}
      description="Những thiết kế với tỷ lệ tinh tế và bảng màu đa dạng dành cho phái đẹp."
      products={womensProducts}
      showCategoryFilter={false}
    />
  );
}
