# Kiến trúc mã nguồn

Website Alexander Ferros (đại lý ủy quyền) dựng trên Next.js 16 App Router, React 19, TypeScript strict và Tailwind CSS v4. Bố cục và ngôn ngữ chuyển động lấy cảm hứng từ audemarspiguet.com; nội dung, hình ảnh sản phẩm và các khối parallax lấy từ alexanderferros.com.

## Thư mục

```text
src/
  app/                     # Route files: chỉ metadata + compose component, không chứa UI
  assets/fonts/            # Neue Helvetica 25 Ultra Light (chỉ dùng cho wordmark)
  components/
    brand/                 # BrandMark (SVG), BrandLogo, BrandRotator (logo ↔ Le Nhi Luxury trong header), SplashScreen (màn intro)
    layout/                # PageShell, SiteHeader (+ drawer), ThemeToggle, SiteFooter, Breadcrumbs, PageIntro
    motion/                # SmoothScroll (Lenis), RevealObserver, ParallaxMedia, scroll-controller
    media/                 # AutoplayVideo, VideoWall (4 phim dọc 9:16: grid desktop / rail vuốt ngang mobile)
    typography/            # SectionHeading, SplitWords (reveal từng từ), Eyebrow
    ui/                    # PillLink, LineLink
    home/                  # HomePage, HeroStack, CollectionShowcase, BrandStory
    collections/           # CollectionsLanding (clone /en/products), ParallaxCover, ListingPage
    product/               # ProductCard, ProductCarousel, ProductMosaic, ProductGrid, ProductDetailPage, ProductGallery
    pages/                 # Services, Warranty, FAQ, Stores, Contact, Pricing
  config/site.ts           # Tên thương hiệu, liên hệ, mạng xã hội, showroom, routes, navigation
  lib/products.ts          # Dữ liệu + truy vấn catalogue (server)
  lib/product-helpers.ts   # Type và helper thuần dùng được ở client
  data/products.json       # 208 sản phẩm scrape từ alexanderferros.com (scripts/scrape-alexander-ferros.py)
public/alexander-ferros/
  covers/                  # Ảnh bìa parallax (our-collection, mens, womens) desktop + mobile
  editorial/               # Ảnh brand story
  products/                # Ảnh sản phẩm PNG nền trong suốt 1000×1000; <slug>/NN.webp là ảnh thực tế (gallery) của từng phiên bản
  videos/                  # official-film-intro (3s cận cảnh mặt số), atelier-1..4 (phim dọc xưởng chế tác), atelier (trang dịch vụ)
```

## Quy ước

- **Route mỏng**: `src/app/**/page.tsx` chỉ khai báo `metadata`, `generateStaticParams` và render một component trang.
- **Đường dẫn tập trung**: luôn dùng `routes.*` từ `src/config/site.ts`, không hard-code chuỗi URL.
- **Theme sáng/tối**: token ngữ nghĩa `surface` / `fg` / `line` / `tile` trong `globals.css` đổi theo `prefers-color-scheme`, hoặc theo `html[data-theme]` khi người dùng bấm nút mặt trời/mặt trăng (`ThemeToggle`, lưu ở `localStorage["af-theme"]`, bootstrap trước khi paint trong `layout.tsx`). Chỉ dùng `paper`/`ink` (trắng/đen cố định) cho chữ đè lên ảnh/video.
- **Style**: Tailwind utility classes. Token màu/typography khai báo trong `src/app/globals.css` (`@theme`), kèm các utility `rail`, `type-display`, `type-display-serif`, `type-eyebrow`, `type-body`. CSS Module chỉ dùng cho animation phức tạp (SplashScreen).
- **Typography**: Montserrat (font chính thức của Alexander Ferros, hỗ trợ tiếng Việt) cho heading/body; Cormorant Garamond italic cho dòng phụ của heading; Neue Helvetica Ultra Light chỉ cho wordmark "ALEXANDER FERROS".
- **Dữ liệu client**: `src/lib/product-helpers.ts` chứa type + helper thuần (không import JSON) để client component dùng; `src/lib/products.ts` giữ dữ liệu và truy vấn cho server component.
- **Chuyển động**:
  - `SplashScreen` khóa scroll, chạy stagger từng chữ rồi kéo màn lên; phát sự kiện `brand:splash-done`.
  - `RevealObserver` chờ splash xong rồi mới reveal `[data-reveal]` (`"media"` = wipe bằng `mask-size`, `"fade"` = chỉ opacity, mặc định = fade + translate). Delay từng phần tử qua `--reveal-delay`; các từ trong heading (`[data-word]` do `SplitWords` tạo) chạy stagger 70ms/từ.
  - `SiteHeader` đọc vị trí cuộn qua `onScroll` (Lenis) và ghi `transform` thẳng vào DOM với ngưỡng 28px/12px nên không giật khi vuốt.
  - `SmoothScroll` dùng Lenis; `scroll-controller.ts` là cầu nối để khóa/mở scroll và cuộn lên đầu khi đổi route.
  - `ParallaxMedia` dịch ảnh chậm hơn trang bằng `transform`, chỉ chạy khi phần tử trong viewport.

## Lệnh

```bash
npm run dev      # dev server (webpack)
npm run check    # lint + typecheck + build
python scripts/scrape-alexander-ferros.py   # cập nhật src/data/products.json và ảnh sản phẩm (cần Pillow)
python scripts/scrape-alexander-ferros.py --gallery-only   # chỉ tải lại gallery từng phiên bản
```

## SEO

- `src/lib/seo.ts` — nguồn duy nhất cho title/description/canonical/OG (`pageMetadata`, `productMetadata`, `categoryMetadata`, `familyMetadata`) và JSON-LD (`organizationJsonLd`, `productJsonLd`, `breadcrumbJsonLd`, `productListJsonLd`, `faqJsonLd`, `articleJsonLd`). Mọi URL tuyệt đối đi qua `absoluteUrl()` → `siteConfig.url` (`https://lenhiluxury.com`; `NEXT_PUBLIC_SITE_URL` chỉ để override preview).
- `src/app/sitemap.ts`, `src/app/robots.ts` — sinh từ cùng dữ liệu với trang; preview Vercel bị `Disallow: /` + header `X-Robots-Tag` (xem `next.config.ts`).
- `src/lib/articles.ts` + `/kien-thuc` — khung bài viết kiến thức; rỗng thì route 404 và không vào sitemap.
- Brand SEO: `siteConfig.reseller.brand` ("LENHI Luxury") cho title/schema; `displayName` ("Lê Nhi Luxury") cho copy.
