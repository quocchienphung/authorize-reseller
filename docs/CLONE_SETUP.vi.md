# Thiết lập bản clone Audemars Piguet

Nguồn tham chiếu: https://www.audemarspiguet.com/us/en/home

## Trạng thái

Homepage đã được dựng hoàn chỉnh tại hai route:

- `/`
- `/us/en/home`

Bản clone dùng nội dung, hình ảnh, video, logo, texture và font đã thu thập từ homepage gốc. Các liên kết trong trang giữ nguyên đích đến trên website Audemars Piguet.

## Chạy dự án

Yêu cầu Node.js 24 trở lên. Mở PowerShell tại thư mục dự án:

```powershell
npm ci
npm run dev
```

Mở `http://localhost:3000`. Kiểm tra toàn bộ mã nguồn và production build bằng:

```powershell
npm run check
```

Xem bản production local sau khi build:

```powershell
npm run start
```

Có thể chạy bằng Docker với cấu hình standalone đã có sẵn:

```powershell
docker compose up --build
```

Next.js và `eslint-config-next` được ghim cùng phiên bản `16.3.5`; lockfile cho phép `npm ci` tái tạo đúng môi trường.

## Phạm vi đã clone

- Header cố định, trạng thái đổi nền và ẩn/hiện theo hướng cuộn.
- Drawer menu 475 px, trạng thái mở rộng 1.014 px và điều hướng cấp hai.
- Locale dialog dùng chung cho menu và nút locale ở footer.
- Ba hero toàn màn hình, ảnh responsive, video phát theo vùng nhìn và điều khiển pause/play.
- Carousel Novelties gồm 17 mẫu và carousel Services gồm 5 dịch vụ.
- Hai khối editorial, hai grid lookbook và toàn bộ media gốc.
- Cặp feature Musée Atelier/Watchmaking Experiences, AP Chronicles và Boutique.
- Newsletter, partner logos, bốn nhóm footer responsive và bộ icon mạng xã hội gốc từ font Icomoon.

## Dữ liệu cục bộ

- 44 file media được dùng trong homepage.
- 26 file font đã lưu cục bộ, gồm Neue Helvetica, Times Now và Icomoon.
- Logo header và partner logo được giữ ở dạng SVG.
- Không cần Google Fonts hoặc CDN khi build.

Assets nằm trong:

```text
public/sites/www-audemarspiguet-com-14def314/us--en--home-a310b589/
```

Mã giao diện chính nằm trong:

```text
src/components/audemars-piguet/
```

Có thể thu thập lại nguồn tĩnh bằng:

```powershell
node scripts/download-assets-www-audemarspiguet-com-14def314-us--en--home-a310b589.mjs
node scripts/prepare-ap-media.mjs
node scripts/extract-ap-brand-assets.mjs
```

## Kiểm thử

Ngày 13/09/2026, `npm run check` đạt ESLint, TypeScript strict và production build. Hai route đều được Next.js prerender thành static content.

Visual QA đã thực hiện tại 1.440×1.000, 768×1.024 và 390×844. Tổng chiều cao của clone lần lượt là 10.553 px, 11.346 px và 10.646 px; tablet sai khác dưới 1 px so với số đo 11.345,9 px của trang gốc.

QA production không ghi nhận lỗi hoặc cảnh báo console. Khi mở development build trong profile Chrome có một số tiện ích chèn thuộc tính `bis_*` vào DOM, React có thể hiện hydration badge; đây là thay đổi do extension và không xuất hiện trong production build sạch.

Chi tiết đo đạc và hành vi nằm tại `docs/research/www-audemarspiguet-com-14def314/us--en--home-a310b589/QA_REPORT.md`.
