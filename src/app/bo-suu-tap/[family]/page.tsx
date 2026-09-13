import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/collections/ListingPage";
import { routes } from "@/config/site";
import { familyDisplayName, familyReference, getFamilyProducts, productFamilies } from "@/lib/products";

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
  const familyProducts = getFamilyProducts(family);
  if (!familyProducts.length) notFound();

  const lead = familyProducts[0];
  const categoryHref = lead.category === "Đồng hồ nam" ? routes.mens : routes.womens;

  return (
    <ListingPage
      breadcrumbs={[
        { label: "Bộ sưu tập", href: routes.collections },
        { label: lead.category, href: categoryHref },
        { label: familyReference(family) },
      ]}
      heading={{ primary: `DÒNG ${familyReference(family)}`, secondary: `${familyProducts.length} phiên bản` }}
      description={lead.description}
      products={familyProducts}
      showCategoryFilter={false}
    />
  );
}
