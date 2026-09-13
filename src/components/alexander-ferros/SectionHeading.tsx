import styles from "./Site.module.css";

type SectionHeadingProps = {
  primary: string;
  secondary: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  primary,
  secondary,
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <Heading className={`${styles.sectionHeading} ${className}`}>
      <span>{primary}</span>
      <em>{secondary}</em>
    </Heading>
  );
}


