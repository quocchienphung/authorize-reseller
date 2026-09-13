import type { Metadata } from "next";
import { PriceGuide } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = {
  title: "Bảng giá sản phẩm",
  description: "Bảng giá theo từng mã sản phẩm Alexander Ferros.",
};

export default function PricingPage() {
  return <PriceGuide />;
}
