import { cn } from "@/lib/utils";
import { SplitWords, wordCount } from "./SplitWords";

type SectionHeadingProps = {
  /** First line, extra-light uppercase sans. */
  primary: string;
  /** Second line, italic serif by default. */
  secondary?: string;
  /** `code` sets the second line upright in the sans face, for reference numbers. */
  secondaryVariant?: "serif" | "code";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Two-line display heading from the Audemars Piguet layout language. Each
 * word slides in with a stagger once the surrounding [data-reveal] block
 * enters the viewport.
 */
export function SectionHeading({
  primary,
  secondary,
  secondaryVariant = "serif",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Heading className={cn("m-0", className)}>
      <span className="type-display block">
        <SplitWords text={primary} />
      </span>
      {secondary && secondaryVariant === "code" ? (
        <span className="type-display-code mt-2 block">
          <SplitWords text={secondary} offset={wordCount(primary)} />
        </span>
      ) : secondary ? (
        <em className="type-display-serif block">
          <SplitWords text={secondary} offset={wordCount(primary)} />
        </em>
      ) : null}
    </Heading>
  );
}
