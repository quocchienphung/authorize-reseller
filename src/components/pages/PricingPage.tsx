import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/site";
import { parsePrice, products } from "@/lib/products";

const rows = [...products].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

export function PricingPage() {
  return (
    <PageShell solidHeader>
      <PageIntro
        eyebrow="Catalog chính thức"
        primary="BẢNG GIÁ"
        secondary="sản phẩm"
        description={`Giá niêm yết của ${products.length} phiên bản Alexander Ferros, sắp xếp từ cao đến thấp.`}
      />
      <section className="rail pb-28" aria-label="Bảng giá">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[15px] font-light">
            <thead>
              <tr className="type-eyebrow border-b border-paper/25 text-left text-paper/55">
                <th scope="col" className="py-4 font-normal">Sản phẩm</th>
                <th scope="col" className="py-4 font-normal">Mã</th>
                <th scope="col" className="py-4 font-normal">Danh mục</th>
                <th scope="col" className="py-4 text-right font-normal">Giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper/10">
              {rows.map((product) => (
                <tr key={product.slug} className="transition-colors hover:bg-paper/5">
                  <td className="py-4">
                    <Link href={routes.product(product.slug)} className="hover:opacity-60">
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-4 tracking-[0.06em] text-paper/70">{product.sku}</td>
                  <td className="py-4 text-paper/70">{product.category}</td>
                  <td className="py-4 text-right font-normal">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
