#!/usr/bin/env node
/**
 * Pings IndexNow (Bing, Yandex, Naver, Seznam — Google does not use it) with
 * every URL in the production sitemap, or with the URLs passed as arguments.
 *
 *   node scripts/indexnow-submit.mjs                 # whole sitemap
 *   node scripts/indexnow-submit.mjs /san-pham/x /y  # specific paths
 *
 * The key file public/<key>.txt must be deployed at the site root first.
 */
const SITE = "https://lenhiluxury.com";
const KEY = "9373a51171e036aca8894f03338b0c3c";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((path) => (path.startsWith("http") ? path : SITE + path));
} else {
  const xml = await (await fetch(SITE + "/sitemap.xml")).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// IndexNow accepts up to 10,000 URLs per request; keep batches small anyway.
for (let i = 0; i < urls.length; i += 500) {
  const batch = urls.slice(i, i + 500);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
  });
  const accepted = res.status === 200 || res.status === 202;
  console.log(`IndexNow: ${batch.length} URLs → HTTP ${res.status} ${accepted ? "(accepted)" : "(check key file / payload)"}`);
}
