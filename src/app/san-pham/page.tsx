import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { isCategorySlug, products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

// Filters (`?danh-muc=`) are a client-side view of the same list; the canonical stays /san-pham.
export const metadata: Metadata = pageMetadata({
  title: "Tất cả đồng hồ Alexander Ferros chính hãng",
  description: `Toàn bộ ${products.length} mẫu đồng hồ Alexander Ferros chính hãng tại LENHI Luxury: đồng hồ nam, đồng hồ nữ, automatic và quartz Miyota, kính sapphire. Đúng tên gọi, mã sản phẩm, giá và hình ảnh chính thức.`,
  path: routes.catalogue,
});

type CataloguePageProps = {
  searchParams: Promise<{ "danh-muc"?: string }>;
};

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const query = await searchParams;
  const category = query["danh-muc"];

  return (
    <ListingPage
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Tất cả sản phẩm" }]}
      heading={{ primary: "TẤT CẢ", secondary: "đồng hồ Alexander Ferros" }}
      description={`Toàn bộ ${products.length} phiên bản trong catalog chính thức — đúng tên gọi, mã sản phẩm, giá và hình ảnh.`}
      products={products}
      initialCategory={isCategorySlug(category) ? category : "all"}
    />
  );
}
