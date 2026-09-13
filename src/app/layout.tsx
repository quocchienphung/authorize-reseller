import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { SplashScreen } from "@/components/brand/SplashScreen";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig, THEME_STORAGE_KEY } from "@/config/site";
import "./globals.css";

/** Montserrat is the Alexander Ferros brand face and covers Vietnamese diacritics. */
const brandSans = Montserrat({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-brand-sans",
  display: "swap",
});

/** Latin-only ultra-light face reserved for the "ALEXANDER FERROS" wordmark. */
const brandDisplay = localFont({
  src: "../assets/fonts/neue-haas-25-ultralight.woff2",
  weight: "100",
  style: "normal",
  variable: "--font-brand-display",
  display: "swap",
});

/** Italic serif for the second line of display headings (also used by AP). */
const brandSerif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-brand-serif",
  display: "swap",
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

/** Applies a saved theme choice before first paint so there is no flash. */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${brandSans.variable} ${brandSerif.variable} ${brandDisplay.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-bootstrap" strategy="beforeInteractive">{themeBootstrap}</Script>
        <SplashScreen />
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
