import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgePage } from "@/components/pages/KnowledgePage";
import { routes } from "@/config/site";
import { articles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kiến thức đồng hồ Alexander Ferros",
  description: "Kiến thức về đồng hồ Alexander Ferros từ LENHI Luxury: xuất xứ thương hiệu, bộ máy Miyota, kính sapphire, cách chọn size và bảo quản đồng hồ.",
  path: routes.knowledge,
});

/** The hub only exists once there is something to read; an empty index would be a thin page. */
export default function KnowledgeRoute() {
  if (!articles.length) notFound();
  return <KnowledgePage articles={articles} />;
}
