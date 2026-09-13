# Kiến trúc mã nguồn

Website Alexander Ferros (đại lý ủy quyền) dựng trên Next.js 16 App Router, React 19, TypeScript strict và Tailwind CSS v4. Bố cục và ngôn ngữ chuyển động lấy cảm hứng từ audemarspiguet.com; nội dung, hình ảnh sản phẩm và các khối parallax lấy từ alexanderferros.com.

## Thư mục

```text
src/
  app/                     # Route files: chỉ metadata + compose component, không chứa UI
  assets/fonts/            # Neue Helvetica 25 Ultra Light (chỉ dùng cho wordmark)
  components/
    brand/                 # BrandMark (SVG), BrandLogo, SplashScreen (màn intro)
    layout/                # PageShell, SiteHeader (+ drawer), SiteFooter, Breadcrumbs, PageIntro
    motion/                # SmoothScroll (Lenis), RevealObserver, ParallaxMedia, scroll-controller
    media/                 # AutoplayVideo
    typography/            # SectionHeading, Eyebrow
    ui/                    # PillLink, LineLink, shadcn Button
    home/                  # HomePage, HeroStack, CollectionShowcase, BrandStory
    collections/           # CollectionsLanding (clone /en/products), ParallaxCover, ListingPage
    product/               # ProductCard, ProductCarousel, ProductMosaic, ProductGrid, ProductDetailPage
    pages/                 # Services, Warranty, FAQ, Stores, Contact, Pricing
  config/site.ts           # Tên thương hiệu, liên hệ, mạng xã hội, showroom, routes, navigation
  lib/products.ts          # Truy vấn catalogue (theo danh mục, dòng, liên quan, tìm kiếm)
  data/products.json       # 208 sản phẩm scrape từ alexanderferros.com (scripts/scrape-alexander-ferros.py)
public/alexander-ferros/
  covers/                  # Ảnh bìa parallax (our-collection, mens, womens) desktop + mobile
  editorial/               # Ảnh brand story
  products/                # Ảnh sản phẩm PNG nền trong suốt 1000×1000
  videos/                  # Hai phim hero
```

## Quy ước

- **Route mỏng**: `src/app/**/page.tsx` chỉ khai báo `metadata`, `generateStaticParams` và render một component trang.
- **Đường dẫn tập trung**: luôn dùng `routes.*` từ `src/config/site.ts`, không hard-code chuỗi URL.
- **Style**: Tailwind utility classes. Token màu/typography khai báo trong `src/app/globals.css` (`@theme`), kèm các utility `rail`, `type-display`, `type-display-serif`, `type-eyebrow`, `type-body`. CSS Module chỉ dùng cho animation phức tạp (SplashScreen).
- **Typography**: Montserrat (font chính thức của Alexander Ferros, hỗ trợ tiếng Việt) cho heading/body; Cormorant Garamond italic cho dòng phụ của heading; Neue Helvetica Ultra Light chỉ cho wordmark "ALEXANDER FERROS".
- **Chuyển động**:
  - `SplashScreen` khóa scroll, chạy stagger từng chữ rồi kéo màn lên; phát sự kiện `brand:splash-done`.
  - `RevealObserver` chờ splash xong rồi mới reveal `[data-reveal]` (`"media"` = wipe, `"fade"` = chỉ opacity, mặc định = fade + translate). Delay từng phần tử qua `--reveal-delay`.
  - `SmoothScroll` dùng Lenis; `scroll-controller.ts` là cầu nối để khóa/mở scroll và cuộn lên đầu khi đổi route.
  - `ParallaxMedia` dịch ảnh chậm hơn trang bằng `transform`, chỉ chạy khi phần tử trong viewport.

## Lệnh

```bash
npm run dev      # dev server (webpack)
npm run check    # lint + typecheck + build
python scripts/scrape-alexander-ferros.py   # cập nhật src/data/products.json và ảnh sản phẩm
```
