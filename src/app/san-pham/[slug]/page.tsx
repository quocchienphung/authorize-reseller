import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProduct, products } from "@/lib/products";
import { productJsonLd, productMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm", robots: { index: false } };
  return productMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <ProductDetailPage product={product} />
    </>
  );
}
