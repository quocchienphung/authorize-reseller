import type { Metadata } from "next";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { isCategorySlug, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description: `Khám phá ${products.length} mẫu đồng hồ Alexander Ferros chính hãng.`,
};

type CataloguePageProps = {
  searchParams: Promise<{ "danh-muc"?: string }>;
};

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const query = await searchParams;
  const category = query["danh-muc"];

  return (
    <ListingPage
      breadcrumbs={[{ label: "Bộ sưu tập", href: routes.collections }, { label: "Tất cả sản phẩm" }]}
      heading={{ primary: "TẤT CẢ", secondary: "sản phẩm" }}
      description={`Toàn bộ ${products.length} phiên bản trong catalog chính thức — đúng tên gọi, mã sản phẩm, giá và hình ảnh.`}
      products={products}
      initialCategory={isCategorySlug(category) ? category : "all"}
    />
  );
}
