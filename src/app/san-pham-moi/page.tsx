import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { getLatestProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Sản phẩm mới nhất" };

const latest = getLatestProducts(48);

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
