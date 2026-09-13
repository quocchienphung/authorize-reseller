import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreDetailPage, type StoreSlug } from "@/components/alexander-ferros/PublicPages";

const storeSlugs: StoreSlug[] = ["le-thanh-tong", "kim-ma"];
export const dynamicParams = false;
export function generateStaticParams() { return storeSlugs.map((slug) => ({ slug })); }

type StorePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug === "kim-ma" ? "Showroom 247 Kim Mã" : "Showroom 6A Lê Thánh Tông" };
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  if (!storeSlugs.includes(slug as StoreSlug)) notFound();
  return <StoreDetailPage slug={slug as StoreSlug} />;
}
