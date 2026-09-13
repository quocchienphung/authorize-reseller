import Image from "next/image";
import Link from "next/link";
import { AutoVideo } from "./AutoVideo";
import { ContactForm } from "./ContactForm";
import { HeaderNavigation } from "./HeaderNavigation";
import { ProductCarousel } from "./ProductCarousel";
import { ProductCatalogue } from "./ProductCatalogue";
import { SectionHeading } from "./SectionHeading";
import { SiteFooter } from "./SiteFooter";
import { familyDisplayName, getFamilyProducts, products } from "@/lib/alexander-ferros";
import catalogueStyles from "./ProductCatalogue.module.css";
import styles from "./PublicPages.module.css";
import siteStyles from "./Site.module.css";

const men = products.filter((product) => product.category === "Đồng hồ nam");
const women = products.filter((product) => product.category === "Đồng hồ nữ");

function VideoHero({ primary, secondary, description }: { primary: string; secondary: string; description: string }) {
  return (
    <section className={styles.videoHero}>
      <div className={styles.videoMedia}>
        <AutoVideo src="/alexander-ferros/videos/atelier.mp4" label={`${primary} ${secondary}`} />
      </div>
      <div className={styles.videoVeil} />
      <div className={styles.videoCopy} data-reveal>
        <SectionHeading as="h1" primary={primary} secondary={secondary} />
        <p>{description}</p>
      </div>
    </section>
  );
}

function ProductCollectionPanel({
  title,
  description,
  href,
  image,
  reverse = false,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className={`${styles.collectionPanel} ${reverse ? styles.reverse : ""}`}>
      <Link className={styles.collectionImage} href={href} data-reveal="image">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" />
      </Link>
      <div className={styles.collectionCopy} data-reveal>
        <p>Bộ sưu tập</p>
        <h2>{title}</h2>
        <span>{description}</span>
        <Link className={styles.lineLink} href={href}>Khám phá bộ sưu tập</Link>
      </div>
    </section>
  );
}

export function CollectionOverview() {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation />
      <VideoHero
        primary="BỘ SƯU TẬP"
        secondary="ALEXANDER FERROS"
        description="Toàn bộ sản phẩm chính hãng, được sắp xếp theo từng phong cách và người đeo."
      />
      <ProductCollectionPanel
        title="ĐỒNG HỒ NAM"
        description="Các thiết kế dành cho quý ông, từ thanh lịch cổ điển đến cá tính thể thao."
        href="/bo-suu-tap/nam"
        image={men[0].image}
      />
      <ProductCollectionPanel
        title="ĐỒNG HỒ NỮ"
        description="Những mẫu đồng hồ nữ với tỷ lệ tinh tế và bảng màu đa dạng."
        href="/bo-suu-tap/nu"
        image={women[0].image}
        reverse
      />
      <ProductCarousel primary="SẢN PHẨM" secondary="MỚI NHẤT" products={products.slice(0, 16)} />
      <SiteFooter />
    </main>
  );
}

export function CategoryCollection({ category }: { category: "nam" | "nu" }) {
  const selected = category === "nam" ? men : women;
  const label = category === "nam" ? "ĐỒNG HỒ NAM" : "ĐỒNG HỒ NỮ";

  return (
    <main className={`${siteStyles.site} ${catalogueStyles.page} ${styles.page}`}>
      <HeaderNavigation solid />
      <header className={`${catalogueStyles.intro} ${styles.listingIntro}`} data-reveal>
        <p>Bộ sưu tập Alexander Ferros</p>
        <h1>{label}<em>{selected.length} MẪU</em></h1>
        <span>Đúng tên gọi, mã sản phẩm, giá và hình ảnh chính thức của từng phiên bản.</span>
      </header>
      <ProductCatalogue products={selected} initialCategory={category} />
      <SiteFooter />
    </main>
  );
}

export function LatestCollection() {
  const latest = products.slice(0, 48);
  return (
    <main className={`${siteStyles.site} ${catalogueStyles.page} ${styles.page}`}>
      <HeaderNavigation solid />
      <header className={`${catalogueStyles.intro} ${styles.listingIntro}`} data-reveal>
        <p>Alexander Ferros</p>
        <h1>SẢN PHẨM<em>MỚI NHẤT</em></h1>
        <span>Các phiên bản mới nhất đang có trong catalog chính thức.</span>
      </header>
      <ProductCatalogue products={latest} initialCategory="all" />
      <SiteFooter />
    </main>
  );
}

