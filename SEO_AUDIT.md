# SEO Audit — lenhiluxury.com

**Date:** 2026-09-22 · **Auditor toolkit:** [AgriciDaniel/claude-seo v2.3.1](https://github.com/AgriciDaniel/claude-seo) (manual Windows install, `claude-seo doctor` → runtime ready, Chromium ready) plus Lighthouse 13.5 (local Chrome, simulated mobile throttling).
**Scope:** production site `https://lenhiluxury.com` (as deployed at audit time — commit `080a35b`) and the repository working tree (which already contains uncommitted SEO work; see H2).
**Business type detected:** e-commerce catalogue (208 products, 71 product families) + single-location brick-and-mortar store (showroom, HCMC) → audit ran the technical, on-page, schema, e-commerce, local, images, performance, GEO/AI-readiness and SXO checks.

> **Bottom line.** The site is technically healthy: every one of the 293 sitemap URLs returns 200, robots/sitemap/canonicals/redirects are correct, every page is server-rendered with unique metadata, and structured data is valid. **No CRITICAL (index-blocking) issue was found.** The two things that matter most are (1) Core Web Vitals — the splash curtain plus the scroll-reveal system hide the LCP element on every template, so lab LCP is 5.4–6.1 s on mobile — and (2) brand-entity signals: "LENHI Luxury" currently exists only on its own domain, with three different spellings of the name across the header, footer, schema, Google Maps and Facebook.

## SEO Health Score (claude-seo weighting)

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22 % | 90 | Crawlable, indexable, HTTPS, single canonical host, clean URLs, SSR |
| Content quality | 23 % | 72 | Real catalogue data, unique per-SKU facts; variant copy shared per family; no About page for the reseller; knowledge hub empty |
| On-page SEO | 20 % | 82 | Unique titles/descriptions everywhere; product titles miss the head term "đồng hồ"; two weak H1s |
| Schema / structured data | 10 % | 85 | Valid Organization+Store+WebSite, Product/Offer, BreadcrumbList, ItemList; Offer lacked availability (fixed in working tree) |
| Performance (CWV) | 10 % | 55 | LCP 5.4–6.1 s (mobile lab); CLS 0; TBT ≤ 280 ms |
| AI-search readiness | 10 % | 70 | SSR, AI crawlers allowed, llms.txt in working tree; almost no off-site entity presence |
| Images | 5 % | 85 | 100 % alt coverage, AVIF/WebP via next/image, lazy-loading correct; LCP images lacked fetchpriority (fixed in working tree) |
| **Overall** | | **78 / 100** | |

## claude-seo checks used (reproducible)

All commands run through the canonical launcher `"$HOME/.claude/skills/seo/scripts/claude-seo" run <script>`:

| Skill | Script / method | Target(s) |
|---|---|---|
| seo-audit / seo-technical | `render_page.py --mode always --viewport mobile` | `/` (Playwright Chromium; SPA check, console errors, JSON-LD) |
| seo-technical | `fetch_page.py --googlebot` + `parse_html.py --json` | 19 pages: home, collections, nam, nữ, catalogue, latest, pricing, 3 products, 2 families, stores, store, contact, appointment, services, warranty, FAQ |
| seo-technical | `preload_check.py` | `/`, `/san-pham/2241s-06-336` (Speculation Rules, bfcache, LCP hints) |
| seo-technical | `agent_ux_check.py` | `/`, product, `/bo-suu-tap/nam` (agent-friendly / a11y tree) |
| seo-sitemap | `sitemap_discovery.py` + full status crawl of all 293 sitemap URLs (curl, Googlebot UA) | sitemap.xml |
| seo-schema / seo-ecommerce | `schema_ecommerce_validate.py` | Product JSON-LD of 3 product pages |
| seo-content | `content_quality.py` (QRG filler / AI-pattern / density) | 6 pages |
| seo-content | `metadata_template.py --pairs-file` | all 19 pages (templated-metadata detector) |
| seo-local | `gbp_deprecation_lint.py`; NAP review of `src/config/site.ts` vs. schema vs. Maps listing | store page |
| seo-content | `domain_history.py` (expired-domain heritage) | lenhiluxury.com |
| seo-visual | `capture_screenshot.py --all`, `analyze_visual.py` | `/`, product, `/bo-suu-tap/nam` |
| seo-performance | Lighthouse 13.5 mobile (simulated) via local Chrome — PSI public quota was exhausted and no Google API key is configured | `/`, product, `/bo-suu-tap/nam` |
| seo-google | `google_auth.py --check` → **no credentials** (Tier −1) — GSC/CrUX/GA4 integration not possible; see manual actions | — |
| seo-backlinks | `backlinks_auth.py --check` → Tier 0 only; web search for brand mentions | — |
| seo-geo | robots.txt AI-crawler review, llms.txt, SSR check, brand-mention search | — |

Raw artefacts (HTML snapshots, parse output, Lighthouse JSON, screenshots): `C:\Users\ADMIN\lenhiluxury.com-audit\`.

## What already works (do not change)

- `http://` → `https://` (308), `www` → apex (308), trailing slash → no slash (308), legacy alexanderferros.com paths → new slugs (308). Single canonical origin `https://lenhiluxury.com`. `lenhiluxury.vercel.app` is not aliased (404), so no mirror is crawlable.
- `robots.txt`: `Allow: /`, blocks only `/_next/` and `/api/`, declares the sitemap; preview deployments are `Disallow: /` + `X-Robots-Tag: noindex` (`next.config.ts`, `src/app/robots.ts`).
- `sitemap.xml`: 293 URLs = 14 static + 71 families + 208 products, all HTTP 200, all canonical, no query URLs, no 404s, no redirects. Empty `/kien-thuc` correctly excluded (route 404s while empty).
- Every page: self-referencing canonical, `index, follow`, unique `<title>`/description (templated-metadata detector: 0 templated pages), single H1, `lang="vi"`, `og:*`/Twitter cards, `og:site_name = LENHI Luxury`, `og:locale = vi_VN`.
- All SEO-relevant content and JSON-LD is in the initial server-rendered HTML (`render_page.py`: `is_spa: false`, no console errors). Agent-UX score 100/100 on all three templates.
- JSON-LD: `Organization` (+ `alternateName`, `sameAs`, `brand`) + `Store` (address, hours, map) + `WebSite` in the root layout; `Product` + `Offer` (real price, VND, `NewCondition`, seller → Organization) + `BreadcrumbList` on products; `ItemList` on category/family pages; all blocks validate.
- Images: 0 missing alt on 45/18/160/209 images per template; next/image serves AVIF/WebP with `srcset`/`sizes`; `fill` + aspect-ratio containers → CLS 0.001/0/0; below-fold images lazy-loaded; first grid row preloaded.
- 404 route returns a real 404 status; homepage indexed, nothing here touches its indexability.

---

## CRITICAL

_None found._ Nothing blocks crawling or indexing, there is no accidental `noindex`, no canonical conflict, no blocked resources, no spam-policy pattern (no back-button hijacking, no hidden text, no doorway pages).

---

## HIGH

### H1 · LCP element is hidden behind the splash curtain + scroll-reveal on every template
- **Affected URLs:** all pages (home, categories, products, families, store, services…).
- **Source files:** `src/components/motion/RevealObserver.tsx`, `src/components/brand/SplashScreen.tsx`, `src/app/globals.css` (`html[data-motion="ready"] [data-reveal] { opacity: 0 … }`, `[data-reveal="media"] { mask-size: 100% 0% }`).
- **Evidence (Lighthouse 13.5, mobile, simulated):**
  - `/` — Performance 65, **LCP 6.1 s**, FCP 1.6 s, CLS 0.001, TBT 280 ms. LCP element = hero paragraph `p.mt-10` ("Trước khi đến tay khách hàng…"); LCP breakdown: TTFB 298 ms, **element render delay 2 170 ms**. (Chrome does not count the full-viewport `<video poster>` as an LCP candidate, so LCP falls to the largest text block, which sits inside `[data-reveal]`.)
  - `/san-pham/2241s-06-336` — Performance 71, **LCP 5.4 s**; LCP element = description paragraph, render delay 2 133 ms. The gallery image is inside `[data-reveal="media"]` (mask 0 %) so it is not painted until reveal.
  - `/bo-suu-tap/nam` — Performance 70, **LCP 5.4 s**; LCP element = cover `<img>`, resource load 1 049 ms + render delay 1 043 ms; `lcp-discovery-insight` failed (no fetchpriority on the cover).
  - Screenshot `screenshots/lenhiluxury_com_mobile.png` (taken mid-load on `/bo-suu-tap/nam`) shows the curtain lifting over a blank cover area.
  - Mechanism: `RevealObserver` sets `data-motion="ready"` in its mount effect (hides every reveal target) and only reveals after `SPLASH_DONE_EVENT` (2 100 ms hold + 1 100 ms leave). On throttled mobile the hydration effect runs before first paint, so the LCP candidate is never painted until ≈3.2 s + transition.
- **SEO impact:** Core Web Vitals is the only page-experience signal that feeds ranking directly; LCP "Poor" (> 4 s) on every URL for real users in Vietnam (CrUX) removes the CWV bonus site-wide and hurts mobile conversions.
- **Recommended fix (keeps the animation exactly as designed):** while the curtain is up, leave reveal targets **painted** (they are covered by the curtain anyway) so the browser records the LCP at first paint. Hide them **instantly, without a transition, when the curtain starts leaving** (new `SPLASH_LEAVE_EVENT`), and run the existing reveal animation on `SPLASH_DONE_EVENT` exactly as today. CSS: `html[data-splash="active"] [data-reveal], html[data-splash="active"] [data-reveal] [data-word] { transition: none }`. Pages without a splash (client-side navigations) are unchanged. Additionally: `fetchPriority="high"` on the cover/gallery/first-card images (already in the working tree).
- **Implementation risk:** Medium (touches the motion system) → implemented with before/after Lighthouse + screenshot verification. Also consider showing the splash once per session (see O6).

### H2 · Uncommitted SEO improvements in the working tree are not deployed
- **Affected URLs:** all product pages (Offer availability, fetchpriority), `/llms.txt` (404 in production), `/9373a51171e036aca8894f03338b0c3c.txt` (IndexNow key, 404), every response (security headers absent in production: only HSTS is sent).
- **Source files:** `src/lib/seo.ts`, `src/config/site.ts`, `next.config.ts`, `src/components/product/ProductGallery.tsx`, `ProductCard.tsx`, `CoverPicture.tsx`, `HeroStack.tsx`, `SplitWords.tsx`, `SiteFooter.tsx`, `src/app/llms.txt/route.ts`, `scripts/indexnow-submit.mjs`.
- **Evidence:** `schema_ecommerce_validate.py` on the live Product JSON-LD → "Offer is missing recommended `availability`" (Medium); `preload_check.py` on the live product page → `fetchpriority_high: 0`; `curl -I` shows no `X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy` / `Permissions-Policy`; `git status` lists 13 modified + 3 untracked files that address all of these.
- **SEO impact:** the fixes are correct (`preload` replaces the deprecated `priority` prop in Next 16 — verified in `node_modules/next/dist/docs`), but until deployed the audit findings persist.
- **Recommended fix:** lint / typecheck / build the working tree, then commit and deploy together with this audit's fixes.
- **Implementation risk:** Low.

### H3 · Product titles miss the head term "đồng hồ"; category titles reverse the natural query order
- **Affected URLs:** 208 product pages; `/bo-suu-tap/nam`, `/bo-suu-tap/nu`.
- **Source file:** `src/lib/seo.ts` (`productMetadata`, `categoryMetadata`).
- **Evidence:** live product `<title>` = "Alexander Ferros 2241S-06 chính hãng | LENHI Luxury" (no "đồng hồ", although the catalogue name is "Đồng Hồ Alexander Ferros 2241S-06"); category title = "Đồng hồ Alexander Ferros nam chính hãng" while the H1 reads "ĐỒNG HỒ NAM Alexander Ferros chính hãng" and the target queries are "đồng hồ nam Alexander Ferros" / "đồng hồ nữ Alexander Ferros".
- **SEO impact:** every Goal-2 query starts with "đồng hồ"; the title is the strongest on-page relevance signal and the SERP headline.
- **Recommended fix:** product title → "Đồng hồ Alexander Ferros 2241S-06 chính hãng | LENHI Luxury" (≤ 60 chars); category titles → "Đồng hồ nam Alexander Ferros chính hãng | LENHI Luxury" / "Đồng hồ nữ …"; open the product description with a fact the title does not carry (the templated-metadata detector flagged "description echoes title" on all three product pages).
- **Implementation risk:** Low (metadata only; URLs, canonicals and H1s unchanged).

### H4 · Three spellings of the reseller name across the UI, schema, Google Maps and Facebook
- **Affected URLs:** every page (header, footer), Google Maps listing, Facebook page.
- **Source files:** `src/config/site.ts` (`reseller.name = "Le Nhi Luxury"`, `displayName = "Lê Nhi Luxury"`, `brand = "LENHI Luxury"`), `src/components/brand/BrandRotator.tsx` (header strip shows `reseller.name`), `src/components/layout/SiteHeader.tsx` (aria-label), `src/components/layout/SiteFooter.tsx` (certificate caption "Lê Nhi Luxury"), `src/lib/seo.ts`.
- **Evidence:** desktop screenshot shows the header wordmark "LE NHI LUXURY"; `<title>` suffix, `og:site_name`, `application-name`, `WebSite.name`, `Organization.name` = "LENHI Luxury"; footer certificate caption "Lê Nhi Luxury"; Maps place = "Lê Nhi Luxury"; Facebook page title = "Lê Nhi Luxury | Ho Chi Minh City". Web search for "LENHI Luxury" / "lenhiluxury" returns **no** result mentioning the business at all.
- **SEO impact:** Google's site-name and entity reconciliation prefer one dominant surface form; the header wordmark is the most visible one and currently contradicts the declared site name. For Goal 1 ("LENHI Luxury = lenhiluxury.com") the visible brand must match the schema/site name.
- **Recommended fix:** make the header wordmark and aria-labels use "LENHI Luxury" (the domain / handle form); keep "Lê Nhi Luxury" only where the printed certificate is quoted and as `alternateName`; rename the Google Business Profile and Facebook page to "LENHI Luxury" (manual, owner decision).
- **Implementation risk:** Low (text only).

### H5 · `sameAs` Facebook URL is a share short-link that returns HTTP 400 to crawlers
- **Affected URLs:** all pages (Organization JSON-LD), footer social links.
- **Source file:** `src/config/site.ts` (`social[2].href = https://www.facebook.com/share/1C7PwahaGD/`).
- **Evidence:** `curl -I` → 400; the link resolves only in a logged-in browser (page title "Lê Nhi Luxury | Ho Chi Minh City").
- **SEO impact:** `sameAs` is one of the few explicit entity-linking signals; a URL Google cannot fetch is wasted.
- **Recommended fix:** replace with the canonical page URL (`https://www.facebook.com/<pagename>` or `/profile.php?id=…`) — **owner must supply**; Instagram (`/lenhiluxury`) and TikTok (`/@lenhiiiiiiiii`) resolve (200).
- **Implementation risk:** None (config value).

### H6 · The entity has no off-site footprint
- **Evidence:** web search for `"lenhiluxury" OR "LENHI Luxury" OR "Lê Nhi Luxury"` returns only alexanderferros.com and two other resellers (bdtwatch.com, chicwatchluxury.vn); no listing, citation or mention links to lenhiluxury.com. `backlinks_auth.py`: Tier 0 (no Moz/Bing keys) — Common Crawl domain graph not queried (domain is brand-new).
- **SEO impact:** Google cannot associate "LENHI Luxury" with `lenhiluxury.com` from a single self-referencing website; branded queries will keep showing competitors and the brand's own site.
- **Recommended fix (manual, see report §8–9):** GBP website field + posts, social bios with the URL, JMC&CO / Alexander Ferros dealer-locator listing, Vietnamese business directories, a consistent NAP everywhere.
- **Implementation risk:** None (off-site).

---

## MEDIUM

### M1 · Offer lacks `hasMerchantReturnPolicy` and `shippingDetails`
- **URLs:** 208 product pages. **File:** `src/lib/seo.ts` (`offerPolicies()`), `src/config/site.ts` (`commerce.returnPolicy`, `commerce.shipping` = `undefined`).
- **Evidence:** `schema_ecommerce_validate.py` → 2 × Medium (return policy, shipping details). The working tree already scaffolds both and emits them only when filled.
- **Impact:** required for Merchant Center free listings / shipping & return rich attributes; not required for organic Product snippets.
- **Fix:** owner supplies the real written return window and delivery terms → fill `siteConfig.commerce`; **do not invent**. Risk: none once real data exists.

### M2 · `/bo-suu-tap` H1 is the generic "Đồng hồ" and the intro never names the brand
- **File:** `src/components/collections/CollectionsLanding.tsx`. **Evidence:** `parse_html.py` h1 = "Đồng hồ"; intro paragraph is generic boilerplate.
- **Impact:** the collections hub is the second-most important navigation page (priority 0.9 in the sitemap) yet its only heading carries no entity. **Fix:** H1 → "Đồng hồ Alexander Ferros"; intro mentions Alexander Ferros / LENHI Luxury once, factually. Risk: Low (copy only).

### M3 · Family page H1 omits the brand ("DÒNG 2241S 4 phiên bản")
- **File:** `src/app/bo-suu-tap/[family]/page.tsx`. **Evidence:** live H1 "DÒNG 2241S 4 phiên bản"; title is fine. **Fix:** second heading line → "Alexander Ferros · 4 phiên bản". Risk: Low.

### M4 · Family pages are only linked from product pages (crawl depth 3, no hub link)
- **URLs:** 71 × `/bo-suu-tap/alexander-ferros-*`. **Files:** `src/components/collections/ListingPage.tsx`, `src/app/bo-suu-tap/nam/page.tsx`, `nu/page.tsx`.
- **Evidence:** link extraction of `/bo-suu-tap/nam` (171 internal links) contains no `/bo-suu-tap/alexander-ferros-*` URL; families are reachable only via breadcrumbs / "Xem toàn bộ dòng" on product pages.
- **Impact:** family pages are the natural landing for reference searches ("Alexander Ferros 2241S"); they currently get no link equity from the category level, and the Home → Collection → Category → Family → Product hierarchy is incomplete.
- **Fix:** a restrained "Dòng sản phẩm" link list on the men's/women's pages (text links, eyebrow register). Risk: Low (additive UI).

### M5 · Product copy is shared by every variant of a family
- **Evidence:** 208 products, 50 unique `description` strings (all variants of a family — and some families — share the same paragraph); each page adds one unique factual sentence (`productSummary`) + a specs table, so pages are not duplicates, but the variant-specific facts (dial colour, strap colour) exist only in the SKU suffix.
- **Impact:** limits ranking for colour/strap long-tail queries; weak differentiation for Google's near-duplicate clustering.
- **Fix (roadmap):** extend `scripts/scrape-alexander-ferros.py` to capture dial/strap colour per variant (only real data), surface it in `productSummary` and `alt` text; model families as `ProductGroup` with `hasVariant` / `isVariantOf` (Google's product-variant structured data). Risk: Medium (data pipeline).

### M6 · Telephone in JSON-LD is national format (`0382669211`)
- **File:** `src/lib/seo.ts` (`organizationJsonLd`). **Fix:** emit E.164 `+84382669211` in `Organization.telephone`, `contactPoint.telephone`, `Store.telephone` (display label unchanged). Risk: None.

### M7 · Product `og:image:width/height` declared 1200 × 1200 but files are mostly 1000 × 1000
- **File:** `src/lib/seo.ts` (`productMetadata` image). **Evidence:** PNG header scan: 177 × 1000², 15 × 2000², 4 × 3375², 5 × 800², 2 × 500², 2 × 813², 2 portrait. **Fix:** omit the incorrect dimensions (crawlers read the file). Risk: None.

### M8 · The splash curtain plays on every full page load, including every organic landing
- **File:** `src/components/brand/SplashScreen.tsx`. **Evidence:** no session flag; each hard navigation costs 3.2 s before content (audemarspiguet.com shows its intro once per session).
- **Impact:** with H1 fixed, LCP is no longer affected, but INP/engagement and bounce on deep landings (product pages from Google) still pay the curtain. **Fix (design decision, not applied):** show once per session via `sessionStorage`. Risk: Low, but it changes the brand experience — owner's call.

### M9 · Homepage mobile payload ≈ 9.1 MB, 8.1 MB of it video
- **Files:** `src/components/home/HeroStack.tsx`, `src/components/media/AutoplayVideo.tsx`, `VideoWall.tsx`; `public/alexander-ferros/videos/*.mp4` (hero 2.0 MB; atelier 4.3–9.3 MB each, 26 MB total; `atelier.mp4` 17 MB appears unused).
- **Evidence:** Lighthouse resource summary: Media 8 requests / 8 127 KB; the four atelier films start downloading as soon as they intersect.
- **Impact:** data cost on Vietnamese mobile networks; not an LCP factor after H1, but affects TBT/INP and engagement.
- **Fix (roadmap, no design change):** smaller mobile encodes (≤ 1 MB, 720p, 24 fps) selected with `<source media>`, `preload="none"` for the atelier wall until it is within one viewport, remove unused `atelier.mp4` from `public/`. Risk: Low–Medium (media pipeline).

### M10 · No analytics / measurement
- **Evidence:** no GA4, GTM, Vercel Analytics or Speed Insights in `src/app/layout.tsx`; no third-party scripts at all (good for CWV).
- **Impact:** organic conversions (calls, Zalo, appointments) and real-user CWV cannot be measured. **Fix:** add Vercel Speed Insights + Web Analytics (cookie-less) or GA4 with consent; wire `tel:`/Zalo/appointment clicks as events. Not applied (third-party script decision). Risk: Low.

### M11 · NAP consistency between website and Google Business Profile
- **Evidence:** site/schema name "LENHI Luxury"; Maps listing "Lê Nhi Luxury"; address "1247 Văn Tiến Dũng, Bình Hưng, Hồ Chí Minh" (no postal code, no district-level administrative name); hours 09:00–21:00 daily match `openingHoursSpecification`; phone matches.
- **Fix (manual):** align the GBP name with the website (H4), add the website URL in GBP, use the same address string; add `postalCode` to `PostalAddress` once known. Risk: None.

### M12 · Seven preloaded font files (217 KB) — `latin-ext` subset is not needed for Vietnamese
- **File:** `src/app/layout.tsx` (`subsets: ["latin", "latin-ext", "vietnamese"]` on both Google fonts).
- **Evidence:** 7 × `<link rel="preload" as="font">`; Vietnamese glyphs (incl. Đ/đ, ₫) live in the `vietnamese` subset. **Fix (optional):** drop `latin-ext` → 2 fewer preloads (~50 KB) competing with the LCP image. Not applied (typography decision). Risk: Low.

### M13 · Hero poster is a 258 KB JPEG (2560 × 1440)
- **File:** `public/alexander-ferros/videos/official-film-intro-poster.jpg`. **Evidence:** Lighthouse `image-delivery-insight`: est. savings 91 KB (WebP/AVIF). **Fix (optional):** re-encode as WebP q≈82 at 1920 × 1080 and update `hero.poster`. Risk: Low (visual check needed).

### M14 · `http://www.` → `https://www.` → `https://` is a 2-hop chain
- **Evidence:** curl: 308 → 308. Vercel performs the HTTPS upgrade before the host redirect; only `http://www` links are affected. **Fix:** none needed in code; ensure all citations use `https://lenhiluxury.com`. Risk: None.

---

## LOW

- **L1 · Word-split headings** — `parse_html.py` read "NGHỆTHUẬTchếtáchiếmcó" because the inter-word space sits inside the wrapper `<span>`; the live DOM does contain the space, so Googlebot reads it correctly. The working-tree `SplitWords.tsx` moves the space outside the span (more robust for any extractor). File: `src/components/typography/SplitWords.tsx`.
- **L2 · Sitemap `priority`/`changefreq`** are ignored by Google (harmless); `lastmod` is intentionally omitted for catalogue pages (no real date) — keep.
- **L3 · Favicon is SVG-only** (`src/app/icon.svg`, served with cache-busting query). Valid for Google; add `apple-icon.png` (180 px) and a 512 px PNG for Android / Knowledge Panel logo if desired.
- **L4 · `Organization.logo` points to the favicon SVG**; Google accepts SVG, but a ≥ 112 px PNG/WebP logo with the wordmark is better for the Knowledge Panel. File: `src/lib/seo.ts`.
- **L5 · 4 product hero renders are < 800 px** (2 × 500², 2 × 757/745 px wide) — below the Merchant Center recommendation, irrelevant for Search.
- **L6 · 21 products have no gallery photos** (render only) — thinner pages; data-side limitation.
- **L7 · `/san-pham` HTML is 776 KB, `/bo-suu-tap/nam` 658 KB** — all 208/158 products are server-rendered and the RSC payload repeats the data. Well under Googlebot's 2 MB HTML cap and Brotli-compressed on the wire; consider trimming `specifications` from the client props of `ProductGrid` (`src/components/collections/ListingPage.tsx`, `ProductGrid.tsx`) if it grows.
- **L8 · "description echoes title"** on product / pricing / collections descriptions (metadata_template.py, Medium per tool) — addressed for products in H3; pricing/collections left (already unique and informative).
- **L9 · Main menu is a client-only drawer** (links absent from initial HTML until opened) — every menu target is also in the footer, so crawl paths are intact. Keep.
- **L10 · Product OG images are transparent PNG renders** — some platforms render them on dark backgrounds; a flattened share image per product would look better (cosmetic).
- **L11 · Domain registered 2026-09-22 per WHOIS fallback** (`domain_history.py`; whois data partial) — no expired-domain heritage risk.
- **L12 · Google-Extended / GPTBot etc. are allowed** — consistent with the visibility goal; no change.

---

## OPPORTUNITY

- **O1 · "Về LENHI Luxury" (About) page** — the strongest on-site entity signal is missing: who the reseller is, the dealer certificate (JMC&CO Việt Nam, valid to 31.12.2027 — already verified in the footer), the showroom, founding year, team, what "chính hãng" means here. Needs owner facts; would become the `Organization.mainEntityOfPage` / `AboutPage`.
- **O2 · Knowledge hub (`/kien-thuc`)** — framework exists (`src/lib/articles.ts`), zero articles. Content plan in `SEO_ROADMAP.md` (buyer-useful: brand origin, "có tốt không", Miyota 8215 vs 9015, sapphire, sizing, water resistance, care). One article at a time, real expertise, no filler.
- **O3 · ProductGroup / variant schema** for the 71 families (M5).
- **O4 · Reviews** — collect genuine Google reviews on GBP first; only add `Review`/`aggregateRating` markup when a real on-page review system exists (never before).
- **O5 · Bing Webmaster Tools + IndexNow** — `scripts/indexnow-submit.mjs` and key file are ready in the working tree; verify the site in Bing WMT and submit the sitemap.
- **O6 · Once-per-session splash** (M8).
- **O7 · Merchant Center free listings** — becomes possible after M1 (return + shipping policies) and a `price` per variant (already present).
- **O8 · Speculation Rules** — `preload_check.py` recommends `<script type="speculationrules">` prefetch for top paths; Next.js `<Link>` prefetch already covers most in-app navigation, so low value.
- **O9 · Video** — the atelier films are brand content; a `VideoObject` is only worthwhile if a page is *about* the film (not now).

---

## Verification of facts used in copy (content-quality gate)

| Claim on site | Source checked | Status |
|---|---|---|
| "vỏ thép 316L" (category copy) | alexanderferros.com/en/products/mens-watches — "316L stainless steel case combined with scratch-resistant sapphire glass" | verified |
| "kính sapphire" | 208/208 products: `Chất liệu mặt kính = Kính Sapphire` | verified |
| "máy automatic và quartz Miyota" | movements: Miyota 8215/8205/82S0/82S5/9015/9120/8N40/2115, Seiko NH38/NH39, Ronda 585/762, VJ/GL/VX quartz | verified (also Seiko / Ronda) |
| "Swiss Brand Timepieces" (hero) | brand positioning on alexanderferros.com; `Xuất xứ: Trung Quốc` on all 208 products (shown honestly in specs) | brand's own wording; keep the specs visible |
| "đại lý phân phối chính hãng" / certificate | `public/alexander-ferros/editorial/reseller-certificate.webp`, `siteConfig.reseller.certificate` (JMC&CO Việt Nam, to 31.12.2027) | existing verified claim in project; no new claims added |
| `Store` address / hours / phone | `src/config/site.ts`, Maps place page | consistent |
