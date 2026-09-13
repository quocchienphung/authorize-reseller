import { cn } from "@/lib/utils";
import { SplitWords, wordCount } from "./SplitWords";

type SectionHeadingProps = {
  /** First line, extra-light uppercase sans. */
  primary: string;
  /** Second line, italic serif. */
  secondary?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Two-line display heading from the Audemars Piguet layout language. Each
 * word slides in with a stagger once the surrounding [data-reveal] block
 * enters the viewport.
 */
export function SectionHeading({ primary, secondary, as: Heading = "h2", className }: SectionHeadingProps) {
  return (
    <Heading className={cn("m-0", className)}>
      <span className="type-display block">
        <SplitWords text={primary} />
      </span>
      {secondary ? (
        <em className="type-display-serif block">
          <SplitWords text={secondary} offset={wordCount(primary)} />
        </em>
      ) : null}
    </Heading>
  );
}
