"use client";

import { ChevronLeft, Globe2, MapPin, Phone, UserRound, Watch, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { menuGroups, siteAssetRoot } from "./homepage-data";
import styles from "./AudemarsPiguet.module.css";

type MenuGroup = keyof typeof menuGroups;

function menuHref(label: string) {
  const slug = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `https://www.audemarspiguet.com/us/en/${slug}`;
}

export function HeaderNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<MenuGroup | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const nextY = window.scrollY;
        setScrolled(nextY > 24);
        if (!menuOpen && !localeOpen) setHidden(nextY > previousY && nextY > 160);
        if (nextY < previousY || nextY < 80) setHidden(false);
        previousY = nextY;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [localeOpen, menuOpen]);

  useEffect(() => {
    const overlayOpen = menuOpen || localeOpen;
    if (!overlayOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>("button, a[href]");
    firstFocusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLocaleOpen(false);
        setActiveGroup(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [localeOpen, menuOpen]);

  useEffect(() => {
    function openLocaleDialog() {
      setMenuOpen(false);
      setActiveGroup(null);
      setLocaleOpen(true);
    }

    window.addEventListener("ap:open-locale", openLocaleDialog);
    return () => window.removeEventListener("ap:open-locale", openLocaleDialog);
  }, []);

  function closeOverlays() {
    setMenuOpen(false);
    setLocaleOpen(false);
    setActiveGroup(null);
  }

  return (
    <>
      <header
        className={`${styles.header} ${scrolled || menuOpen || localeOpen ? styles.headerSolid : ""} ${hidden ? styles.headerHidden : ""}`}
      >
        <button
          className={styles.headerButton}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen(true);
            setLocaleOpen(false);
          }}
        >
          <span className={styles.menuGlyph} aria-hidden="true"><span /><span /></span>
        </button>

        <Link className={styles.brand} href="/" aria-label="Audemars Piguet - Go to homepage">
          <Image
            className={styles.brandFull}
            src={`${siteAssetRoot}/brand/ap-logo-full.svg`}
            alt="Audemars Piguet"
            width={143}
            height={31}
            priority
          />
          <Image
            className={styles.brandMark}
            src={`${siteAssetRoot}/brand/ap-monogram.svg`}
            alt="Audemars Piguet"
            width={28}
            height={28}
            priority
          />
        </Link>

        <nav className={styles.headerActions} aria-label="Quick links">
          <a href="https://www.audemarspiguet.com/us/en/watch-collection" aria-label="All watches"><Watch aria-hidden="true" /></a>
          <a href="https://www.audemarspiguet.com/us/en/stores" aria-label="Find a boutique"><MapPin aria-hidden="true" /></a>
          <a href="https://www.audemarspiguet.com/us/en/secure/login" aria-label="My account"><UserRound aria-hidden="true" /></a>
        </nav>
      </header>

      {menuOpen ? (
        <div className={styles.overlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeOverlays()}>
          <div className={`${styles.drawer} ${activeGroup ? styles.drawerExpanded : ""}`} ref={dialogRef} role="dialog" aria-modal="true" aria-label="Main navigation">
            <div className={styles.drawerTop}>
              <button className={styles.drawerIconButton} type="button" onClick={closeOverlays} aria-label="Close navigation menu">
                <X aria-hidden="true" />
              </button>
              {activeGroup ? (
                <button className={styles.drawerIconButton} type="button" onClick={() => setActiveGroup(null)} aria-label="Back to main menu">
                  <ChevronLeft aria-hidden="true" />
                </button>
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
                    <p className={styles.drawerEyebrow}>{activeGroup === "Collections" ? "Watches" : activeGroup}</p>
                  <ul className={styles.submenuList}>
                    {menuGroups[activeGroup].map((item) => (
                      <li key={item}><a href={menuHref(item)}>{item}</a></li>
                    ))}
                  </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.drawerFoot}>
              <a href="https://www.audemarspiguet.com/us/en/watch-collection"><Watch aria-hidden="true" />Find your watch</a>
              <a href="https://www.audemarspiguet.com/us/en/stores"><MapPin aria-hidden="true" />Boutiques</a>
              <a href="https://www.audemarspiguet.com/us/en/secure/login"><UserRound aria-hidden="true" />Login or sign up</a>
              <a href="https://www.audemarspiguet.com/us/en/form/contact-us"><Phone aria-hidden="true" />Contact us</a>
              <button type="button" onClick={() => { setMenuOpen(false); setLocaleOpen(true); }}>
                <Globe2 aria-hidden="true" />United States / English
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {localeOpen ? (
        <div className={styles.localeOverlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeOverlays()}>
          <div className={styles.localeDialog} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="locale-title">
            <button className={styles.localeClose} type="button" onClick={closeOverlays} aria-label="Close language selector"><X aria-hidden="true" /></button>
            <p className={styles.drawerEyebrow}>Location settings</p>
            <h2 id="locale-title">Change language<br /><em>/ currency</em></h2>
            <label>
              Country / region
              <select defaultValue="United States"><option>United States</option><option>Switzerland</option><option>United Kingdom</option><option>France</option></select>
            </label>
            <label>
              Language
              <select defaultValue="English"><option>English</option><option>Français</option><option>Deutsch</option><option>Italiano</option></select>
            </label>
            <button className={styles.primaryButton} type="button" onClick={closeOverlays}>Confirm</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