export function ProductFamilyCollection({ familySlug }: { familySlug: string }) {
  const familyProducts = getFamilyProducts(familySlug);
  const title = familyDisplayName(familySlug);
  const lead = familyProducts[0];

  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation />
      <section className={styles.familyHero}>
        <div className={styles.familyHeroMedia}><AutoVideo src="/alexander-ferros/videos/official-film.mp4" label={title} /></div>
        <div className={styles.videoVeil} />
        <div className={styles.familyHeroCopy} data-reveal>
          <p>Gặp gỡ</p>
          <h1>{title}</h1>
          <Link className={styles.lineLink} href="#san-pham">Xem các phiên bản</Link>
        </div>
      </section>
      <section className={styles.familyIntro}>
        <div data-reveal>
          <p>{lead?.description || `${title} là một phần trong bộ sưu tập đồng hồ chính hãng Alexander Ferros.`}</p>
        </div>
        {lead ? <div className={styles.familyWatch} data-reveal="image"><Image src={lead.image} alt={lead.name} fill sizes="50vw" /></div> : null}
      </section>
      {familyProducts.length ? <ProductCarousel primary="CÁC PHIÊN BẢN" secondary={title.replace("Alexander Ferros ", "")} products={familyProducts} /> : null}
      <section id="san-pham" className={styles.familyProducts}>
        <header data-reveal><SectionHeading primary="KHÁM PHÁ" secondary="SẢN PHẨM" /></header>
        <ProductCatalogue products={familyProducts} initialCategory="all" />
      </section>
      <SiteFooter />
    </main>
  );
}

function numericPrice(price: string) {
  return Number(price.replace(/\D/g, ""));
}

