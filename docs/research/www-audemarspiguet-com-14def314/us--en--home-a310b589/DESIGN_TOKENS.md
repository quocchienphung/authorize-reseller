# Audemars Piguet homepage design tokens

## Typography

- Sans family: local Neue Helvetica files. Use 100 for display headings, 300 for body copy, 400 for labels, and 500 for compact controls.
- Editorial italic: local Times Now Extra Light Italic.
- Hero heading: 40/40px mobile, 48/48px tablet, 56/56px desktop; `-0.01em`; uppercase through presentation.
- Section heading: 38/38px mobile, 48/48px tablet, 56/56px desktop; sans first line and Times Now italic second line.
- Body: 14/20px on mobile and 14/21px on desktop.
- Small label/link: 12/16px, 0.01em; navigation group labels use 11px and 0.14em.

## Color and surface

- Main dark surface: `#000000`.
- Main light surface: `#ffffff`.
- Footer: `#2b4f4f`.
- Foreground on media/dark: `#ffffff`.
- Foreground on light: `#0a0a0a`.
- Soft dividers: `rgba(255,255,255,0.22)` on dark and `rgba(0,0,0,0.18)` on light.
- Hero media receives a subtle black veil so white text remains legible.

## Grid and spacing

- Desktop content rail: 92px to 100px on a 1440px viewport, with a maximum content width of 1240px.
- Tablet rail: 32px.
- Mobile rail: 20px.
- Desktop header: 112px high with 92px horizontal padding.
- Mobile/tablet header: 72px high with 20px/32px horizontal padding.
- Hero blocks: `100svh`, minimum 720px desktop and 640px mobile.
- Desktop editorial text sections: roughly 536–568px high with 100px vertical padding.
- Lookbook gap: 8px; desktop outer rail 100px and mobile outer rail 20px.
- Carousel card ratio: source media is 500×662. Desktop novelty cards are about 193px wide in the captured 1440px viewport; service cards are about 282px wide.

## Motion

- Header show/hide and drawer transitions: 300ms ease.
- Media hover zoom: 700ms cubic-bezier(0.2, 0.65, 0.3, 1).
- Buttons and underlines: 200ms ease.
- Respect `prefers-reduced-motion`; remove transform animations and allow videos to remain poster-like.

