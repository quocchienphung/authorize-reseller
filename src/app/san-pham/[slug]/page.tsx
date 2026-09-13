import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/alexander-ferros/ProductDetail";
import { getProduct, products } from "@/lib/alexander-ferros";

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

  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
