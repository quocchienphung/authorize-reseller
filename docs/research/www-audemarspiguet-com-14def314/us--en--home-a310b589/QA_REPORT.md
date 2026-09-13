# Homepage QA report

Date: 2026-09-13

## Viewport geometry

| Viewport | Clone height | Source reference | Result |
| --- | ---: | ---: | --- |
| 1440×1000 | 10,553 px | 10,553 px | Matched |
| 768×1024 | 11,346 px | 11,345.9 px | Within 1 px |
| 390×844 | 10,646 px | 10,646 px | Matched |

Mobile section boundaries were verified at 2,532; 3,529; 3,938; 4,586; 4,990; 5,638; 6,967; 7,653; 8,534; 9,197; and 9,598 px. Tablet section boundaries were verified at 3,072; 4,141; 4,588; 5,237; 5,668; 6,317; 7,646; 8,463; 9,301; 10,118; and 10,531 px.

## Interaction checks

- Basic navigation drawer opens at 475 px on desktop.
- Selecting a navigation group expands the drawer to 1,014 px and exposes the correct submenu.
- Escape closes active overlays and body scrolling is restored.
- Footer locale control opens the shared country/language dialog.
- Novelties and Services support pointer, keyboard and horizontal scrolling.
- Desktop carousel next control moved the Novelties track by 701.6 px in the production check.
- Hero and lookbook videos play muted when they approach the viewport, pause after leaving it, loop and expose pause/play controls where shown by the source.
- Mobile footer groups use native disclosure controls.
- `prefers-reduced-motion` removes nonessential transforms and smooth scrolling.

## Production verification

`npm run check` passed ESLint, strict TypeScript and the Next.js 16.3.5 production build. Both routes are static. A connected Chrome production run reported no console errors or warnings.

The development-only hydration badge seen in the connected user profile was traced to extension-injected `bis_skin_checked`, `bis_register` and `__processed_*` attributes. Those attributes are absent from the application source and the production console remains clean.
