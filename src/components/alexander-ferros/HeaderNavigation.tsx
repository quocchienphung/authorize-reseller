"use client";

import { ChevronLeft, MapPin, Phone, Search, Watch, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import styles from "./Site.module.css";

const menuGroups = {
  "Bộ sưu tập": [
    { label: "Bộ sưu tập", href: "/bo-suu-tap" },
    { label: "Tất cả sản phẩm", href: "/san-pham" },
    { label: "Sản phẩm mới", href: "/san-pham-moi" },
    { label: "Đồng hồ nam", href: "/bo-suu-tap/nam" },
    { label: "Đồng hồ nữ", href: "/bo-suu-tap/nu" },
    { label: "Bảng giá", href: "/bang-gia" },
  ],
  "Dịch vụ": [
    { label: "Tất cả dịch vụ", href: "/dich-vu" },
    { label: "Bảo hành & hỗ trợ", href: "/dich-vu/bao-hanh" },
    { label: "Câu hỏi thường gặp", href: "/dich-vu/faq" },
    { label: "Đặt lịch trải nghiệm", href: "/dat-lich" },
    { label: "Danh sách showroom", href: "/cua-hang" },
  ],
  "Liên hệ": [
    { label: "Liên hệ chúng tôi", href: "/lien-he" },
    { label: "Hotline 1900 3222", href: "tel:19003222" },
    { label: "sales@alexanderferros.com", href: "mailto:sales@alexanderferros.com" },
    { label: "Instagram", href: "https://www.instagram.com/alexander.ferros" },
  ],
} as const;

type MenuGroup = keyof typeof menuGroups;

export function HeaderNavigation({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<MenuGroup | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setActiveGroup(null);
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const nextY = window.scrollY;
        setScrolled(nextY > 24);
        if (!menuOpen) setHidden(nextY > previousY && nextY > 160);
        if (nextY < previousY || nextY < 80) setHidden(false);
        previousY = nextY;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, menuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${solid || scrolled || menuOpen ? styles.headerSolid : ""} ${hidden ? styles.headerHidden : ""}`}
      >
        <button
          className={styles.headerButton}
          type="button"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className={styles.menuGlyph} aria-hidden="true"><span /><span /></span>
        </button>

        <BrandLogo />

        <nav className={styles.headerActions} aria-label="Liên kết nhanh">
          <Link href="/san-pham" aria-label="Tất cả đồng hồ"><Watch aria-hidden="true" /></Link>
          <Link href="/cua-hang" aria-label="Danh sách showroom"><MapPin aria-hidden="true" /></Link>
          <Link href="/san-pham" aria-label="Tìm sản phẩm"><Search aria-hidden="true" /></Link>
        </nav>
      </header>

      {menuOpen ? (
        <div className={styles.overlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeMenu()}>
          <div className={`${styles.drawer} ${activeGroup ? styles.drawerExpanded : ""}`} ref={dialogRef} role="dialog" aria-modal="true" aria-label="Menu chính">
            <div className={styles.drawerTop}>
              <button className={styles.drawerIconButton} type="button" onClick={closeMenu} aria-label="Đóng menu"><X aria-hidden="true" /></button>
              {activeGroup ? (
                <button className={styles.drawerIconButton} type="button" onClick={() => setActiveGroup(null)} aria-label="Quay lại"><ChevronLeft aria-hidden="true" /></button>
              ) : null}
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.drawerPanes}>
                <ul className={`${styles.menuList} ${activeGroup ? styles.menuListActive : ""}`}>
                  {(Object.keys(menuGroups) as MenuGroup[]).map((group) => (
                    <li key={group}>
                      <button className={activeGroup === group ? styles.activeMenuItem : ""} type="button" onClick={() => setActiveGroup(group)}>{group}</button>
                    </li>
                  ))}
                </ul>
                {activeGroup ? (
                  <div className={styles.submenuPanel}>
                    <p className={styles.drawerEyebrow}>{activeGroup}</p>
                    <ul className={styles.submenuList}>
                      {menuGroups[activeGroup].map((item) => <li key={item.label}><Link href={item.href} onClick={closeMenu}>{item.label}</Link></li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.drawerFoot}>
              <Link href="/san-pham"><Watch aria-hidden="true" />Khám phá 208 sản phẩm</Link>
              <Link href="/cua-hang"><MapPin aria-hidden="true" />Danh sách showroom</Link>
              <a href="tel:19003222"><Phone aria-hidden="true" />1900 3222</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
