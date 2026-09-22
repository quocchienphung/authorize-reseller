import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: readonly Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Trang chủ", href: routes.home }, ...items];

  return (
    <nav aria-label="Đường dẫn" className={cn("rail py-3 text-xs", className)}>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <Fragment key={`${crumb.label}-${index}`}>
              <li>
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="text-fg/60 transition-colors hover:text-fg">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="line-clamp-1 text-fg">
                    {crumb.label}
                  </span>
                )}
              </li>
              {isLast ? null : (
                <li aria-hidden="true" className="flex items-center text-fg/40">
                  <ChevronRight className="size-3.5 stroke-[1.5]" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
