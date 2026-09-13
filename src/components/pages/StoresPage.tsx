import Image from "next/image";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageShell } from "@/components/layout/PageShell";
import { LineLink } from "@/components/ui/LineLink";
import { PillLink } from "@/components/ui/PillLink";
import { routes, siteConfig, stores, type Store } from "@/config/site";

export function StoresPage() {
  return (
    <PageShell solidHeader>
      <PageIntro
        eyebrow="Hệ thống chính thức"
        primary="TÌM"
        secondary="showroom"
        description="Trải nghiệm trực tiếp các mẫu Alexander Ferros cùng đội ngũ tư vấn."
      />
      <section className="rail grid gap-6 pb-28 md:grid-cols-2" aria-label="Danh sách showroom">
        {stores.map((store, index) => (
          <article
            key={store.slug}
            className="flex flex-col border border-paper/15 p-8 md:p-10"
            data-reveal
            style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
          >
            <p className="type-eyebrow m-0 text-paper/55">
              {store.city} · {store.district}
            </p>
            <h2 className="m-0 mt-4 text-3xl font-thin uppercase">{store.address}</h2>
            <p className="type-body mt-3 text-paper/70">
              {store.district}, {store.city}
            </p>
            <p className="type-body mt-1 text-paper/70">{store.hours}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <PillLink href={routes.store(store.slug)} variant="outline">
                Xem showroom
              </PillLink>
              <a href={siteConfig.contact.hotline.href} className="text-sm font-medium underline-offset-4 hover:underline">
                {siteConfig.contact.hotline.label}
              </a>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

export function StoreDetailPage({ store }: { store: Store }) {
  return (
    <PageShell solidHeader>
      <section className="rail grid gap-12 pt-16 pb-20 md:grid-cols-2 md:items-center md:pt-24" aria-label={store.name}>
        <div className="flex flex-col" data-reveal>
          <p className="type-eyebrow m-0 text-paper/55">
            {store.city} · {store.district}
          </p>
          <h1 className="m-0 mt-5">
            <span className="type-display block">{store.address}</span>
            <em className="type-display-serif block">Showroom Alexander Ferros</em>
          </h1>
          <p className="type-body mt-8 max-w-md text-paper/75">Đặt lịch trước để được chuẩn bị sản phẩm và tư vấn riêng.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <PillLink href={routes.appointment}>Đặt lịch trải nghiệm</PillLink>
            <LineLink href={routes.stores}>Tất cả showroom</LineLink>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden" data-reveal="media">
          <Image src="/alexander-ferros/editorial/brand-values.webp" alt="Không gian trưng bày Alexander Ferros" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="rail grid gap-px border-y border-paper/15 pb-0 md:grid-cols-3" aria-label="Thông tin showroom">
        {[
          { title: "Địa chỉ", body: `${store.address}, ${store.district}, ${store.city}` },
          { title: "Giờ mở cửa", body: store.hours },
          { title: "Hotline", body: siteConfig.contact.hotline.label, href: siteConfig.contact.hotline.href },
        ].map((item) => (
          <div key={item.title} className="py-10 md:pr-10" data-reveal>
            <h2 className="type-eyebrow m-0 text-paper/55">{item.title}</h2>
            {item.href ? (
              <a href={item.href} className="mt-3 block text-xl font-light hover:opacity-60">
                {item.body}
              </a>
            ) : (
              <p className="m-0 mt-3 text-xl font-light">{item.body}</p>
            )}
          </div>
        ))}
      </section>
      <div className="h-24" />
    </PageShell>
  );
}
