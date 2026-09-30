# Deploy Cloudflare Pages (Free)

Trang này dùng Next.js static export trên Cloudflare Pages, không cần Worker hay dịch vụ biến đổi ảnh. Domain chuẩn trong source là `https://lenhiluxury.com`.

## Build và giới hạn đã kiểm tra

```sh
npm ci
npm run build:cloudflare
```

Deploy thư mục `out/`. Build ngày 30/09/2026 tạo 3.459 file, tổng 352,24 MiB; file lớn nhất 16,46 MiB. Pages Free cho 20.000 file/site, 25 MiB/file và 500 build/tháng. Kiểm tra lại số liệu sau mỗi lần thêm sản phẩm/video.

Ảnh được phục vụ trực tiếp từ `public/` và không dùng `/_next/image` hay Cloudflare Images Transformations. Điều này tránh hạn mức biến đổi ảnh, nhưng một số PNG gốc còn nặng; nên tạo WebP/AVIF sẵn trong repository nếu cần cải thiện tốc độ.

## Tạo project

1. Push thay đổi này lên repository `quocchienphung/authorize-reseller`.
2. Trong Cloudflare Dashboard: **Workers & Pages → Create application → Pages → Import an existing Git repository**. Chọn repository và nhánh production `main`.
3. Build command: `npm run build:cloudflare`. Build output directory: `out`. Root directory: repository root. `.node-version` chọn Node.js 24.6.0.
4. Để trống `NEXT_PUBLIC_SITE_URL` ở production nếu domain là `lenhiluxury.com`; nếu đặt biến này, giá trị phải là `https://lenhiluxury.com`.
5. Sau khi deploy, mở `*.pages.dev` và kiểm tra trang chủ, một trang sản phẩm, `/san-pham?danh-muc=nam`, ảnh, video, `/robots.txt`, `/sitemap.xml` và các redirect cũ.

## Chuyển domain

1. Thêm `lenhiluxury.com` vào Cloudflare zone và đổi nameserver tại nhà đăng ký domain sang nameserver Cloudflare. Kiểm tra các bản ghi DNS khác (đặc biệt MX/email) trước khi đổi.
2. Trong Pages project → **Custom domains → Set up a domain**, thêm `lenhiluxury.com`. Cloudflare tạo DNS record cần thiết.
3. Nếu dùng `www`, cấu hình **Bulk Redirect** từ `www.lenhiluxury.com` sang `https://lenhiluxury.com`, giữ path và query. Đảm bảo `www` có DNS record được Cloudflare proxy (ví dụ bản ghi `A` trỏ tới `192.0.2.1` theo hướng dẫn Cloudflare). `_redirects` của Pages chỉ dùng cho redirect theo path.
4. Khi domain hoạt động, kiểm tra canonical, sitemap và các URL cũ. Chỉ gỡ domain khỏi Vercel sau khi Pages hoạt động đúng.

`public/_redirects` mang các redirect path cũ; `public/_headers` mang security headers và `noindex` cho `*.pages.dev`. Form liên hệ hiện chỉ đổi trạng thái trong trình duyệt, không gửi dữ liệu đến server; cần tích hợp nơi nhận yêu cầu trước khi coi form là hoạt động.
