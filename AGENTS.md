# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Alexander Ferros — Authorised Reseller Website

## What This Is
Storefront for the Alexander Ferros watch brand (Vietnamese copy). Layout and motion language follow audemarspiguet.com; products, cover imagery and the parallax banners come from alexanderferros.com. Full structure and conventions: `docs/ARCHITECTURE.md`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 with semantic theme tokens (`surface`, `fg`, `line`, `tile`) that flip between dark and light
- **Motion:** Lenis smooth scroll, IntersectionObserver reveals, word-stagger headings, CSS parallax
- **Fonts:** Montserrat + Cormorant Garamond (Google, Vietnamese subset); Neue Helvetica Ultra Light for the wordmark only
- **Icons:** Lucide React + inline brand emblem (`src/components/brand/BrandMark.tsx`)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build
- `python scripts/scrape-alexander-ferros.py` — Refresh `src/data/products.json` and product images

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes; CSS Modules only for animation-heavy pieces (splash screen)
- Route files (`src/app/**/page.tsx`) stay thin: metadata + one page component
- Use `routes.*` and `siteConfig` from `src/config/site.ts` instead of hard-coded URLs or contact details
- Client components import types/helpers from `src/lib/product-helpers.ts`, never the JSON-backed `src/lib/products.ts`
- 2-space indentation, mobile-first responsive

## Design Principles
- Keep the AP register: ultra-light uppercase display line + italic serif second line, generous rail spacing, restrained monochrome buttons (no gold/bronze fills)
- Text over photos/video is always white (`text-paper`); everything else uses theme tokens so dark and light modes both work
- Real content only: actual product names, SKUs, prices and official imagery
- Respect `prefers-reduced-motion`

## Project Structure
```
src/
  app/              # Routes (Vietnamese slugs), globals.css tokens, icon.svg favicon
  components/
    brand/          # BrandMark, BrandLogo, SplashScreen
    layout/         # PageShell, SiteHeader, ThemeToggle, SiteFooter, Breadcrumbs, PageIntro
    motion/         # SmoothScroll, RevealObserver, ParallaxMedia, scroll-controller
    media/          # AutoplayVideo
    typography/     # SectionHeading, SplitWords, Eyebrow
    ui/             # PillLink, LineLink
    home/ collections/ product/ pages/   # Page compositions
  config/site.ts    # Brand, contact, stores, routes, navigation
  lib/              # products.ts (data), product-helpers.ts (pure helpers)
  data/products.json
public/alexander-ferros/   # covers, editorial, products, videos
docs/
  ARCHITECTURE.md
  research/         # Audemars Piguet design tokens / component specs used as layout reference
  design-references/# Screenshots of the AP reference
scripts/scrape-alexander-ferros.py
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- Do not reintroduce scraped Audemars Piguet assets or components; only its layout language is used.
- Do not add a news/blog section from alexanderferros.com.
