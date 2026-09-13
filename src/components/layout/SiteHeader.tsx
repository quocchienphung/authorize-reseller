"use client";

import { ChevronLeft, MapPin, Phone, Search, Watch, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { lockScroll, unlockScroll } from "@/components/motion/scroll-controller";
import { navigation, routes, siteConfig } from "@/config/site";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** Always render the white bar (pages without a full-bleed hero). */
  solid?: boolean;
};

const iconLinkClass =
  "inline-flex size-[38px] items-center justify-center transition-opacity hover:opacity-60 [&_svg]:size-[26px] [&_svg]:stroke-[1.35]";

/**
 * Fixed header in the Audemars Piguet arrangement: menu trigger on the left,
 * emblem in the centre, quick actions on the right. Transparent over media,
 * white once the page is scrolled, and it tucks away while scrolling down.
 */
export function SiteHeader({ solid = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (!menuOpen) setHidden(y > previousY && y > 160);
        if (y < previousY || y < 80) setHidden(false);
        previousY = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  const isSolid = solid || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "rail fixed inset-x-0 top-0 z-100 grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center text-paper transition-[background-color,color,transform] duration-300 ease-out",
          isSolid && "bg-paper text-ink",
          hidden && "-translate-y-full",
        )}
      >
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center justify-self-start"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="grid w-6 gap-[5px]" aria-hidden="true">
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </span>
        </button>

        <BrandLogo markOnly className="justify-self-center" markClassName="size-12 md:size-[58px]" />

        <nav className="flex items-center gap-2 justify-self-end md:gap-4" aria-label="Liên kết nhanh">
          <Link href={routes.catalogue} aria-label="Tất cả đồng hồ" className={iconLinkClass}>
            <Watch aria-hidden="true" />
          </Link>
          <Link href={routes.stores} aria-label="Hệ thống showroom" className={cn(iconLinkClass, "max-md:hidden")}>
            <MapPin aria-hidden="true" />
          </Link>
          <Link href={routes.catalogue} aria-label="Tìm sản phẩm" className={iconLinkClass}>
            <Search aria-hidden="true" />
          </Link>
        </nav>
      </header>

      {menuOpen ? <MenuDrawer onClose={() => setMenuOpen(false)} /> : null}
    </>
  );
}

function MenuDrawer({ onClose }: { onClose: () => void }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setActiveGroup(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    lockScroll();
    dialogRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [close]);

  const group = navigation.find((item) => item.label === activeGroup);

  return (
    <div
      className="fixed inset-0 z-110 bg-ink/45 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu chính"
        className={cn(
          "flex h-full w-full flex-col bg-paper text-ink transition-[width] duration-300 ease-out animate-in slide-in-from-left-4 fade-in md:w-[420px]",
          group && "md:w-[820px]",
        )}
      >
        <div className="flex h-(--header-height) items-center justify-between px-5 md:px-8">
          <button type="button" onClick={close} aria-label="Đóng menu" className="inline-flex size-11 items-center justify-center">
            <X className="size-6 stroke-[1.35]" aria-hidden="true" />
          </button>
          {group ? (
            <button
              type="button"
              onClick={() => setActiveGroup(null)}
              aria-label="Quay lại"
              className="inline-flex size-11 items-center justify-center md:hidden"
            >
              <ChevronLeft className="size-6 stroke-[1.35]" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-1 overflow-hidden">
          <ul className={cn("w-full shrink-0 list-none space-y-1 px-5 py-4 md:w-[420px] md:px-8", group && "max-md:hidden")}>
            {navigation.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setActiveGroup(item.label)}
                  className={cn(
                    "flex w-full items-center justify-between py-3 text-left text-[28px] font-thin uppercase tracking-[0.02em] transition-opacity md:text-[32px]",
                    activeGroup && activeGroup !== item.label && "opacity-40",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {group ? (
            <div className="w-full border-ink/10 px-5 py-4 animate-in fade-in slide-in-from-left-2 md:border-l md:px-10">
              <p className="type-eyebrow mb-6 text-ink/50">{group.label}</p>
              <ul className="list-none space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-lg font-light transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 border-t border-ink/10 px-5 py-5 text-sm md:px-8">
          <Link href={routes.catalogue} onClick={close} className="inline-flex items-center gap-3 hover:opacity-60">
            <Watch className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            Khám phá {products.length} sản phẩm
          </Link>
          <Link href={routes.stores} onClick={close} className="inline-flex items-center gap-3 hover:opacity-60">
            <MapPin className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            Hệ thống showroom
          </Link>
          <a href={siteConfig.contact.hotline.href} className="inline-flex items-center gap-3 hover:opacity-60">
            <Phone className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            {siteConfig.contact.hotline.label}
          </a>
        </div>
      </div>
    </div>
  );
}
