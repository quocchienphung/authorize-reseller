/** Server-rendered JSON-LD block. `data` comes from the builders in `src/lib/seo.ts`. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
