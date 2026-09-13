import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { mensProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Đồng hồ nam",
  description: `${mensProducts.length} mẫu đồng hồ nam Alexander Ferros chính hãng.`,
};

export default function MensCollectionPage() {
  return (
    <ListingPage
      cover={{
        desktopSrc: "/alexander-ferros/covers/mens-listing-desktop.webp",
        mobileSrc: "/alexander-ferros/covers/mens-listing-mobile.webp",
        alt: "Đồng hồ nam Alexander Ferros",
      }}
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Đồng hồ nam" }]}
      heading={{ primary: "ĐỒNG HỒ NAM", secondary: `${mensProducts.length} phiên bản` }}
      description="Từ thanh lịch cổ điển đến cá tính thể thao — máy Nhật Bản bền bỉ, vỏ thép 316L và kính sapphire chống trầy."
      products={mensProducts}
      showCategoryFilter={false}
    />
  );
}
