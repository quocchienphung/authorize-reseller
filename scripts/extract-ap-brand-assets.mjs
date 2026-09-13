import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const namespace = "www-audemarspiguet-com-14def314/us--en--home-a310b589";
const research = path.join(root, "docs/research", namespace);
const destination = path.join(root, "public/sites", namespace, "brand");

const desktop = JSON.parse(await readFile(path.join(research, "desktop-extraction.json"), "utf8"));
const mobile = JSON.parse(await readFile(path.join(research, "mobile-header-svg.json"), "utf8"));
const desktopLogo = desktop.svgs.find((item) => item.parent === "Audemars Piguet - Go to homepage")?.html;
const mobileLogo = mobile.find((item) => item.parent === "Audemars Piguet - Go to homepage")?.html;

if (!desktopLogo || !mobileLogo) throw new Error("Header logo SVGs were not found in the captured page data.");

await mkdir(destination, { recursive: true });
await writeFile(path.join(destination, "ap-logo-full.svg"), `${desktopLogo}\n`);
await writeFile(path.join(destination, "ap-monogram.svg"), `${mobileLogo}\n`);
console.log("Extracted AP desktop and mobile header marks.");
