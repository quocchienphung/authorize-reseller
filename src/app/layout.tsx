import type { Metadata } from "next";
import localFont from "next/font/local";
import { SplashScreen } from "@/components/brand/SplashScreen";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/config/site";
import "./globals.css";

const brandSans = localFont({
  src: [
    { path: "../assets/fonts/neue-haas-25-ultralight.woff2", weight: "100", style: "normal" },
    { path: "../assets/fonts/neue-haas-45-light.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/neue-haas-55-regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/neue-haas-65-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-brand-sans",
  display: "swap",
});

const brandSerif = localFont({
  src: "../assets/fonts/times-now-extralight-italic.woff",
  weight: "400",
  style: "italic",
  variable: "--font-brand-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.locale} className={`${brandSans.variable} ${brandSerif.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SplashScreen />
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
