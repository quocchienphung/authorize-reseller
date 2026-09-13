import type { ReactNode } from "react";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
  /** Pages without a full-bleed hero get a white header and top padding. */
  solidHeader?: boolean;
  className?: string;
};

/** Header + main + footer wrapper shared by every route. */
export function PageShell({ children, solidHeader = false, className }: PageShellProps) {
  return (
    <>
      <SiteHeader solid={solidHeader} productCount={products.length} />
      <main className={cn("flex-1 bg-ink text-paper", solidHeader && "pt-(--header-height)", className)}>{children}</main>
      <SiteFooter />
    </>
  );
}