export function PriceGuide() {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <header className={styles.pageIntro} data-reveal>
        <p>Catalog chính thức</p>
        <SectionHeading as="h1" primary="BẢNG GIÁ" secondary="SẢN PHẨM" />
        <span>Giá được lấy theo từng phiên bản Alexander Ferros trong dữ liệu sản phẩm hiện tại.</span>
      </header>
      <section className={styles.priceSection}>
        <div className={styles.priceHeader}><span>Sản phẩm</span><span>Mã</span><span>Giá</span></div>
        {products.slice().sort((a, b) => numericPrice(b.price) - numericPrice(a.price)).map((product) => (
          <Link className={styles.priceRow} href={`/san-pham/${product.slug}`} key={product.slug} data-reveal>
            <span>{product.name}</span><span>{product.sku}</span><strong>{product.price}</strong>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}

const serviceCards = [
  { title: "TÌM ĐỒNG HỒ", copy: "Duyệt và lọc toàn bộ 208 phiên bản để tìm mẫu phù hợp.", href: "/san-pham" },
  { title: "ĐẶT LỊCH TƯ VẤN", copy: "Chọn thời gian để trải nghiệm sản phẩm trực tiếp cùng chuyên viên.", href: "/dat-lich" },
  { title: "BẢO HÀNH", copy: "Thông tin kiểm định, bảo hành và hỗ trợ kỹ thuật cho sản phẩm.", href: "/dich-vu/bao-hanh" },
  { title: "CỬA HÀNG", copy: "Tìm địa chỉ showroom và thông tin liên hệ chính thức.", href: "/cua-hang" },
] as const;

export function ServicesOverview() {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation />
      <VideoHero primary="DỊCH VỤ" secondary="CHÍNH HÃNG" description="Hỗ trợ sản phẩm trước, trong và sau khi mua." />
      <section className={styles.serviceSection}>
        <SectionHeading primary="DỊCH VỤ" secondary="DÀNH CHO BẠN" />
        <div className={styles.serviceGrid}>
          {serviceCards.map((service, index) => (
            <article key={service.title} data-reveal>
              <Link className={styles.serviceImage} href={service.href}>
                <Image src={products[index * 9].image} alt={service.title} fill sizes="(min-width: 1024px) 25vw, 75vw" />
              </Link>
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
              <Link className={styles.lineLink} href={service.href}>Xem chi tiết</Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

export function WarrantyPage() {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <header className={styles.pageIntro} data-reveal>
        <p>Dịch vụ Alexander Ferros</p>
        <SectionHeading as="h1" primary="BẢO HÀNH" secondary="& HỖ TRỢ" />
        <span>Mỗi sản phẩm được kiểm tra và căn chỉnh trước khi đến tay khách hàng.</span>
      </header>
      <section className={styles.informationGrid}>
        <article data-reveal><strong>01</strong><h2>Kiểm định</h2><p>100% sản phẩm trải qua quy trình kiểm tra và căn chỉnh tại Việt Nam.</p></article>
        <article data-reveal><strong>02</strong><h2>Bảo hành</h2><p>Bảo hành chính hãng toàn cầu, với chính sách hỗ trợ cả lỗi do người dùng.</p></article>
        <article data-reveal><strong>03</strong><h2>Hỗ trợ</h2><p>Hỗ trợ kỹ thuật toàn quốc qua hotline 1900 3222 và hệ thống đại lý.</p></article>
      </section>
      <section className={styles.callout} data-reveal>
        <SectionHeading primary="CẦN" secondary="HỖ TRỢ?" />
        <div><p>Đội ngũ chăm sóc khách hàng sẵn sàng tiếp nhận thông tin sản phẩm của bạn.</p><Link href="/lien-he">Liên hệ ngay</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}

export function StoresPage() {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <section className={styles.storeHero}>
        <div data-reveal>
          <p>Hệ thống chính thức</p>
          <SectionHeading as="h1" primary="TÌM" secondary="SHOWROOM" />
          <span>Trải nghiệm trực tiếp các mẫu Alexander Ferros cùng đội ngũ tư vấn.</span>
        </div>
        <div className={styles.storeWatch} data-reveal="image"><Image src={products[24].image} alt="Alexander Ferros showroom" fill sizes="50vw" /></div>
      </section>
      <section className={styles.storeList}>
        <article data-reveal><span>Hà Nội · Hoàn Kiếm</span><h2>6A LÊ THÁNH TÔNG</h2><p>Hoàn Kiếm, Hà Nội</p><a href="tel:19003222">1900 3222</a><Link href="/cua-hang/le-thanh-tong">Xem showroom</Link></article>
        <article data-reveal><span>Hà Nội · Ba Đình</span><h2>247 KIM MÃ</h2><p>Ba Đình, Hà Nội</p><a href="tel:19003222">1900 3222</a><Link href="/cua-hang/kim-ma">Xem showroom</Link></article>
      </section>
      <SiteFooter />
    </main>
  );
}

const stores = {
  "le-thanh-tong": { city: "Hà Nội · Hoàn Kiếm", name: "6A LÊ THÁNH TÔNG", district: "Hoàn Kiếm, Hà Nội" },
  "kim-ma": { city: "Hà Nội · Ba Đình", name: "247 KIM MÃ", district: "Ba Đình, Hà Nội" },
} as const;

export type StoreSlug = keyof typeof stores;

export function StoreDetailPage({ slug }: { slug: StoreSlug }) {
  const store = stores[slug];
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <section className={styles.storeDetailHero}>
        <div data-reveal><p>{store.city}</p><h1>{store.name}</h1><span>Alexander Ferros Showroom</span></div>
        <div data-reveal="image"><Image src={products[44].image} alt={`Showroom ${store.name}`} fill sizes="50vw" /></div>
      </section>
      <section className={styles.storeFacts}>
        <article data-reveal><h2>ĐỊA CHỈ</h2><p>{store.name}, {store.district}</p><a href="tel:19003222">1900 3222</a></article>
        <article data-reveal><h2>GIỜ MỞ CỬA</h2><p>Thứ Hai – Chủ Nhật</p><strong>09:00 – 21:00</strong></article>
        <article data-reveal><h2>TRẢI NGHIỆM</h2><p>Đặt lịch trước để được chuẩn bị sản phẩm và tư vấn riêng.</p><Link href="/dat-lich">Đặt lịch</Link></article>
      </section>
      <SiteFooter />
    </main>
  );
}

export function FaqPage() {
  const faqs = [
    ["Làm thế nào để chọn đúng sản phẩm?", "Bạn có thể lọc theo đồng hồ nam, nữ, tìm bằng mã hoặc đặt lịch để được tư vấn."],
    ["Sản phẩm có được bảo hành không?", "Thông tin bảo hành áp dụng theo chính sách chính hãng của Alexander Ferros và hồ sơ đi kèm sản phẩm."],
    ["Tôi có thể xem sản phẩm trực tiếp ở đâu?", "Bạn có thể trải nghiệm tại showroom 6A Lê Thánh Tông hoặc 247 Kim Mã, Hà Nội."],
    ["Giá trên website có theo từng phiên bản không?", "Có. Mỗi mã sản phẩm có tên và mức giá riêng trong catalog."],
  ] as const;
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <header className={styles.pageIntro} data-reveal><p>Dịch vụ</p><SectionHeading as="h1" primary="CÂU HỎI" secondary="THƯỜNG GẶP" /><span>Thông tin nhanh về sản phẩm, giá, showroom và bảo hành.</span></header>
      <section className={styles.faqList}>
        {faqs.map(([question, answer]) => <details key={question} data-reveal><summary>{question}</summary><p>{answer}</p></details>)}
      </section>
      <SiteFooter />
    </main>
  );
}

export function ContactPage({ appointment = false }: { appointment?: boolean }) {
  return (
    <main className={`${siteStyles.site} ${styles.page}`}>
      <HeaderNavigation solid />
      <section className={styles.contactLayout}>
        <div className={styles.contactIntro} data-reveal>
          <p>Alexander Ferros</p>
          <SectionHeading as="h1" primary={appointment ? "ĐẶT LỊCH" : "LIÊN HỆ"} secondary={appointment ? "TRẢI NGHIỆM" : "VỚI CHÚNG TÔI"} />
          <span>{appointment ? "Chọn thời gian phù hợp để được tư vấn trực tiếp." : "Gửi câu hỏi về sản phẩm, bảo hành hoặc hệ thống đại lý."}</span>
          <a href="tel:19003222">Hotline 1900 3222</a>
          <a href="mailto:sales@alexanderferros.com">sales@alexanderferros.com</a>
        </div>
        <div data-reveal><ContactForm appointment={appointment} /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
