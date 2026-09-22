import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { getLatestProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

const latest = getLatestProducts(48);

export const metadata: Metadata = pageMetadata({
  title: "Đồng hồ Alexander Ferros mới nhất",
  description: `${latest.length} phiên bản Alexander Ferros vừa được bổ sung vào catalog chính thức — mẫu mới nhất cho nam và nữ, giá và thông số cập nhật tại LENHI Luxury.`,
  path: routes.latest,
});

export default function LatestProductsPage() {
  return (
    <ListingPage
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Sản phẩm mới" }]}
      heading={{ primary: "SẢN PHẨM", secondary: "mới nhất" }}
      description="Các phiên bản mới nhất vừa được bổ sung vào catalog chính thức."
      products={latest}
    />
  );
}
