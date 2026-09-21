"""Capture Alexander Ferros products and download their official media locally.

The public catalogue is server rendered, so the catalogue itself needs only
Python's standard library; Pillow is used to resize the gallery photography
(originals are 5000px+ JPEGs) into web-sized WebP files. It produces a stable
JSON snapshot consumed by the Next.js app and can be rerun when the source
catalogue changes.

    python scripts/scrape-alexander-ferros.py                 # full refresh
    python scripts/scrape-alexander-ferros.py --gallery-only  # refresh only per-variant galleries
"""

from __future__ import annotations

import concurrent.futures
import html
import io
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

from PIL import Image, ImageFile, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = ROOT / "public" / "alexander-ferros"
PRODUCT_DIR = PUBLIC_ROOT / "products"
DATA_DIR = ROOT / "src" / "data"
RESEARCH_DIR = ROOT / "docs" / "research" / "alexander-ferros-hybrid"
BASE_URL = "https://alexanderferros.com"
GALLERY_MAX_SIDE = 1600
GALLERY_QUALITY = 82
# A few originals lack the JPEG end marker; decode them rather than dropping the photo.
ImageFile.LOAD_TRUNCATED_IMAGES = True
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36"
    )
}


def fetch(url: str, attempts: int = 4) -> bytes:
    # Some storage filenames contain spaces ("9322D_05 (6).jpg"), which urllib rejects raw.
    url = urllib.parse.quote(url, safe="!#$&'()*+,/:;=?@[]%")
    last_error: Exception | None = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=45) as response:
                return response.read()
        except Exception as error:  # noqa: BLE001 - retry network failures together
            last_error = error
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Could not download {url}: {last_error}")


def text_slug(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value.lower())
    ascii_value = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", ascii_value))


def original_image_url(value: str) -> str:
    absolute = urllib.parse.urljoin(BASE_URL, html.unescape(value))
    parsed = urllib.parse.urlparse(absolute)
    if parsed.path == "/_next/image":
        query = urllib.parse.parse_qs(parsed.query)
        absolute = query.get("url", [absolute])[0]
    return absolute.replace(
        "https://console.alexanderferros.jamstack.vn/",
        "https://console.alexanderferros.com/",
    )


class CatalogueParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.anchor: dict[str, object] | None = None
        self.items: dict[str, dict[str, str]] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "a":
            href = values.get("href") or ""
            if "/san-pham/" in href and "vid=" in href:
                self.anchor = {"href": urllib.parse.urljoin(BASE_URL, href), "text": []}
        elif tag == "img" and self.anchor is not None:
            alt = values.get("alt") or ""
            src = values.get("src") or ""
            if alt.startswith("Đồng Hồ Alexander Ferros") and src:
                self.anchor["name"] = alt
                self.anchor["imageSource"] = original_image_url(src)

    def handle_data(self, data: str) -> None:
        if self.anchor is not None:
            texts = self.anchor["text"]
            assert isinstance(texts, list)
            clean = " ".join(data.split())
            if clean:
                texts.append(clean)

    def handle_endtag(self, tag: str) -> None:
        if tag != "a" or self.anchor is None:
            return
        href = str(self.anchor["href"])
        existing = self.items.setdefault(href, {"sourceUrl": href})
        if "name" in self.anchor:
            existing["name"] = str(self.anchor["name"])
            existing["imageSource"] = str(self.anchor["imageSource"])
        joined = " ".join(str(part) for part in self.anchor["text"])
        price = re.search(r"\b\d{1,3}(?:\.\d{3})+\s*₫", joined)
        if price:
            existing["price"] = re.sub(r"\s+", " ", price.group(0))
        self.anchor = None


class DetailParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_json_ld = False
        self.json_parts: list[str] = []
        self.json_documents: list[dict[str, object]] = []
        self.in_row = False
        self.in_cell = False
        self.cell_parts: list[str] = []
        self.row: list[str] = []
        self.rows: list[list[str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "script" and values.get("type") == "application/ld+json":
            self.in_json_ld = True
            self.json_parts = []
        elif tag == "tr":
            self.in_row = True
            self.row = []
        elif tag in {"td", "th"} and self.in_row:
            self.in_cell = True
            self.cell_parts = []

    def handle_data(self, data: str) -> None:
        if self.in_json_ld:
            self.json_parts.append(data)
        if self.in_cell:
            clean = " ".join(data.split())
            if clean:
                self.cell_parts.append(clean)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self.in_json_ld:
            self.in_json_ld = False
            try:
                value = json.loads("".join(self.json_parts))
                if isinstance(value, dict):
                    self.json_documents.append(value)
            except json.JSONDecodeError:
                pass
        elif tag in {"td", "th"} and self.in_cell:
            self.in_cell = False
            self.row.append(" ".join(self.cell_parts))
        elif tag == "tr" and self.in_row:
            self.in_row = False
            if len(self.row) == 2 and all(self.row):
                self.rows.append(self.row)


def plain_text(markup: str) -> str:
    class TextParser(HTMLParser):
        def __init__(self) -> None:
            super().__init__(convert_charrefs=True)
            self.parts: list[str] = []

        def handle_data(self, data: str) -> None:
            clean = " ".join(data.split())
            if clean:
                self.parts.append(clean)

    parser = TextParser()
    parser.feed(markup)
    return " ".join(parser.parts)


def scrape_catalogue() -> list[dict[str, object]]:
    products: dict[str, dict[str, str]] = {}
    for page in range(1, 15):
        url = f"{BASE_URL}/danh-sach-san-pham?page={page}"
        parser = CatalogueParser()
        parser.feed(fetch(url).decode("utf-8", errors="replace"))
        products.update(parser.items)
        print(f"Catalogue page {page}/14: {len(parser.items)} variants", flush=True)

    captured: list[dict[str, object]] = []
    for item in products.values():
        if not {"name", "price", "imageSource"}.issubset(item):
            continue
        parsed_url = urllib.parse.urlparse(item["sourceUrl"])
        query = urllib.parse.parse_qs(parsed_url.query)
        variant_id = query.get("vid", [""])[0]
        sku_match = re.search(r"Alexander Ferros\s+(.+)$", item["name"])
        sku = sku_match.group(1).strip() if sku_match else item["name"]
        category = "Đồng hồ nữ" if "/dong-ho-nu/" in parsed_url.path else "Đồng hồ nam"
        family_slug = parsed_url.path.rstrip("/").split("/")[-1]
        captured.append(
            {
                **item,
                "variantId": variant_id,
                "sku": sku,
                "slug": f"{text_slug(sku)}-{variant_id}",
                "category": category,
                "familySlug": family_slug,
                "baseSourceUrl": f"{BASE_URL}{parsed_url.path}",
            }
        )
    return sorted(captured, key=lambda product: int(str(product["variantId"])), reverse=True)


def flight_chunks(markup: str) -> list[str]:
    """String payloads streamed through `self.__next_f.push` on a detail page."""
    chunks: list[str] = []
    for match in re.finditer(r"self\.__next_f\.push\((\[.*?\])\)</script>", markup, re.S):
        try:
            payload = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        if len(payload) >= 2 and isinstance(payload[1], str):
            chunks.append(payload[1])
    return chunks


def extract_galleries(chunks: list[str]) -> dict[str, list[str]]:
    """Per-variant photo sets keyed by variant id, from the product props in the Flight stream."""
    flight = "".join(chunks)
    start = flight.find('"product":{"id":')
    if start < 0:
        return {}
    try:
        product, _ = json.JSONDecoder().raw_decode(flight, start + len('"product":'))
    except json.JSONDecodeError:
        return {}
    galleries: dict[str, list[str]] = {}
    for variant in product.get("product_variants", []):
        urls: list[str] = []
        for entry in variant.get("images") or []:
            url = entry.get("absolute_url") if isinstance(entry, dict) else None
            if url and url not in urls:
                urls.append(original_image_url(str(url)))
        galleries[str(variant.get("id"))] = urls
    return galleries


def scrape_detail(base_url: str) -> dict[str, object]:
    markup = fetch(base_url).decode("utf-8", errors="replace")
    parser = DetailParser()
    parser.feed(markup)
    product_schema = next(
        (document for document in parser.json_documents if document.get("@type") == "Product"),
        {},
    )
    description = plain_text(str(product_schema.get("description", "")))
    chunks = flight_chunks(markup)
    specifications = parser.rows
    if not specifications:
        # Next.js streams accordion HTML through React Flight. Decode the
        # official table fragment so each static detail page keeps real specs.
        for chunk in chunks:
            if not chunk.lstrip().startswith("<figure") or "<table" not in chunk:
                continue
            table_parser = DetailParser()
            table_parser.feed(chunk)
            if table_parser.rows:
                specifications = table_parser.rows
                break
    return {
        "description": description,
        "specifications": specifications,
        "galleries": extract_galleries(chunks),
    }


def download_product(product: dict[str, object]) -> tuple[str, int]:
    url = str(product["imageSource"])
    parsed = urllib.parse.urlparse(url)
    suffix = Path(parsed.path).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp", ".avif"}:
        suffix = ".webp"
    filename = f"{product['slug']}{suffix}"
    destination = PRODUCT_DIR / filename
    if not destination.exists() or destination.stat().st_size == 0:
        try:
            content = fetch(url)
        except RuntimeError:
            # A few legacy originals were moved while the Next.js image cache
            # remains public. Preserve the official optimized copy in that case.
            optimized = (
                f"{BASE_URL}/_next/image?url={urllib.parse.quote(url, safe='')}"
                "&w=1920&q=80"
            )
            content = fetch(optimized)
        destination.write_bytes(content)
    return f"/alexander-ferros/products/{filename}", destination.stat().st_size


def convert_gallery_image(content: bytes, destination: Path) -> None:
    with Image.open(io.BytesIO(content)) as source:
        # JPEG draft mode decodes at a reduced scale, which is far cheaper than
        # decoding the 5000px+ originals in full before resizing.
        source.draft("RGB", (GALLERY_MAX_SIDE * 2, GALLERY_MAX_SIDE * 2))
        image = ImageOps.exif_transpose(source) or source
        image.thumbnail((GALLERY_MAX_SIDE, GALLERY_MAX_SIDE), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGB")
        image.save(destination, "WEBP", quality=GALLERY_QUALITY, method=6)


def download_gallery(product: dict[str, object]) -> list[str]:
    """Store each official photo for the variant as `products/<slug>/NN.webp`."""
    sources = product.get("gallerySources")
    slug = str(product["slug"])
    folder = PRODUCT_DIR / slug
    if not isinstance(sources, list) or not sources:
        return []
    folder.mkdir(parents=True, exist_ok=True)
    local_paths: list[str] = []
    expected: set[str] = set()
    for index, url in enumerate(sources, 1):
        filename = f"{index:02d}.webp"
        expected.add(filename)
        destination = folder / filename
        if not destination.exists() or destination.stat().st_size == 0:
            try:
                convert_gallery_image(fetch(str(url)), destination)
            except Exception as error:  # noqa: BLE001 - one bad photo must not drop the set
                print(f"Gallery warning for {slug} #{index}: {error}", file=sys.stderr)
                continue
        local_paths.append(f"/alexander-ferros/products/{slug}/{filename}")
    for stale in folder.glob("*.webp"):
        if stale.name not in expected:
            stale.unlink()
    return local_paths


def attach_galleries(
    products: list[dict[str, object]], details: dict[str, dict[str, object]]
) -> None:
    for product in products:
        detail = details.get(str(product["baseSourceUrl"]), {})
        galleries = detail.get("galleries")
        variant_galleries = galleries if isinstance(galleries, dict) else {}
        product["gallerySources"] = list(variant_galleries.get(str(product["variantId"]), []))

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_gallery, product): product for product in products}
        for index, future in enumerate(concurrent.futures.as_completed(futures), 1):
            futures[future]["images"] = future.result()
            if index % 20 == 0 or index == len(products):
                print(f"Product galleries {index}/{len(products)}", flush=True)


def scrape_details(base_urls: list[str]) -> dict[str, dict[str, object]]:
    details: dict[str, dict[str, object]] = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(scrape_detail, url): url for url in base_urls}
        for index, future in enumerate(concurrent.futures.as_completed(futures), 1):
            url = futures[future]
            try:
                details[url] = future.result()
            except Exception as error:  # noqa: BLE001 - keep catalogue usable
                print(f"Detail warning for {url}: {error}", file=sys.stderr)
                details[url] = {"description": "", "specifications": [], "galleries": {}}
            print(f"Product details {index}/{len(base_urls)}", flush=True)
    return details


