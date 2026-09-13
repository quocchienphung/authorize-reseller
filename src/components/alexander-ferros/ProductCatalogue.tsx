"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { AlexanderFerrosProduct } from "@/lib/alexander-ferros";
import styles from "./ProductCatalogue.module.css";

type Category = "all" | "nam" | "nu";

export function ProductCatalogue({
  products,
  initialCategory,
}: {
  products: AlexanderFerrosProduct[];
  initialCategory: Category;
}) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return products.filter((product) => {
      const categoryMatches = category === "all" || (category === "nam" ? product.category === "Đồng hồ nam" : product.category === "Đồng hồ nữ");
      const queryMatches = !normalizedQuery || `${product.name} ${product.sku}`.toLocaleLowerCase("vi").includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, products, query]);

  return (
    <div className={styles.catalogue}>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Lọc danh mục">
          {(["all", "nam", "nu"] as const).map((value) => (
            <button className={category === value ? styles.active : ""} type="button" onClick={() => setCategory(value)} key={value}>
              {value === "all" ? "Tất cả" : value === "nam" ? "Đồng hồ nam" : "Đồng hồ nữ"}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <Search aria-hidden="true" />
          <span className="sr-only">Tìm theo tên hoặc mã</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên hoặc mã" />
        </label>
      </div>
      <p className={styles.count}>{filtered.length} sản phẩm</p>
      <div className={styles.grid}>
        {filtered.map((product) => (
          <article className={styles.card} key={product.slug}>
            <Link className={styles.image} href={`/san-pham/${product.slug}`} aria-label={product.name}>
              <Image src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
            </Link>
            <div className={styles.copy}>
              <p>{product.sku}</p>
              <h2><Link href={`/san-pham/${product.slug}`}>{product.name}</Link></h2>
              <strong>{product.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
