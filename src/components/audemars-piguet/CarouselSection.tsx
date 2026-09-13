"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CarouselCard } from "./homepage-data";
import { SectionHeading } from "./SectionHeading";
import styles from "./AudemarsPiguet.module.css";

type CarouselSectionProps = {
  primary: string;
  secondary: string;
  cards: CarouselCard[];
  variant: "novelties" | "services";
  href?: string;
};

export function CarouselSection({
  primary,
  secondary,
  cards,
  variant,
  href,
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function update() {
      if (!track) return;
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    }
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.72, 220), behavior: "smooth" });
  }

  return (
    <section className={`${styles.carouselSection} ${variant === "services" ? styles.servicesSection : styles.noveltiesSection}`} aria-labelledby={`${variant}-heading`}>
      <div className={styles.carouselLayout}>
        <div className={styles.carouselIntro}>
          <SectionHeading className={styles.carouselHeading} primary={primary} secondary={secondary} />
          {href ? <a className={styles.lineLink} href={href}>Explore our novelties</a> : null}
        </div>

        <div className={styles.carouselTrack} ref={trackRef} tabIndex={0} aria-label={`${primary} ${secondary} carousel`}>
          {cards.map((card, index) => (
            <article className={`${styles.carouselCard} ${variant === "services" ? styles.serviceCard : styles.noveltyCard}`} key={`${card.href}-${index}`}>
              <a className={styles.cardImageLink} href={card.href} aria-label={`Discover more ${card.title}`}>
                <Image className={styles.cardImage} src={card.image} alt={card.alt} fill sizes={variant === "services" ? "(min-width: 1025px) 283px, 82vw" : "(min-width: 1025px) 194px, 72vw"} />
              </a>
              <div className={styles.cardBody}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a className={styles.lineLink} href={card.href}>Discover more</a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <button type="button" onClick={() => scroll(-1)} disabled={atStart} aria-label={`Previous ${secondary} cards`}><ArrowLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => scroll(1)} disabled={atEnd} aria-label={`Next ${secondary} cards`}><ArrowRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}

