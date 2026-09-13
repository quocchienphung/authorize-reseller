import type { Metadata } from "next";
import { FaqPage } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Câu hỏi thường gặp" };

export default function FrequentlyAskedQuestionsPage() {
  return <FaqPage />;
}
