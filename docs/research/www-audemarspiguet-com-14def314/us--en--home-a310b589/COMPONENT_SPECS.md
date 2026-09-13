# Component specifications

## `HeaderNavigation`

Fixed 112px desktop and 72px compact header. Exact extracted full logo appears centered on desktop and extracted AP monogram on compact screens. Left menu icon uses two horizontal strokes. Desktop right controls show watch, boutique and account icons; compact screens retain boutique and account. Drawer and locale dialog follow `BEHAVIORS.md`.

## `HeroStack`

Three full-viewport sections with local image/video assets. Content sits on the shared rail and is vertically centered; the text column is 414px desktop, 55–58% tablet, and full rail width mobile. Each title has a Neue Helvetica first line and Times Now italic second line. Description and underlined Discover link sit below with 26px and 28px gaps.

## `EditorialHeading`

Reusable two-line display heading. Accepts primary/secondary text, semantic heading level and contrast. Secondary line always uses the local italic face.

## `CarouselSection`

Black surface. Desktop uses a fixed left intro column and scroll track on the right; mobile stacks heading above the track. Novelty cards show watch media, title, short copy and Discover more link on interaction/focus. Services use larger cards and always-visible title/copy/link. Arrow controls sit at the section edge.

## `LookbookGrid`

Five media tiles in the source A/B arrangement. Desktop uses two-row CSS grid with one square/video tile and four supporting portrait/landscape tiles. Mobile uses a two-column mosaic with the video spanning both columns. All media is local and cover-cropped.

## `FeatureSections`

Paired discovery cards, AP Chronicles split feature and boutique split feature use local photography, uppercase thin headings, compact body copy and underlined CTAs. The paired cards stay side by side from 768px; split sections use equal columns from 1025px and stack on smaller screens.

## `NewsletterFooter`

Newsletter is a white band with three desktop columns: display heading, body/copyright notice and solid black CTA. Footer uses `#2b4f4f`, three extracted partner SVGs, locale control, four navigation columns, social icon row and copyright. Desktop footer height is approximately 795px; compact layout grows with disclosures.

