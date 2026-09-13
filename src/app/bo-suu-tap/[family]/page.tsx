import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductFamilyCollection } from "@/components/alexander-ferros/PublicPages";
import { familyDisplayName, getFamilyProducts, productFamilies } from "@/lib/alexander-ferros";

export const dynamicParams = false;

export function generateStaticParams() {
  return productFamilies.map((family) => ({ family }));
}

type FamilyPageProps = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family } = await params;
  return { title: familyDisplayName(family) };
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;
  if (!getFamilyProducts(family).length) notFound();
  return <ProductFamilyCollection familySlug={family} />;
}
