import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const namespace = "www-audemarspiguet-com-14def314/us--en--home-a310b589";
const research = path.join(root, "docs/research", namespace);
const destination = path.join(root, "public/sites", namespace, "media");
const sourceData = JSON.parse(await readFile(path.join(research, "page-content.json"), "utf8"));
const mobileData = JSON.parse(await readFile(path.join(research, "mobile-extraction.json"), "utf8"));
const candidates = [...sourceData.media, ...mobileData.images.filter((item) => item.tag === "IMG" || item.tag === "VIDEO").map((item) => ({ url: item.attrs["data-src"] || item.src, tag: item.tag, alt: item.alt }))];
const media = new Map();
for (const item of candidates) {
  if (!item.url) continue;
  const url = new URL(item.url);
  if (url.protocol !== "https:" || !/(^|\.)audemarspiguet\.com$/.test(url.hostname)) continue;
  url.hash = "";
  if (!media.has(url.pathname)) media.set(url.pathname, { ...item, url: url.href });
}
await mkdir(destination, { recursive: true });
const results = [];
const entries = [...media.values()];

function detectMedia(buffer, entry, responseType = "") {
  const ascii = buffer.subarray(0, 32).toString("ascii");
  const trimmed = buffer.subarray(0, 256).toString("utf8").trimStart();
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return { extension: ".jpg", contentType: "image/jpeg" };
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { extension: ".png", contentType: "image/png" };
  if (ascii.startsWith("GIF8")) return { extension: ".gif", contentType: "image/gif" };
  if (ascii.startsWith("RIFF") && ascii.includes("WEBP")) return { extension: ".webp", contentType: "image/webp" };
  if (ascii.includes("ftypavif") || ascii.includes("ftypavis")) return { extension: ".avif", contentType: "image/avif" };
  if (ascii.includes("ftyp")) return { extension: ".mp4", contentType: "video/mp4" };
  if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml")) return { extension: ".svg", contentType: "image/svg+xml" };
  if (entry.tag === "VIDEO") return { extension: ".mp4", contentType: responseType || "video/mp4" };
  return { extension: ".jpg", contentType: responseType || "image/jpeg" };
}

for (let offset = 0; offset < entries.length; offset += 4) {
  await Promise.all(entries.slice(offset, offset + 4).map(async (entry) => {
    const url = new URL(entry.url);
    const basename = path.posix.basename(url.pathname).replace(/[^A-Za-z0-9._-]/g, "-");
    const hash = createHash("sha256").update(url.pathname).digest("hex").slice(0, 8);
    const provisionalName = `${hash}-${basename}${path.extname(basename) ? "" : entry.tag === "VIDEO" ? ".mp4" : ".jpg"}`;
    const provisionalFilename = path.join(destination, provisionalName);
    try {
      let buffer = await readFile(provisionalFilename).catch(() => null);
      let contentType = "cached";
      if (!buffer?.length) {
        const response = await fetch(entry.url, { signal: AbortSignal.timeout(90_000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        contentType = response.headers.get("content-type") || "";
        if (!/^(image|video)\//.test(contentType) && !(entry.tag === "VIDEO" && /octet-stream/.test(contentType))) throw new Error(`Unexpected type: ${contentType}`);
        buffer = Buffer.from(await response.arrayBuffer());
      }
      const detected = detectMedia(buffer, entry, contentType);
      const name = `${hash}-${basename}${basename.toLowerCase().endsWith(detected.extension) ? "" : detected.extension}`;
      const filename = path.join(destination, name);
      await writeFile(filename, buffer);
      contentType = detected.contentType;
      results.push({ ...entry, path: `/sites/${namespace}/media/${name}`, bytes: buffer.length, contentType, sha256: createHash("sha256").update(buffer).digest("hex") });
      console.log(`Saved ${name} (${Math.round(buffer.length / 1024)} KB)`);
    } catch (error) {
      results.push({ ...entry, error: String(error) });
      console.error(`Failed ${entry.url}: ${error}`);
      process.exitCode = 1;
    }
  }));
  await writeFile(path.join(research, "media-manifest.json"), `${JSON.stringify(results, null, 2)}\n`);
}
console.log(`${results.filter((item) => item.path).length}/${entries.length} media files ready.`);
