# SEO Implementation Report — lenhiluxury.com

**Date:** 2026-09-22 · **Framework:** AgriciDaniel/claude-seo v2.3.1 (manual install via `install.ps1`; `claude-seo doctor` → runtime ready, Chromium ready) · **Companion docs:** `SEO_AUDIT.md` (findings), `SEO_ROADMAP.md` (sequencing).

## 1. Original problems found

Full detail in `SEO_AUDIT.md`. No CRITICAL (index-blocking) issue existed. The homepage's indexability was never touched.

| Sev. | Problem | Evidence |
|---|---|---|
| High | LCP element hidden behind the splash curtain + scroll-reveal on every template → mobile lab LCP 5.4–6.1 s | Lighthouse: LCP element = hero paragraph / product description / category cover, element render delay 1.0–2.2 s; Playwright showed production LCP is a hydration-vs-first-paint race |
| High | SEO work sitting uncommitted in the working tree (Offer availability, security headers, `preload`/`fetchPriority`, llms.txt, IndexNow, contactPoint/geo) | live `/llms.txt` 404, validator "missing availability", no `X-Frame-Options` etc. |
| High | Product titles lacked "đồng hồ"; category titles reversed the natural query order and mismatched the H1 | live `<title>` values |
| High | Reseller name spelled three ways (header "LE NHI LUXURY", footer "Lê Nhi Luxury", schema/titles "LENHI Luxury"); Maps and Facebook use "Lê Nhi Luxury" | screenshots, JSON-LD, web search |
| High | Facebook `sameAs` is a share short-link (HTTP 400 to crawlers) | curl |
| High | No off-site footprint for the brand at all | web search |
| Medium | Offer lacks return/shipping policies; `/bo-suu-tap` H1 = "Đồng hồ"; family H1 without brand; family pages not linked from category level; phone not E.164; wrong `og:image` dimensions; splash on every load; 9 MB homepage media; no analytics; NAP name mismatch with GBP; 7 font preloads; JPEG poster | see audit |

## 2. claude-seo checks used

