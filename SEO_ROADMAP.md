# SEO Roadmap — lenhiluxury.com

Companion to `SEO_AUDIT.md` (issue IDs refer to it). Items marked **[code]** are repository changes; **[owner]** need business facts or account access; **[done]** were implemented in this pass (see `SEO_IMPLEMENTATION_REPORT.md`).

## Week 1 — ship the technical baseline

| # | Item | Ref | Status |
|---|---|---|---|
| 1 | Deploy the working-tree SEO work: Offer `availability`, security headers, `preload`/`fetchPriority` on LCP images, `llms.txt`, IndexNow key + script, contactPoint/geo, SplitWords fix | H2 | **[done]** committed with this pass |
| 2 | LCP fix: keep reveal targets painted under the splash curtain, hide instantly at curtain-leave, animate on splash-done (no visual change) | H1 | **[done]** |
| 3 | Product titles "Đồng hồ Alexander Ferros <ref> chính hãng"; category titles "Đồng hồ nam/nữ Alexander Ferros chính hãng"; product descriptions no longer echo the title | H3 | **[done]** |
| 4 | Header wordmark + aria-labels → "LENHI Luxury"; "Lê Nhi Luxury" kept only for the certificate caption and as `alternateName` | H4 | **[done]** |
| 5 | `/bo-suu-tap` H1 → "Đồng hồ Alexander Ferros"; family H1 second line → "Alexander Ferros · n phiên bản" | M2, M3 | **[done]** |
| 6 | "Dòng sản phẩm" link list on men's / women's pages (families reachable from the category level) | M4 | **[done]** |
| 7 | E.164 phone in JSON-LD; drop wrong product `og:image` dimensions | M6, M7 | **[done]** |
| 8 | Replace the Facebook share link with the canonical page URL in `siteConfig.social` | H5 | **[owner]** |
| 9 | Google Search Console: confirm the property is `https://lenhiluxury.com` (URL-prefix or Domain), re-submit `sitemap.xml`, request indexing for `/bo-suu-tap/nam`, `/bo-suu-tap/nu`, `/san-pham`, `/cua-hang/van-tien-dung` | — | **[owner]** |
| 10 | Google Business Profile: name = "LENHI Luxury" (or decide once and mirror it on the site), website = `https://lenhiluxury.com`, same address string / hours / phone as the site | H4, M11 | **[owner]** |
| 11 | Bing Webmaster Tools: verify, import from GSC, run `npm run indexnow` after deploy | O5 | **[owner]** |

## Month 1 — entity and measurement

| # | Item | Ref |
|---|---|---|
| 1 | **About page "Về LENHI Luxury"** — real facts only: who runs the showroom, since when, the JMC&CO Việt Nam dealer certificate (valid to 31.12.2027), what buyers get (kiểm định, thẻ bảo hành), photos of the showroom. Link from footer + header menu; add `AboutPage` + `Organization.description`. | O1 |
| 2 | Social bios (Instagram, TikTok, Facebook, Zalo OA) all state "LENHI Luxury — lenhiluxury.com"; one consistent profile photo (the emblem); post the site link once. | H6 |
| 3 | Ask JMC&CO Việt Nam / alexanderferros.com to list LENHI Luxury in their dealer / store locator with a link (the single most credible link the site can get). | H6 |
| 4 | Return + delivery policy written down → fill `siteConfig.commerce.returnPolicy` / `shipping` (schema emits automatically); publish the same text on `/dich-vu/bao-hanh`. | M1 |
| 5 | Measurement: Vercel Speed Insights + Web Analytics (or GA4 with consent); events for `tel:`, Zalo, appointment form. Baseline GSC: branded vs non-branded impressions. | M10 |
| 6 | Google API key in `~/.config/claude-seo/google-api.json` (Tier 0) → re-run `pagespeed_check.py` for **field** CWV; `/seo google setup` for GSC (Tier 1) if you want claude-seo to read Search Console. | — |
| 7 | Decide on once-per-session splash (`sessionStorage`) — keeps the brand moment for first-time visitors, removes the 3.2 s curtain on repeat loads. | M8 |
| 8 | First knowledge article (see plan below), written by someone who handles the watches. | O2 |

