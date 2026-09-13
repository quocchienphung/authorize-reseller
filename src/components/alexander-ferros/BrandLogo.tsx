import Link from "next/link";
import styles from "./Site.module.css";

type BrandLogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return (
    <Link
      className={`${styles.afBrand} ${compact ? styles.afBrandCompact : ""} ${inverse ? styles.afBrandInverse : ""}`}
      href="/"
      aria-label="Alexander Ferros - Trang chủ"
    >
      <span className={styles.afBrandMark} aria-hidden="true" />
      <span className={styles.afBrandName}>Alexander Ferros</span>
    </Link>
  );
}
