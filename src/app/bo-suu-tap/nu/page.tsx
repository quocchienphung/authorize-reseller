import type { Metadata } from "next";
import { CategoryCollection } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Đồng hồ nữ" };

export default function WomensCollectionPage() {
  return <CategoryCollection category="nu" />;
}
