"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AlexanderFerrosProduct } from "@/lib/alexander-ferros";
import { SectionHeading } from "./SectionHeading";
import styles from "./Site.module.css";

type ProductCarouselProps = {
  primary: string;
  secondary: string;
  products: AlexanderFerrosProduct[];
};

export function ProductCarousel({ primary, secondary, products }: ProductCarouselProps) {
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
    trackRef.current?.scrollBy({ left: direction * Math.max((trackRef.current?.clientWidth ?? 400) * 0.72, 260), behavior: "smooth" });
  }

  return (
    <section className={`${styles.carouselSection} ${styles.afProductCarousel}`} aria-labelledby={`${primary}-${secondary}`}>
      <div className={styles.carouselLayout}>
        <div className={styles.carouselIntro}>
          <SectionHeading className={styles.carouselHeading} primary={primary} secondary={secondary} />
          <Link className={styles.lineLink} href="/san-pham">Xem tất cả 208 mẫu</Link>
        </div>
        <div className={styles.carouselTrack} ref={trackRef} tabIndex={0} aria-label={`${primary} ${secondary}`}>
          {products.map((product) => (
            <article className={`${styles.carouselCard} ${styles.afProductCard}`} key={product.slug}>
              <Link className={`${styles.cardImageLink} ${styles.afProductImageLink}`} href={`/san-pham/${product.slug}`} aria-label={product.name}>
                <Image className={`${styles.cardImage} ${styles.afProductImage}`} src={product.image} alt={product.name} fill sizes="(min-width: 1025px) 290px, 78vw" />
              </Link>
              <div className={styles.cardBody}>
                <h3>{product.name}</h3>
                <p className={styles.afSku}>{product.sku}</p>
                <p className={styles.afPrice}>{product.price}</p>
                <Link className={styles.lineLink} href={`/san-pham/${product.slug}`}>Xem chi tiết</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.carouselControls}>
        <button type="button" onClick={() => scroll(-1)} disabled={atStart} aria-label="Sản phẩm trước"><ArrowLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => scroll(1)} disabled={atEnd} aria-label="Sản phẩm tiếp theo"><ArrowRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}
