import Image from "next/image";
import Link from "next/link";
import type { AlexanderFerrosProduct } from "@/lib/alexander-ferros";
import { SectionHeading } from "./SectionHeading";
import styles from "./Site.module.css";

export function ProductMosaic({
  primary,
  secondary,
  products,
}: {
  primary: string;
  secondary: string;
  products: AlexanderFerrosProduct[];
}) {
  return (
    <section className={styles.afMosaicSection}>
      <div className={styles.afMosaicHeading}>
        <SectionHeading primary={primary} secondary={secondary} />
      </div>
      <div className={styles.afMosaic}>
        {products.slice(0, 5).map((product, index) => (
          <Link className={styles.afMosaicItem} data-size={index === 0 ? "hero" : "tile"} href={`/san-pham/${product.slug}`} key={product.slug}>
            <Image src={product.image} alt={product.name} fill sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "25vw"} />
            <span>{product.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
