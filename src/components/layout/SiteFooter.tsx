import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { routes, siteConfig, storeAddress, stores } from "@/config/site";
import { cn } from "@/lib/utils";

const footerColumns = [
  {
    title: "Sản phẩm",
    links: [
      { label: "Bộ sưu tập", href: routes.collections },
      { label: "Tất cả sản phẩm", href: routes.catalogue },
      { label: "Đồng hồ nam", href: routes.mens },
      { label: "Đồng hồ nữ", href: routes.womens },
      { label: "Bảng giá", href: routes.pricing },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { label: "Tất cả dịch vụ", href: routes.services },
      { label: "Bảo hành & hỗ trợ", href: routes.warranty },
      { label: "Câu hỏi thường gặp", href: routes.faq },
      { label: "Đặt lịch trải nghiệm", href: routes.appointment },
      { label: "Liên hệ chúng tôi", href: routes.contact },
    ],
  },
] as const;

const linkClass = "text-sm font-light leading-relaxed transition-opacity hover:opacity-60";
const { certificate } = siteConfig.reseller;

export function SiteFooter() {
  return (
    <footer className="rail border-t border-line bg-surface pt-20 pb-9 text-fg max-md:pt-16">
      <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-2 md:gap-16">
        <div>
          <BrandLogo markClassName="size-14 md:size-[68px]" className="text-xl md:text-2xl" />
          <p className="mt-5 max-w-md text-sm font-light md:ml-[84px]">
            Đồng hồ Alexander Ferros chính hãng — kiểm định và bảo hành tại Việt Nam.
          </p>
        </div>

        {/* Dealer certificate: the document at a modest size, the claim set beside it in the display register. */}
        <figure className="m-0 flex items-start gap-6 md:gap-8 lg:justify-self-end" data-reveal>
          <a
            href={certificate.image}
            target="_blank"
            rel="noreferrer"
            className="block w-[112px] shrink-0 overflow-hidden border border-line bg-paper transition-opacity hover:opacity-80 md:w-[140px]"
            aria-label="Mở chứng nhận đại lý ở kích thước đầy đủ"
          >
            <Image
              src={certificate.image}
              alt={`Chứng nhận ${siteConfig.reseller.name} là đại lý bán hàng chính thức của ${siteConfig.name}`}
              width={900}
              height={1253}
              sizes="140px"
              className="block h-auto w-full"
            />
          </a>
          <figcaption className="flex flex-col pt-1">
            <p className="type-eyebrow m-0 opacity-70">Chứng nhận đại lý</p>
            <p className="m-0 mt-4 text-[22px] leading-none font-extralight tracking-[0.04em] uppercase md:text-[26px]">Lê Nhi Luxury</p>
            <p className="font-serif m-0 mt-1.5 text-[24px] leading-[1.05] font-medium italic [text-wrap:balance] md:text-[28px]">đại lý phân phối chính hãng</p>
            <p className="m-0 mt-5 max-w-[300px] text-sm leading-relaxed font-light text-fg/70">
              Được {certificate.issuer} — {certificate.issuerRole} — chứng nhận, hiệu lực đến {certificate.validUntil}.
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
            <h2 className="type-eyebrow mb-2">{column.title}</h2>
            {column.links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="flex flex-col gap-3">
          <h2 className="type-eyebrow mb-2">Liên hệ</h2>
          <a href={siteConfig.contact.hotline.href} className={linkClass}>
            {siteConfig.contact.hotline.label}
          </a>
          <a href={siteConfig.contact.zalo.href} target="_blank" rel="noreferrer" className={linkClass}>
            {siteConfig.contact.zalo.label}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="type-eyebrow mb-2">Showroom</h2>
          {stores.map((store) => (
            <div key={store.slug} className="flex flex-col gap-1">
              <Link href={routes.store(store.slug)} className={linkClass}>
                {storeAddress(store)}
              </Link>
              <a href={store.mapUrl} target="_blank" rel="noreferrer" className={cn(linkClass, "text-fg/70")}>
                Chỉ đường trên Google Maps
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-line pt-8 text-[11px] md:flex-row md:items-center md:justify-between">
        <nav aria-label="Mạng xã hội" className="flex flex-wrap gap-6">
          {siteConfig.social.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-60">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="m-0 text-fg/80">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