`render_page.py` (Playwright, mobile), `fetch_page.py --googlebot` + `parse_html.py` (19 pages), `preload_check.py`, `agent_ux_check.py` (3 templates → 100/100), `sitemap_discovery.py` + full 293-URL status crawl, `schema_ecommerce_validate.py` (Product JSON-LD), `content_quality.py` (6 pages), `metadata_template.py` (all pages), `gbp_deprecation_lint.py`, `domain_history.py`, `capture_screenshot.py` / `analyze_visual.py`, `google_auth.py --check` (no credentials → GSC/CrUX not available), `backlinks_auth.py --check` (Tier 0), plus Lighthouse 13.5 (local Chrome) because the PSI public quota was exhausted and no API key is configured. The skill instructions of `seo`, `seo-audit`, `seo-technical`, `seo-schema`, `seo-local`, `seo-ecommerce`, `seo-images`, `seo-geo`, `seo-sitemap` were followed inline (the claude-seo sub-agents were installed after this session started and could not be spawned). Artefacts: `C:\Users\ADMIN\lenhiluxury.com-audit\`.

## 3. Files modified

**Already in the working tree before this pass (reviewed, verified, committed together):** `next.config.ts` (security headers), `package.json` (`indexnow` script), `src/config/site.ts` (`commerce`, store `geo`), `src/lib/seo.ts` (availability, policies scaffold, contactPoint, geo, priceRange, description fitting), `src/components/home/HeroStack.tsx` (real `<link rel=preload>`), `CoverPicture.tsx` / `ProductCard.tsx` / `ProductGallery.tsx` (`preload` + `fetchPriority` — the Next 16 replacement for the deprecated `priority`), `ProductDetailPage.tsx` (availability label), `SiteFooter.tsx` (column labels no longer `<h2>`), `SplitWords.tsx` (space outside the span), `src/app/cua-hang/[slug]/page.tsx` (title with city), `src/app/llms.txt/route.ts`, `public/9373a51171e036aca8894f03338b0c3c.txt`, `scripts/indexnow-submit.mjs`, `docs/ARCHITECTURE.md`.

**Changed in this pass:**

| File | Change |
|---|---|
| `src/components/motion/scroll-controller.ts` | new `SPLASH_LEAVE_EVENT` |
| `src/components/brand/SplashScreen.tsx` | dispatches `SPLASH_LEAVE_EVENT` when the curtain starts lifting |
| `src/components/motion/RevealObserver.tsx` | with the splash up, reveal targets stay painted until `splash-leave`; hidden then; animate on `splash-done` as before; guard for late hydration |
| `src/app/globals.css` | `html[data-splash="active"] [data-reveal] … { transition: none }` so the hide under the curtain is instant |
| `src/lib/seo.ts` | product title "Đồng hồ … chính hãng"; product description opens with the reference + facts (no title echo); category titles "Đồng hồ nam/nữ Alexander Ferros chính hãng"; family description fitted to 160 chars; E.164 telephone (`internationalPhone`); `alternateName` derives "Le Nhi Luxury" via `asciiName`; removed wrong product/family `og:image` dimensions |
| `src/config/site.ts` | `reseller.name` → "LENHI Luxury" (header wordmark, aria-labels); `displayName` documented as certificate-only |
| `src/components/layout/SiteFooter.tsx` | certificate `alt` quotes the certificate holder (`displayName`) |
| `src/components/collections/CollectionsLanding.tsx` | H1 "Đồng hồ Alexander Ferros"; factual intro (208 phiên bản, Miyota/Seiko/Ronda, sapphire) |
| `src/app/bo-suu-tap/[family]/page.tsx` | H1 second line "Alexander Ferros · n phiên bản" |
| `src/components/collections/FamilyIndex.tsx` (new) | text index of every family in a category ("Alexander Ferros 2241S · 4 phiên bản") |
| `src/components/collections/ListingPage.tsx` | `after` slot below the grid |
| `src/app/bo-suu-tap/nam/page.tsx`, `nu/page.tsx` | render `FamilyIndex`; ItemList names aligned with titles |
| `src/app/cua-hang/[slug]/page.tsx` | shorter description |
| `docs/ARCHITECTURE.md` | motion/LCP behaviour, brand naming rule, FamilyIndex, report files |
| `SEO_AUDIT.md`, `SEO_ROADMAP.md`, `SEO_IMPLEMENTATION_REPORT.md` (new) | this audit |

No URL, route, redirect, robots or sitemap logic changed. No new routes were created.

## 4. Exact fixes implemented and verified

| Fix | Verification (local production build, `next start`) |
|---|---|
| LCP no longer waits for the curtain | PerformanceObserver probe (Playwright, CPU ×4): LCP = FCP on `/` (648 ms), product (776 ms), `/bo-suu-tap/nam` (880 ms, cover `<img fetchpriority=high>`); no later LCP entry after `splash-leave`/`splash-done`. Production (unchanged code) showed the race: 700 ms in one run, 2 469 ms in the Lighthouse run. Timed screenshots (`screenshots/splash-compare.png`) show the identical sequence: curtain → wordmark stagger → curtain lifts over a hidden hero → words slide in. |
| Titles / descriptions | e.g. `Đồng hồ Alexander Ferros 2241S-06 chính hãng | LENHI Luxury` (59 ch), description 159 ch starting "Alexander Ferros 2241S-06: đồng hồ nam 40mm, máy Cơ (Miyota 8215)…"; `Đồng hồ nam Alexander Ferros chính hãng | LENHI Luxury`; 18 audited pages: 0 duplicate titles / descriptions / H1s |
| Entity naming | header wordmark & aria-labels render "LENHI Luxury"; `Organization.alternateName` = ["Lê Nhi Luxury","Le Nhi Luxury","lenhiluxury","lenhiluxury.com"] |
| JSON-LD | telephone `+84382669211` on Organization, ContactPoint and Store; Offer has `availability: InStoreOnly`; `schema_ecommerce_validate.py` → availability finding gone (remaining: return policy, shipping, member program — need owner data / not applicable) |
| Internal linking | `/bo-suu-tap/nam` now links 53 family pages, `/bo-suu-tap/nu` 18; every family is ≤ 3 clicks from home |
| Crawl integrity | all 293 sitemap URLs → 200; all 293 distinct internal links across 18 templates → 200; canonicals self-referencing; `index, follow` on every real page; unknown slugs → 404 + noindex; `robots.txt`, `sitemap.xml`, `llms.txt`, IndexNow key → 200; security headers present |
| Build | `npm run lint`, `npm run typecheck`, `npm run build` all pass (300 static pages) |

## 5. Issues intentionally not changed

- **Return / shipping policy markup** — real policy text needed (`siteConfig.commerce`). Not invented.
- **Facebook canonical URL** — owner must supply the page URL; the share link stays until then.
- **Splash once per session** (M8), **mobile video encodes / preload=none** (M9), **`latin-ext` font subset** (M12), **WebP poster** (M13) — performance options that touch the brand experience or media pipeline; documented for the owner's decision.
- **Analytics** (M10) — adding a third-party script is a product decision (Vercel Analytics recommended).
- **About page, knowledge articles, ProductGroup variant schema** — need real content / data; planned in the roadmap.
- **`aggregateRating` / reviews** — no real review data exists; never added.
- **FAQPage schema** — kept (harmless); Google retired FAQ rich results in May 2026.
- **Home title / description** — left unchanged to avoid churning the already-indexed page.
- **"đại lý phân phối chính hãng" wording** — existing claim backed by the certificate in the project; not extended. Consider aligning to the certificate's own wording ("đại lý bán hàng chính thức / Authorized Reseller") for consistency.
- **404 page title** falls back to the site default (`not-found.tsx` cannot export metadata) — harmless, noindexed by status.

## 6. Manual actions for you

1. **Deploy** — push `main` (this commit) to trigger the Vercel production build; then confirm: `https://lenhiluxury.com/llms.txt`, `/9373a51171e036aca8894f03338b0c3c.txt`, `curl -I https://lenhiluxury.com/` shows `X-Frame-Options`, and a product page's `<title>` starts with "Đồng hồ".
2. `siteConfig.social[2].href` → canonical Facebook page URL.
3. Write the return window and delivery terms → `siteConfig.commerce.returnPolicy` / `shipping`, and publish them on `/dich-vu/bao-hanh`.
4. Decide the one brand spelling for **all** external profiles (recommended: "LENHI Luxury"); update GBP, Facebook, Instagram, TikTok, Zalo OA bios; add `https://lenhiluxury.com` to each.
5. `npm run indexnow` after deploy (Bing/Yandex); verify the site in Bing Webmaster Tools.
6. Optional: `~/.config/claude-seo/google-api.json` with a Google API key, then `"$HOME/.claude/skills/seo/scripts/claude-seo" run pagespeed_check.py https://lenhiluxury.com --json` for **field** CWV; `/seo google setup` for Search Console access.
7. Re-run Lighthouse on production 1–2 days after deploy (CDN caches): expect LCP ≈ FCP (target ≤ 2.5 s mobile).

