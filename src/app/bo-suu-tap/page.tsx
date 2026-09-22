import type { Metadata } from "next";
import { CollectionsLanding } from "@/components/collections/CollectionsLanding";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bộ sưu tập đồng hồ Alexander Ferros",
  description: "Bộ sưu tập đồng hồ Alexander Ferros chính hãng tại LENHI Luxury: đồng hồ nam, đồng hồ nữ và các mẫu mới nhất — thiết kế Swiss Brand, máy Nhật Bản, kính sapphire.",
  path: routes.collections,
});

export default function CollectionsPage() {
  return <CollectionsLanding />;
}