## Months 2–3 — content depth and product data

| # | Item | Ref |
|---|---|---|
| 1 | Knowledge articles 2–4 (one every 2–3 weeks; each links to the relevant families / categories and is linked from them). | O2 |
| 2 | Scraper: capture variant colour / dial / strap facts per SKU (real data from alexanderferros.com) → unique summary + alt text per variant; `ProductGroup` + `hasVariant` / `isVariantOf` schema for the 71 families. | M5, O3 |
| 3 | Mobile video encodes (≤ 1 MB each) + `preload="none"` for the atelier wall until it is one viewport away; delete unused `public/alexander-ferros/videos/atelier.mp4` (17 MB). | M9 |
| 4 | Optional font trim (`latin-ext` subset) and WebP hero poster — measure with Lighthouse before/after; keep if no visual regression. | M12, M13 |
| 5 | Collect Google reviews on GBP (ask buyers in-store; respond to every review). No review markup on the site until a real review system exists. | O4 |
| 6 | Merchant Center free listings once policies exist (M1). | O7 |

## Long-term

- Family pages become the reference landing pages: add a short, factual family intro (case size, movement, options) and a comparison table of the variants.
- Comparison content: "2241S vs 8392S", "Miyota 8215 vs 9015", "đồng hồ Alexander Ferros nam dưới 5 triệu" — only where the catalogue genuinely supports the comparison.
- Quarterly `claude-seo` re-audit (`/seo audit https://lenhiluxury.com`) + `/seo drift baseline` after each release to catch regressions (titles, canonicals, schema).
- Local: second showroom → add to `stores[]` (site, sitemap, schema update automatically); keep NAP identical on GBP, Facebook, Zalo, directories.
- Watch the CWV report in GSC monthly; target LCP ≤ 2.5 s at p75 on mobile after the Week-1 fix propagates (28-day CrUX window).

## Content plan (knowledge hub) — proposed, not written

Only publish what an actual watch seller can vouch for; each piece ≥ one concrete, checkable fact per section, photos from the showroom, no filler.

| Priority | Slug (proposed) | Intent | Supports |
|---|---|---|---|
| 1 | `alexander-ferros-cua-nuoc-nao` | "Alexander Ferros của nước nào / có phải thương hiệu Việt Nam" — brand origin, founder Alain Cao, Trường Omega institute, where movements come from, where cases are made (state `Xuất xứ: Trung Quốc` honestly, as the spec table already does) | Goal 2 informational queries, trust |
| 2 | `dong-ho-alexander-ferros-co-tot-khong` | Buyer evaluation: movements (Miyota 8215/9015/9120, Seiko NH38, Ronda), sapphire, 5 ATM, warranty, what the kiểm định certificate covers | Goal 2, conversion |
| 3 | `miyota-8215-la-gi` / `miyota-9015-vs-8215` | Movement explainer with the families that use each | product families |
| 4 | `cach-chon-size-dong-ho` | Case-size guide (36/38/40/42 mm) with the catalogue's sizes and wrist-photo guidance | categories |
| 5 | `kinh-sapphire-la-gi` | Sapphire vs mineral, care | all products |
| 6 | `muc-chong-nuoc-5-atm-nghia-la-gi` | Water-resistance ratings vs real use | products (5 ATM) |
| 7 | `bao-quan-dong-ho-co` | Care / servicing intervals, showroom service | warranty |
| 8 | `phan-biet-dong-ho-alexander-ferros-chinh-hang` | How to verify an authentic piece (certificate, thẻ bảo hành, dealer) — ties directly to the reseller entity | Goal 1 + 2 |

Do **not** create city pages, tag pages, or one page per keyword variant.
