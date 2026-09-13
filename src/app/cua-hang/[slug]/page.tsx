import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreDetailPage } from "@/components/pages/StoresPage";
import { getStore, stores } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return stores.map((store) => ({ slug: store.slug }));
}

type StorePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: getStore(slug)?.name ?? "Showroom" };
}

export default async function StoreRoute({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  return <StoreDetailPage store={store} />;
}
