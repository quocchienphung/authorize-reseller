import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = { title: "Đặt lịch trải nghiệm" };

export default function AppointmentRoute() {
  return <ContactPage appointment />;
}
