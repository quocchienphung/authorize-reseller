import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { WarrantyPage } from "@/components/pages/WarrantyPage";

export const metadata: Metadata = pageMetadata({
  title: "Bảo hành đồng hồ Alexander Ferros chính hãng",
  description: "Chính sách bảo hành và hỗ trợ đồng hồ Alexander Ferros chính hãng tại LENHI Luxury: chứng nhận kiểm định Trường Omega, thẻ bảo hành, quy trình tiếp nhận và hỗ trợ kỹ thuật.",
  path: routes.warranty,
});

export default function WarrantyRoute() {
  return <WarrantyPage />;
}