def write_catalogue(products: list[dict[str, object]]) -> None:
    research_payload = {
        "capturedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": f"{BASE_URL}/danh-sach-san-pham",
        "count": len(products),
        "products": products,
    }
    runtime_products = []
    for product in products:
        runtime_products.append(
            {
                key: value
                for key, value in product.items()
                if key not in {"sourceUrl", "baseSourceUrl", "imageSource", "imageBytes", "gallerySources"}
            }
        )
    runtime_payload = {"count": len(runtime_products), "products": runtime_products}
    output = DATA_DIR / "products.json"
    output.write_text(json.dumps(runtime_payload, ensure_ascii=False, indent=2), encoding="utf-8")
    (RESEARCH_DIR / "product-catalogue.json").write_text(
        json.dumps(research_payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Wrote {output.relative_to(ROOT)} with {len(products)} products", flush=True)


def refresh_galleries() -> int:
    """Re-fetch only the per-variant photo sets for the products already in the snapshot."""
    research_file = RESEARCH_DIR / "product-catalogue.json"
    products = json.loads(research_file.read_text(encoding="utf-8"))["products"]
    base_urls = sorted({str(product["baseSourceUrl"]) for product in products})
    print(f"Refreshing galleries for {len(products)} variants across {len(base_urls)} families", flush=True)
    attach_galleries(products, scrape_details(base_urls))
    write_catalogue(products)
    return 0


def main() -> int:
    PRODUCT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    RESEARCH_DIR.mkdir(parents=True, exist_ok=True)

    if "--gallery-only" in sys.argv[1:]:
        return refresh_galleries()

    products = scrape_catalogue()
    if not products:
        raise RuntimeError("No products were discovered")

    base_urls = sorted({str(product["baseSourceUrl"]) for product in products})
    print(f"Captured {len(products)} variants across {len(base_urls)} product families", flush=True)

    details = scrape_details(base_urls)

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(download_product, product): product for product in products}
        for index, future in enumerate(concurrent.futures.as_completed(futures), 1):
            product = futures[future]
            local_image, image_bytes = future.result()
            product["image"] = local_image
            product["imageBytes"] = image_bytes
            if index % 20 == 0 or index == len(products):
                print(f"Product images {index}/{len(products)}", flush=True)

    for product in products:
        detail = details.get(str(product["baseSourceUrl"]), {})
        product["description"] = detail.get("description", "")
        product["specifications"] = detail.get("specifications", [])

    attach_galleries(products, details)
    write_catalogue(products)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
