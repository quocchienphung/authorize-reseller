import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { routes, siteConfig, stores } from "@/config/site";

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

export function SiteFooter() {
  return (
    <footer className="rail border-t border-line bg-surface pt-20 pb-9 text-fg max-md:pt-16">
      <div className="border-b border-line pb-14">
        <BrandLogo markClassName="size-14 md:size-[68px]" className="text-xl md:text-2xl" />
        <p className="mt-5 max-w-md text-sm font-light md:ml-[84px]">
          Đồng hồ Alexander Ferros chính hãng — kiểm định và bảo hành tại Việt Nam.
        </p>
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
            Hotline CSKH: {siteConfig.contact.hotline.label}
          </a>
          <a href={siteConfig.contact.whatsapp.href} className={linkClass}>
            WhatsApp: {siteConfig.contact.whatsapp.label}
          </a>
          <a href={siteConfig.contact.email.href} className={linkClass}>
            {siteConfig.contact.email.label}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="type-eyebrow mb-2">Showroom</h2>
          {stores.map((store) => (
            <Link key={store.slug} href={routes.store(store.slug)} className={linkClass}>
              {store.address}, {store.district}, {store.city}
            </Link>
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
