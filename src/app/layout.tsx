import type { Metadata } from "next";
import localFont from "next/font/local";
import { ScrollMotion } from "@/components/alexander-ferros/ScrollMotion";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/alexander-ferros/fonts/sans-ultralight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/alexander-ferros/fonts/sans-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/alexander-ferros/fonts/sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/alexander-ferros/fonts/sans-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ap-sans",
  display: "swap",
});

const timesNow = localFont({
  src: "../../public/alexander-ferros/fonts/serif-italic.woff",
  weight: "400",
  style: "italic",
  variable: "--font-ap-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Alexander Ferros | Đồng hồ chính hãng",
    template: "%s | Alexander Ferros",
  },
  description: "Khám phá bộ sưu tập đồng hồ Alexander Ferros chính hãng dành cho nam và nữ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${helveticaNeue.variable} ${timesNow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollMotion />
      </body>
    </html>
  );
}
