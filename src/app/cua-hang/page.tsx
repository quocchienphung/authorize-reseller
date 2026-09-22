import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { StoresPage } from "@/components/pages/StoresPage";

export const metadata: Metadata = pageMetadata({
  title: "Showroom Alexander Ferros tại TP Hồ Chí Minh",
  description: "Showroom LENHI Luxury — đại lý phân phối chính hãng Alexander Ferros: 1247 Văn Tiến Dũng, Bình Hưng, TP Hồ Chí Minh. Giờ mở cửa, chỉ đường và đặt lịch trải nghiệm.",
  path: routes.stores,
});

export default function StoresRoute() {
  return <StoresPage />;
}
