import type { Metadata } from "next";
import { LatestCollection } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Sản phẩm mới nhất" };

export default function LatestProductsPage() {
  return <LatestCollection />;
}
