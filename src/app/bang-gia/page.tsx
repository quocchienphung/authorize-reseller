import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Bảng giá sản phẩm",
  description: "Bảng giá theo từng mã sản phẩm Alexander Ferros.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