## 7. Google Search Console actions

- Confirm the property covers `https://lenhiluxury.com` (Domain property preferred). Keep `GOOGLE_SITE_VERIFICATION` set in Vercel env (already wired in `layout.tsx`).
- Sitemaps → re-submit `https://lenhiluxury.com/sitemap.xml`; check "Discovered / Indexed" counts weekly (293 URLs expected).
- URL Inspection → "Request indexing" for `/`, `/bo-suu-tap/nam`, `/bo-suu-tap/nu`, `/san-pham`, `/bo-suu-tap`, `/cua-hang/van-tien-dung` after deploy (titles changed).
- Pages report → watch for "Duplicate without user-selected canonical" or "Crawled – currently not indexed" on product pages (variant near-duplicates); if it appears, prioritise the variant-data work (M5).
- Core Web Vitals report → LCP mobile should move from Poor to Good within ~28 days of deploy.
- Performance → filter queries containing "lenhi" / "lê nhi" (branded) vs the rest; export monthly.
- Enhancements → Products / Breadcrumbs / Merchant listings: expect 0 errors; warnings for missing shipping/return until M1 is done.

## 8. Google Business Profile actions

- Business name exactly as the site ("LENHI Luxury"), category "Watch store" (+ "Jeweler"/"Watch repair service" if true), website `https://lenhiluxury.com`, phone `0382 669 211`, address `1247 Văn Tiến Dũng, Bình Hưng, TP Hồ Chí Minh`, hours 09:00–21:00 daily — identical to `src/config/site.ts`.
- Add real showroom photos (exterior, interior, product shots), the dealer certificate photo, and a short description mentioning Alexander Ferros authorised reseller status (as on the certificate).
- Products section: add the top families with the same prices as the site; Posts: new arrivals.
- Ask every buyer for a Google review; reply to each. Do **not** gate or incentivise reviews.
- Q&A: seed 3–5 genuine questions (bảo hành, đặt lịch, thanh toán) with owner answers.

