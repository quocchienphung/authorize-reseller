import { products } from "@/lib/alexander-ferros";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeroStack } from "./HeroStack";
import { ProductCarousel } from "./ProductCarousel";
import { ProductMosaic } from "./ProductMosaic";
import { SiteFooter } from "./SiteFooter";
import styles from "./Site.module.css";

export function AlexanderFerrosHomepage() {
  const men = products.filter((product) => product.category === "Đồng hồ nam");
  const women = products.filter((product) => product.category === "Đồng hồ nữ");

  return (
    <main className={styles.site}>
      <HeaderNavigation />
      <HeroStack />
      <ProductCarousel primary="SẢN PHẨM" secondary="MỚI NHẤT" products={products.slice(0, 16)} />
      <ProductMosaic primary="ĐỒNG HỒ" secondary="NAM" products={men.slice(0, 5)} />
      <ProductCarousel primary="DÀNH CHO" secondary="QUÝ ÔNG" products={men.slice(5, 21)} />
      <ProductMosaic primary="ĐỒNG HỒ" secondary="NỮ" products={women.slice(0, 5)} />
      <ProductCarousel primary="DÀNH CHO" secondary="PHÁI ĐẸP" products={women.slice(5, 21)} />
      <SiteFooter />
    </main>
  );
}
