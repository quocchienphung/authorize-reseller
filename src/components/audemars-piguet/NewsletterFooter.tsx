"use client";

import { Globe2 } from "lucide-react";
import Image from "next/image";
import { footerGroups, media } from "./homepage-data";
import { SectionHeading } from "./SectionHeading";
import styles from "./AudemarsPiguet.module.css";

const footerPaths: Record<string, string> = {
  "All Watches": "/watch-collection",
  "New Releases": "/watch/our-latest",
  "Code 11.59 by Audemars Piguet": "/collections/code-11-59-collection",
  "Royal Oak": "/collections/royal-oak-collection",
  "Royal Oak Offshore": "/collections/royal-oak-offshore-collection",
  "Royal Oak Concept": "/collections/royal-oak-concept-collection",
  "Find a boutique": "/stores",
  "Online service request": "/secure/form/pick-up-request",
  "Extend your warranty": "/secure/form/extend-warranty",
  "AP Coverage service": "/services/ap-coverage",
  "Contact us": "/form/contact-us",
  FAQ: "/services/faq",
  "Terms of Use": "/legal/terms-of-use",
  "Privacy Notice": "/legal/privacy-notice",
  "Cookie Policy": "/legal/cookie-policy",
  "General Terms of Sale": "/services/general-terms-and-conditions-of-sale",
  "Masterclasses Terms of Sale": "/legal/terms-and-conditions-masterclass",
  "Customer Service Terms & Conditions": "/services/terms-and-conditions",
  "International Sales Warranty": "/content/dam/ap/com/legal/international-sales-warranty-2023.pdf",
  Accessibility: "/legal/accessibility",
  "Join Audemars Piguet": "https://careers.audemarspiguet.com/",
  Press: "https://press.audemarspiguet.com/",
  "Audemars Piguet Foundations": "https://fondationsaudemarspiguet.org/",
  Sustainability: "/about/commitments",
};

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/audemarspiguet/", glyph: "\ue905" },
  { label: "Facebook", href: "https://www.facebook.com/audemarspiguet", glyph: "\ue906" },
  { label: "YouTube", href: "https://www.youtube.com/user/aptvofficial", glyph: "\ue900" },
  { label: "TikTok", href: "https://www.tiktok.com/@audemarspiguet", glyph: "\ue91c" },
  { label: "LinkedIn", href: "https://ch.linkedin.com/company/audemarspiguet", glyph: "\ueaca" },
  { label: "Pinterest", href: "https://www.pinterest.com/audemarspiguet", glyph: "\ue908" },
  { label: "X", href: "https://x.com/AudemarsPiguet", glyph: "\ue903" },
] as const;

function footerHref(label: string) {
  const path = footerPaths[label] ?? "/";
  return path.startsWith("http") ? path : `https://www.audemarspiguet.com/us/en${path}`;
}

export function NewsletterFooter() {
  function openLocaleDialog() {
    window.dispatchEvent(new Event("ap:open-locale"));
  }

  return (
    <>
      <section className={styles.newsletter} aria-labelledby="newsletter-heading">
        <SectionHeading className={styles.newsletterHeading} primary="GET THE" secondary="LATEST NEWS" />
        <p>Be the first to receive the latest news on our brand, products and upcoming events.</p>
        <a className={styles.newsletterButton} href="https://www.audemarspiguet.com/us/en/form/newsletter-subscription">Subscribe</a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.partnerLogos}>
          <a href="https://apchronicles.audemarspiguet.com/en" aria-label="Visit AP Chronicles">
            <Image src={media.chroniclesLogo} alt="AP Chronicles" width={164} height={42} />
          </a>
          <a href="https://museeatelier.audemarspiguet.com/en/home.html" aria-label="Visit Musée Atelier Audemars Piguet">
            <Image src={media.museumLogo} alt="Musée Atelier Audemars Piguet" width={103} height={66} />
          </a>
          <a href="https://fondationsaudemarspiguet.org/" aria-label="Visit Audemars Piguet Foundations">
            <Image src={media.foundationsLogo} alt="Audemars Piguet Foundations" width={165} height={54} />
          </a>
        </div>

        <div className={styles.footerMain}>
          <button className={styles.footerLocale} type="button" onClick={openLocaleDialog}><Globe2 aria-hidden="true" />Change language / currency</button>
          <div className={`${styles.footerColumns} ${styles.footerColumnsDesktop}`}>
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => <li key={link}><a href={footerHref(link)}>{link}</a></li>)}
                </ul>
              </nav>
            ))}
          </div>
          <div className={`${styles.footerColumns} ${styles.footerColumnsMobile}`}>
            {footerGroups.map((group) => (
              <details key={group.title}>
                <summary>{group.title}</summary>
                <ul>
                  {group.links.map((link) => <li key={link}><a href={footerHref(link)}>{link}</a></li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <nav className={styles.socialLinks} aria-label="Social networks">
            {socialLinks.map((link) => (
              <a href={link.href} aria-label={link.label} key={link.label}>
                <span className={styles.socialIcon} aria-hidden="true">{link.glyph}</span>
              </a>
            ))}
          </nav>
          <p>沪ICP备13031168号-1</p>
          <p>© 2026 Audemars Piguet</p>
        </div>
      </footer>
    </>
  );
}
