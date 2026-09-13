import type { ReactNode } from "react";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  primary: string;
  secondary?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

/** Standard heading block for editorial / utility pages. */
export function PageIntro({ eyebrow, primary, secondary, description, children, className }: PageIntroProps) {
  return (
    <header className={cn("rail flex flex-col pt-16 pb-14 md:pt-24 md:pb-20", className)} data-reveal>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <SectionHeading as="h1" primary={primary} secondary={secondary} />
      {description ? <p className="type-body mt-6 max-w-2xl text-fg/75">{description}</p> : null}
      {children}
    </header>
  );
}
