"use client";

import { ChevronLeft, MapPin, MessageCircle, Phone, Search, Watch, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandRotator } from "@/components/brand/BrandRotator";
import { lockScroll, onScroll, unlockScroll } from "@/components/motion/scroll-controller";
import { ThemeToggle } from "./ThemeToggle";
import { navigation, routes, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** Always render the white bar (pages without a full-bleed hero). */
  solid?: boolean;
  /** Catalogue size shown in the drawer footer (passed in to keep the JSON out of the client bundle). */
  productCount: number;
};

const DRAWER_ID = "site-menu";

const iconLinkClass =
  "inline-flex size-[38px] items-center justify-center transition-opacity hover:opacity-60 [&_svg]:size-[24px] [&_svg]:stroke-[1.35]";

/**
 * Fixed header in the Audemars Piguet arrangement: menu trigger on the left,
 * emblem in the centre, quick actions on the right. Transparent over media,
 * white once the page is scrolled, and it tucks away while scrolling down.
 */
export function SiteHeader({ solid = false, productCount }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /*
   * Show / hide is written straight to the DOM (no React re-render per frame)
   * and only flips after the scroll has travelled HIDE_AFTER px in one
   * direction, so momentum jitter on touch devices never makes it flicker.
   */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const HIDE_AFTER = 28;
    const SHOW_AFTER = 12;
    const REVEAL_ZONE = 140;
    let previousY = window.scrollY;
    let travelled = 0;
    let hidden = false;
    let solidBar = previousY > 40;

    const apply = (y: number) => {
      const delta = y - previousY;
      previousY = y;
      travelled = Math.sign(delta) === Math.sign(travelled) ? travelled + delta : delta;

      if (!hidden && travelled > HIDE_AFTER && y > REVEAL_ZONE) {
        hidden = true;
        header.style.transform = "translate3d(0, -100%, 0)";
      } else if (hidden && (travelled < -SHOW_AFTER || y <= REVEAL_ZONE)) {
        hidden = false;
        header.style.transform = "translate3d(0, 0, 0)";
      }

      // Hysteresis so the background never toggles back and forth around one pixel.
      if (!solidBar && y > 40) {
        solidBar = true;
        setScrolled(true);
      } else if (solidBar && y < 10) {
        solidBar = false;
        setScrolled(false);
      }
    };

    apply(window.scrollY);
    return onScroll(apply);
  }, []);

  const isSolid = solid || scrolled || menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "rail fixed inset-x-0 top-0 z-100 grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center border-b will-change-transform",
          "transition-[transform,background-color,color,border-color,backdrop-filter] duration-500 ease-out-expo",
          isSolid ? "border-line bg-surface/85 text-fg backdrop-blur-md" : "border-transparent bg-transparent text-paper",
        )}
      >
        <button
          ref={menuButtonRef}
          type="button"
          className="group/menu inline-flex size-11 items-center justify-center justify-self-start"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          aria-controls={DRAWER_ID}
          onClick={() => setMenuOpen(true)}
        >
          <span className="grid w-6 gap-[5px]" aria-hidden="true">
            <span className="block h-px w-6 bg-current transition-transform duration-300 group-hover/menu:translate-x-0.5" />
            <span className="block h-px w-6 bg-current transition-transform duration-300 group-hover/menu:-translate-x-0.5" />
          </span>
        </button>

        <Link
          href={routes.home}
          aria-label={`${siteConfig.reseller.name} – ${siteConfig.name} – Trang chủ`}
          className="block justify-self-center text-current no-underline"
        >
          <BrandRotator markClassName="size-12 md:size-[58px]" />
        </Link>

        <nav className="flex items-center gap-1 justify-self-end md:gap-3" aria-label="Liên kết nhanh">
          <Link href={routes.catalogue} aria-label="Tất cả đồng hồ" className={iconLinkClass}>
            <Watch aria-hidden="true" />
          </Link>
          <Link href={routes.stores} aria-label="Hệ thống showroom" className={cn(iconLinkClass, "max-md:hidden")}>
            <MapPin aria-hidden="true" />
          </Link>
          <Link href={`${routes.catalogue}#san-pham`} aria-label="Tìm sản phẩm" className={cn(iconLinkClass, "max-md:hidden")}>
            <Search aria-hidden="true" />
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      {menuOpen ? (
        <MenuDrawer
          productCount={productCount}
          onClose={() => {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}

function MenuDrawer({ productCount, onClose }: { productCount: number; onClose: () => void }) {
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
      className="fixed inset-0 z-110 bg-ink/45 backdrop-blur-sm animate-in fade-in duration-300"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        id={DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Menu chính"
        className={cn(
          "flex h-full w-full flex-col bg-surface text-fg transition-[width] duration-500 ease-out-expo animate-in slide-in-from-left-8 fade-in duration-500 md:w-[420px]",
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
                    "flex w-full items-center justify-between py-3 text-left text-[28px] font-extralight uppercase tracking-[0.02em] transition-opacity md:text-[32px]",
                    activeGroup && activeGroup !== item.label && "opacity-40",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {group ? (
            <div className="w-full border-line px-5 py-4 animate-in fade-in slide-in-from-left-2 md:border-l md:px-10">
              <p className="type-eyebrow mb-6 text-fg/50">{group.label}</p>
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

        <div className="grid gap-3 border-t border-line px-5 py-5 text-sm md:px-8">
          <Link href={routes.catalogue} onClick={close} className="inline-flex items-center gap-3 hover:opacity-60">
            <Watch className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            Khám phá {productCount} sản phẩm
          </Link>
          <Link href={routes.stores} onClick={close} className="inline-flex items-center gap-3 hover:opacity-60">
            <MapPin className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            Hệ thống showroom
          </Link>
          <a href={siteConfig.contact.hotline.href} className="inline-flex items-center gap-3 hover:opacity-60">
            <Phone className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            {siteConfig.contact.hotline.label}
          </a>
          <a href={siteConfig.contact.zalo.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:opacity-60">
            <MessageCircle className="size-[18px] stroke-[1.4]" aria-hidden="true" />
            {siteConfig.contact.zalo.label}
          </a>
        </div>
      </div>
    </div>
  );
}
