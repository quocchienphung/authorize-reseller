import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreDetailPage } from "@/components/pages/StoresPage";
import { getStore, routes, storeAddress, stores } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return stores.map((store) => ({ slug: store.slug }));
}

type StorePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Showroom", robots: { index: false } };
  return pageMetadata({
    title: store.name,
    description: `Showroom LENHI Luxury tại ${storeAddress(store)} — đại lý phân phối chính hãng Alexander Ferros. Mở cửa ${store.hours}. Xem chỉ đường và đặt lịch trải nghiệm.`,
    path: routes.store(store.slug),
  });
}

export default async function StoreRoute({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  return <StoreDetailPage store={store} />;
}
