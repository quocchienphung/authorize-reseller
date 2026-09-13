import type { Metadata } from "next";
import { CategoryCollection } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Đồng hồ nam" };

export default function MensCollectionPage() {
  return <CategoryCollection category="nam" />;
}