## 9. Backlink / entity-building (white-hat only)

1. Alexander Ferros / JMC&CO Việt Nam dealer locator listing with a link to `https://lenhiluxury.com` — the single most credible link available.
2. Consistent NAP citations: Google Maps, Apple Maps, Facebook, Zalo OA, Foody/… not applicable; Vietnamese business directories (Trang Vàng, VietnamYellowPages) with the same name/address/phone/URL.
3. Social profiles: bio text "LENHI Luxury — đại lý đồng hồ Alexander Ferros chính hãng, lenhiluxury.com"; link the site; occasional posts linking family pages.
4. Local press / watch communities: a factual note about the showroom and certification; never paid links, never link exchanges.
5. Wikidata item for the business once external references exist (GBP, press) — supports the knowledge graph.
6. After each new mention, add the profile URL to `siteConfig.social` (→ `sameAs`).

## 10. Suggested content roadmap

See `SEO_ROADMAP.md` → "Content plan". Order: brand origin (`alexander-ferros-cua-nuoc-nao`) → buyer evaluation (`…co-tot-khong`) → movement explainers → sizing → sapphire / water resistance / care → authenticity guide. Plus the About page (Month 1). One piece at a time, written from first-hand handling of the watches, with real photos; each linked from and to the relevant family/category pages via `articles[].related`.

## 11. Metrics to monitor

| Metric | Source | Baseline (2026-09-22) | Target |
|---|---|---|---|
| Branded impressions / clicks (queries containing lenhi, lê nhi, lenhiluxury) | GSC Performance | unknown (no API access; export from GSC) | steady growth; site in position 1 for all branded queries |
| Non-branded impressions (alexander ferros, đồng hồ alexander ferros…) | GSC | unknown | position ≤ 10 for "đồng hồ Alexander Ferros nam/nữ" within 3 months |
| Indexed pages | GSC Pages | homepage indexed; 293 in sitemap | ≥ 280 indexed |
| CTR | GSC | — | ≥ 3 % non-branded, ≥ 30 % branded |
| Average position by query | GSC | — | tracked monthly for the 15 target queries in the brief |
| Organic product-page traffic | GSC (page filter `/san-pham/`) or analytics | — | month-over-month growth |
| Core Web Vitals (mobile p75) | GSC CWV report / CrUX | lab LCP 5.4–6.1 s (poor), CLS 0, TBT 170–280 ms | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Schema errors | GSC Enhancements | 0 errors | 0 |
| Knowledge-panel / site-name display | manual search "lenhi luxury" | none | site name shows as "LENHI Luxury" |
| Off-site mentions | web search, GSC Links | 0 | dealer listing + GBP + 3 directories |
