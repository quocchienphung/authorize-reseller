import type { Metadata } from "next";
import { CollectionOverview } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = {
  title: "Bộ sưu tập",
  description: "Khám phá các bộ sưu tập đồng hồ nam và nữ Alexander Ferros.",
};

export default function CollectionsPage() {
  return <CollectionOverview />;
}
