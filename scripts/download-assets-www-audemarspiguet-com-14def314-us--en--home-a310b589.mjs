import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const namespace = "www-audemarspiguet-com-14def314/us--en--home-a310b589";
const research = path.join(root, "docs/research", namespace);
const assets = path.join(root, "public/sites", namespace);
const source = "https://www.audemarspiguet.com/us/en/home";
const manifest = [];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&quot;", '"');
const hash = (value) => createHash("sha256").update(value).digest("hex").slice(0, 8);

function resolveSource(value, base) {
  try {
    const url = new URL(decode(value), base);
    if (url.protocol !== "https:" || !/(^|\.)audemarspiguet\.com$/.test(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

async function download(url, directory, kind, expectedType) {
  const basename = path.posix.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9._-]/g, "-") || "index.html";
  const destination = path.join(directory, `${hash(url)}-${basename}`);
  if (kind === "font") {
    const cached = await readFile(destination).catch(() => null);
    if (cached && ["wOFF", "wOF2"].includes(cached.subarray(0, 4).toString("ascii"))) {
      manifest.push({ url, path: path.relative(root, destination).replaceAll("\\", "/"), kind, contentType: basename.endsWith("woff2") ? "font/woff2" : "font/woff", bytes: cached.length, sha256: createHash("sha256").update(cached).digest("hex"), cached: true });
      return "";
    }
  }
  const response = await fetch(url, { signal: AbortSignal.timeout(45_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (expectedType && !expectedType.test(contentType)) throw new Error(`Unexpected ${contentType}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (kind === "font" && !["wOFF", "wOF2"].includes(bytes.subarray(0, 4).toString("ascii"))) throw new Error(`Invalid font file: ${url}`);
  await mkdir(directory, { recursive: true });
  await writeFile(destination, bytes);
  manifest.push({ url, path: path.relative(root, destination).replaceAll("\\", "/"), kind, contentType, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
  return bytes.toString("utf8");
}

async function batch(items, operation) {
  for (let index = 0; index < items.length; index += 4) {
    const results = await Promise.allSettled(items.slice(index, index + 4).map(operation));
    for (const [offset, result] of results.entries()) {
      if (result.status === "rejected") {
        manifest.push({ url: items[index + offset], error: String(result.reason) });
        process.exitCode = 1;
      }
    }
  }
}

await mkdir(research, { recursive: true });
const html = await download(source, path.join(research, "source"), "html", /text\/html/);
const tags = [...html.matchAll(/<(?:link|img|source|video|script)\b[^>]*>/gi)].map(([tag]) => {
  const attributes = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map(([, key, , value]) => [key, decode(value)]));
  return { tag: tag.match(/^<(\w+)/)[1].toLowerCase(), ...attributes };
});
await writeFile(path.join(research, "source-elements.json"), `${JSON.stringify(tags, null, 2)}\n`);
const stylesheets = [...new Set(tags.filter((tag) => tag.rel === "stylesheet").map((tag) => resolveSource(tag.href, source)).filter(Boolean))];
const fontUrls = new Set();
const cssAssets = new Set();
const fontRules = [];
function collectCss(css, url) {
  const rules = [...css.matchAll(/@font-face\s*\{[^}]+\}/g)].map(([rule]) => ({ source: url, rule }));
  fontRules.push(...rules);
  for (const { rule } of rules) {
    const candidates = [...rule.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(([, value]) => resolveSource(value, url)).filter(Boolean);
    const font = candidates.find((value) => /\.woff2(\?|$)/i.test(value)) ?? candidates.find((value) => /\.woff(\?|$)/i.test(value));
    if (font) fontUrls.add(font);
  }
  for (const [, value] of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    const asset = resolveSource(value, url);
    if (!asset) continue;
    cssAssets.add(asset);
  }
}
const inlineCss = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(([, css]) => css).join("\n");
await writeFile(path.join(research, "source/inline-styles.css"), inlineCss);
collectCss(inlineCss, source);
await batch(stylesheets, async (url) => {
  const css = await download(url, path.join(research, "source"), "stylesheet", /css/);
  collectCss(css, url);
});
await writeFile(path.join(research, "font-face-rules.json"), `${JSON.stringify(fontRules, null, 2)}\n`);
await writeFile(path.join(research, "css-asset-urls.json"), `${JSON.stringify([...cssAssets], null, 2)}\n`);
await batch([...fontUrls], (url) => download(url, path.join(assets, "fonts"), "font", /font|woff|octet-stream/));
await writeFile(path.join(research, "asset-manifest.json"), `${JSON.stringify({ capturedAt: new Date().toISOString(), source, method: "Static HTTP source capture; browser verification pending", files: manifest }, null, 2)}\n`);
console.log(JSON.stringify({ files: manifest.filter((item) => item.path).length, fonts: fontUrls.size, stylesheets: stylesheets.length, errors: manifest.filter((item) => item.error).length, research }, null, 2));
