# Audemars Piguet homepage clone

- Source: https://www.audemarspiguet.com/us/en/home
- Application root: repository root (`.`)
- Site key: `www-audemarspiguet-com-14def314`
- Page key: `us--en--home-a310b589`
- Routes: `/` and `/us/en/home`
- Research: `docs/research/www-audemarspiguet-com-14def314/us--en--home-a310b589/`
- Original references: `docs/design-references/www-audemarspiguet-com-14def314/us--en--home-a310b589/`
- Components: `src/components/audemars-piguet/`
- Assets: `public/sites/www-audemarspiguet-com-14def314/us--en--home-a310b589/`

## Delivered scope

The implementation reproduces all homepage sections, local typography, original imagery and video, image mosaics, carousels, navigation states, newsletter, footer content and responsive layouts. Internal destination pages remain links to the original website and are outside this clone target.

Research was completed against the live page in connected Chrome. Computed styles, section geometry, menu states and responsive behavior were measured at desktop, tablet and mobile sizes before final visual QA.

## Validation

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `/` and `/us/en/home`: statically prerendered.
- Production browser console: zero errors and zero warnings.
- Interaction checks: navigation drawer, submenu, Escape close, carousel controls, video pause/play, locale dialog and footer disclosures.

See `QA_REPORT.md` for viewport measurements and practical validation notes.
