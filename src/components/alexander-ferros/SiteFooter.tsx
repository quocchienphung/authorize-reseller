import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import styles from "./Site.module.css";

const socialLinks = [
  ["Instagram", "https://www.instagram.com/alexander.ferros"],
  ["TikTok", "https://www.tiktok.com/@alexander.ferros"],
  ["YouTube", "https://www.youtube.com/@AlexanderFerros"],
  ["Facebook", "https://www.facebook.com/alexanderferrosofficial"],
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.afFooter}>
      <div className={styles.afFooterBrand}>
        <BrandLogo inverse />
        <p>Đồng hồ Alexander Ferros chính thức.</p>
      </div>
      <div className={styles.afFooterGrid}>
        <nav aria-label="Sản phẩm">
          <h2>Sản phẩm</h2>
          <Link href="/bo-suu-tap">Bộ sưu tập</Link>
          <Link href="/san-pham">Tất cả sản phẩm</Link>
          <Link href="/bo-suu-tap/nam">Đồng hồ nam</Link>
          <Link href="/bo-suu-tap/nu">Đồng hồ nữ</Link>
          <Link href="/bang-gia">Bảng giá</Link>
        </nav>
        <div>
          <h2>Dịch vụ</h2>
          <Link href="/dich-vu">Tất cả dịch vụ</Link>
          <Link href="/dich-vu/bao-hanh">Bảo hành &amp; hỗ trợ</Link>
          <Link href="/dich-vu/faq">Câu hỏi thường gặp</Link>
          <Link href="/dat-lich">Đặt lịch trải nghiệm</Link>
          <Link href="/lien-he">Liên hệ chúng tôi</Link>
        </div>
        <div>
          <h2>Liên hệ</h2>
          <a href="tel:19003222">Hotline CSKH: 1900 3222</a>
          <a href="tel:0813880666">WhatsApp: 0813 880 666</a>
          <a href="mailto:sales@alexanderferros.com">sales@alexanderferros.com</a>
        </div>
        <div>
          <h2>Showroom</h2>
          <Link href="/cua-hang">6A Lê Thánh Tông, Hoàn Kiếm, Hà Nội</Link>
          <Link href="/cua-hang">247 Kim Mã, Ba Đình, Hà Nội</Link>
        </div>
      </div>
      <div className={styles.afFooterBottom}>
        <nav aria-label="Mạng xã hội">
          {socialLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        </nav>
        <p>© 2026 Alexander Ferros</p>
      </div>
    </footer>
  );
}
