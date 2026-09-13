import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** First line, ultra-light uppercase sans. */
  primary: string;
  /** Second line, extra-light italic serif. */
  secondary?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Two-line display heading from the Audemars Piguet layout language. */
export function SectionHeading({ primary, secondary, as: Heading = "h2", className }: SectionHeadingProps) {
  return (
    <Heading className={cn("m-0", className)}>
      <span className="type-display block">{primary}</span>
      {secondary ? <em className="type-display-serif block">{secondary}</em> : null}
    </Heading>
  );
}
