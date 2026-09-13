import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";

export const metadata: Metadata = { title: "Câu hỏi thường gặp" };

export default function FaqRoute() {
  return <FaqPage />;
}
