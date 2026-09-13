import type { Metadata } from "next";
import { ContactPage } from "@/components/alexander-ferros/PublicPages";

export const metadata: Metadata = { title: "Liên hệ" };

export default function ContactUsPage() {
  return <ContactPage />;
}
