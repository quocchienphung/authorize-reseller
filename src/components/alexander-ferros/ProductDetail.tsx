import Image from "next/image";
import Link from "next/link";
import type { AlexanderFerrosProduct } from "@/lib/alexander-ferros";
import { getRelatedProducts, specificationValue } from "@/lib/alexander-ferros";
import { HeaderNavigation } from "./HeaderNavigation";
import { AutoVideo } from "./AutoVideo";
import { ProductCarousel } from "./ProductCarousel";
import { SiteFooter } from "./SiteFooter";
import styles from "./ProductDetail.module.css";
import siteStyles from "./Site.module.css";

function specSentence(product: AlexanderFerrosProduct, labels: RegExp[]) {
  return labels
    .map((pattern) => product.specifications.find(([label]) => pattern.test(label)))
    .filter((row): row is [string, string] => Boolean(row))
    .map(([label, value]) => `${label}: ${value}`)
    .join(". ");
}

export function ProductDetail({ product }: { product: AlexanderFerrosProduct }) {
  const related = getRelatedProducts(product);
  const size = specificationValue(product, /Kích thước/i);
  const movement = specificationValue(product, /Bộ máy|Năng lượng/i);
  const waterResistance = specificationValue(product, /chống nước/i);
  const caseSpecs = product.specifications.filter(([label]) => /Kích thước|chống nước|mặt kính|Xuất xứ/i.test(label));
  const dialSpecs = product.specifications.filter(([label]) => /Hình dạng mặt số|Giới tính/i.test(label));
  const braceletSpecs = product.specifications.filter(([label]) => /Chất liệu dây/i.test(label));
  const movementSpecs = product.specifications.filter(([label]) => /Bộ máy|Năng lượng|Thương hiệu/i.test(label));

  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation />
      <section className={styles.productHero} data-product-detail>
        <div className={styles.heroTexture} aria-hidden="true">
          <Image src={product.image} alt="" fill priority sizes="100vw" />
        </div>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.eyebrow}>{product.category}</p>
          <h1><span>ĐỒNG HỒ</span><em>ALEXANDER FERROS<br />{product.sku}</em></h1>
          <p className={styles.reference}>Ref. {product.sku}</p>
          <p className={styles.price}>{product.price}</p>
          <Link className={styles.primaryAction} href="/dat-lich">Đặt lịch trải nghiệm</Link>
        </div>
        <div className={styles.heroWatch} data-reveal="image">
          <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </section>

      <section className={styles.detailFilm} aria-label={`Phim chính thức ${product.name}`}>
        <div data-reveal="image">
          <AutoVideo src="/alexander-ferros/videos/official-film.mp4" label={`Alexander Ferros ${product.sku}`} />
        </div>
      </section>

      <section className={styles.featureStack} aria-label={`Chi tiết ${product.name}`}>
        <article className={styles.featureRow}>
          <div className={styles.featureCopy} data-reveal>
            <h2>VỎ</h2>
            <p>{specSentence(product, [/Kích thước/i, /Mức chống nước/i, /Xuất xứ/i]) || product.description}</p>
            <div className={styles.featureFacts}>
              {size ? <p><span>Kích thước</span>{size}</p> : null}
              {waterResistance ? <p><span>Chống nước</span>{waterResistance}</p> : null}
            </div>
          </div>
          <div className={`${styles.featureImage} ${styles.caseImage}`} data-reveal="image">
            <Image src={product.image} alt={`Chi tiết vỏ ${product.name}`} fill sizes="50vw" />
          </div>
        </article>

        <article className={`${styles.featureRow} ${styles.featureRowReverse}`}>
          <div className={`${styles.featureImage} ${styles.dialImage}`} data-reveal="image">
            <Image src={product.image} alt={`Chi tiết mặt số ${product.name}`} fill sizes="50vw" />
          </div>
          <div className={styles.featureCopy} data-reveal>
            <h2>MẶT SỐ</h2>
            <p>{specSentence(product, [/Hình dạng mặt số/i, /Chất liệu mặt kính/i]) || `Mặt số của ${product.name}.`}</p>
          </div>
        </article>

        <article className={styles.featureRow}>
          <div className={styles.featureCopy} data-reveal>
            <h2>DÂY ĐEO</h2>
            <p>{specSentence(product, [/Chất liệu dây/i]) || `Dây đeo của ${product.name}.`}</p>
            {movement ? <p className={styles.movementFact}><span>Bộ máy</span>{movement}</p> : null}
          </div>
          <div className={`${styles.featureImage} ${styles.strapImage}`} data-reveal="image">
            <Image src={product.image} alt={`Chi tiết dây đeo ${product.name}`} fill sizes="50vw" />
          </div>
        </article>
      </section>

      <section className={styles.closeUp}>
        <h2 data-reveal>CẬN CẢNH <em>&amp; CHI TIẾT</em></h2>
        <div className={styles.closeUpGrid}>
          <div data-reveal="image"><Image src={product.image} alt={`Cận cảnh ${product.name}`} fill sizes="50vw" /></div>
          <div data-reveal="image"><Image src={product.image} alt={`Mặt số ${product.name}`} fill sizes="50vw" /></div>
        </div>
      </section>

      <section className={styles.specifications}>
        <div className={styles.specHeading} data-reveal>
          <h2>THÔNG SỐ KỸ THUẬT</h2>
          <Link href="/dich-vu/bao-hanh">Xem thông tin bảo hành</Link>
        </div>
        <div className={styles.specTabs} data-reveal><strong>Đồng hồ</strong><span>Bộ máy</span><span>Bảo hành</span></div>
        <div className={styles.specGrid} data-reveal>
          {[
            ["VỎ", caseSpecs],
            ["MẶT SỐ", dialSpecs],
            ["DÂY ĐEO", braceletSpecs],
            ["BỘ MÁY", movementSpecs],
          ].map(([heading, rows]) => (
            <section key={heading as string}>
              <h3>{heading as string}</h3>
              <dl>
                {(rows as [string, string][]).map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>

      <div className={styles.backLink}><Link href="/san-pham">← Xem toàn bộ sản phẩm</Link></div>
      <ProductCarousel primary="CÓ THỂ BẠN" secondary="SẼ THÍCH" products={related} />
      <SiteFooter />
    </main>
  );
}
