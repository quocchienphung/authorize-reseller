import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata: Metadata = pageMetadata({
  title: "Bảng giá đồng hồ Alexander Ferros",
  description: "Bảng giá đồng hồ Alexander Ferros chính hãng theo từng mã sản phẩm tại LENHI Luxury — giá niêm yết đồng hồ nam và nữ, cập nhật theo catalog chính thức.",
  path: routes.pricing,
});

export default function PricingRoute() {
  return <PricingPage />;
}
