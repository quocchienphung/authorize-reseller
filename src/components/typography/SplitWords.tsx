import { Fragment, type CSSProperties } from "react";

type SplitWordsProps = {
  text: string;
  /** Index the stagger starts from, so a second line continues after the first. */
  offset?: number;
};

/**
 * Splits copy into word spans tagged for the staggered reveal in globals.css.
 * Words only (never letters) so Vietnamese diacritics are never broken apart.
 */
export function SplitWords({ text, offset = 0 }: SplitWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span>
            <span data-word style={{ "--word-index": offset + index } as CSSProperties}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}
