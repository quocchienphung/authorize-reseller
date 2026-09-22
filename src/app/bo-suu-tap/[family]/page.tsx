import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/collections/ListingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { categoryRoute, familyReference, getFamilyProducts, productFamilies } from "@/lib/products";
import { familyMetadata, productListJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return productFamilies.map((family) => ({ family }));
}

type FamilyPageProps = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family } = await params;
  const familyProducts = getFamilyProducts(family);
  if (!familyProducts.length) return { title: "Không tìm thấy dòng sản phẩm", robots: { index: false } };
  return familyMetadata(family, familyProducts);
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;
  const familyProducts = getFamilyProducts(family);
  if (!familyProducts.length) notFound();

  const lead = familyProducts[0];

  return (
    <ListingPage
      breadcrumbs={[
        { label: "Bộ sưu tập", href: routes.collections },
        { label: lead.category, href: categoryRoute(lead) },
        { label: familyReference(family) },
      ]}
      heading={{ primary: `DÒNG ${familyReference(family)}`, secondary: `Alexander Ferros · ${familyProducts.length} phiên bản` }}
      description={`${lead.category} Alexander Ferros ${familyReference(family)} chính hãng. ${lead.description}`}
      products={familyProducts}
      showCategoryFilter={false}
    >
      <JsonLd data={productListJsonLd(`Alexander Ferros ${familyReference(family)}`, routes.family(family), familyProducts)} />
    </ListingPage>
  );
}
