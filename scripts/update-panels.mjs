#!/usr/bin/env node
/**
 * Regenerate module panel images from the VCV Rack plugin.
 *
 *   npm run panels                  # re-render everything, update what changed
 *   npm run panels -- Clairaudient  # only update the named module(s)
 *
 * Pipeline:
 *   1. Renders every shapetaker module via VCV Rack's screenshot mode
 *      (`Rack -t 5`) against a temp user dir that contains only the
 *      plugin, so nothing else is rendered.
 *   2. Re-encodes each PNG to webp (q 0.9) through Chromium.
 *   3. If the image actually changed, writes it under a NEW versioned
 *      filename (panel-v2.webp -> panel-v3.webp -> ...), deletes the old
 *      one, and rewrites src/width/height/hp in src/data/modules.ts.
 *      The filename bump is deliberate: browsers, CDNs, and the Next
 *      image optimizer all cache by URL, so reusing a name shows stale art.
 *
 * Requirements:
 *   - The plugin must be BUILT at ~/src/shapetaker (plugin.dylib +
 *     res/). Panels render from the compiled build — rebuild the plugin
 *     first or your art change won't appear.
 *   - VCV Rack 2 Pro installed. Rack briefly opens a window; let it.
 *
 * Overrides: SHAPETAKER_PLUGIN_DIR, RACK_BIN env vars.
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PLUGIN_DIR = process.env.SHAPETAKER_PLUGIN_DIR ?? path.join(os.homedir(), "src/shapetaker");
const RACK_BIN = process.env.RACK_BIN ?? "/Applications/VCV Rack 2 Pro.app/Contents/MacOS/Rack";
const PUBLIC_MODULES = path.join(REPO, "public/modules");
const MODULES_TS = path.join(REPO, "src/data/modules.ts");
const ZOOM = 5; // 75 px per HP
const QUALITY = 0.9;

// Rack module slug -> site slug. Add new modules here when they get a site entry.
const slugMap = {
  Athanor: "athanor",
  Augury: "augury",
  Chiaroscuro: "chiaroscuro",
  Chimera: "chimera",
  Clairaudient: "clairaudient",
  Divergence: "divergence",
  Evocation: "evocation",
  Fatebinder: "fatebinder",
  Incantation: "incantation",
  Involution: "involution",
  NocturneTV: "nocturne-tv",
  Recollect: "recollect",
  Reliquary: "reliquary",
  Reverie: "reverie",
  Specula: "specula",
  Tessellation: "tessellation",
  Tetrarch: "tetrarch",
  Torsion: "torsion",
  Transmutation: "transmutation",
  UtilityPanel: "utility-panel"
};

const IGNORED = new Set([]);

// optional filter: accept Rack names or site slugs, case-insensitive
const filterArgs = process.argv.slice(2).map((a) => a.toLowerCase());
const wanted = (rackName, slug) =>
  filterArgs.length === 0 ||
  filterArgs.includes(rackName.toLowerCase()) ||
  filterArgs.includes(slug.toLowerCase());

// ── 1. render via VCV Rack ──────────────────────────────────────────
if (!fs.existsSync(path.join(PLUGIN_DIR, "plugin.dylib"))) {
  console.error(`no plugin build at ${PLUGIN_DIR} — build the plugin first (make) or set SHAPETAKER_PLUGIN_DIR`);
  process.exit(1);
}
if (!fs.existsSync(RACK_BIN)) {
  console.error(`VCV Rack not found at ${RACK_BIN} — set RACK_BIN`);
  process.exit(1);
}

const rackUserDir = path.join(os.tmpdir(), "shapetaker-panel-shots");
const pluginsDir = path.join(rackUserDir, "plugins-mac-arm64");
fs.mkdirSync(pluginsDir, { recursive: true });
const link = path.join(pluginsDir, "shapetaker");
fs.rmSync(link, { force: true });
fs.symlinkSync(PLUGIN_DIR, link);
fs.rmSync(path.join(rackUserDir, "screenshots"), { recursive: true, force: true });

console.log(`rendering panels via VCV Rack (zoom ${ZOOM}) — a Rack window will open briefly...`);
execFileSync(RACK_BIN, ["-u", rackUserDir, "-t", String(ZOOM)], { stdio: "ignore" });

const shotsDir = path.join(rackUserDir, "screenshots", "shapetaker");
const renders = fs.readdirSync(shotsDir).filter((f) => f.endsWith(".png"));
console.log(`rendered ${renders.length} modules\n`);

// ── 2 + 3. encode, compare, version, update modules.ts ──────────────
let modulesTs = fs.readFileSync(MODULES_TS, "utf8");
const browser = await chromium.launch();
const page = await browser.newPage();
let updated = 0;

for (const file of renders) {
  const rackName = path.basename(file, ".png");
  if (IGNORED.has(rackName)) continue;
  const slug = slugMap[rackName];
  if (!slug) {
    console.warn(`? ${rackName}: no site slug mapped — add it to slugMap (and modules.ts) when it should appear on the site`);
    continue;
  }
  if (!wanted(rackName, slug)) continue;

  const dir = path.join(PUBLIC_MODULES, slug);
  fs.mkdirSync(dir, { recursive: true });
  const existing = fs.readdirSync(dir).filter((f) => /^panel(-v\d+)?\.webp$/.test(f)).sort();
  const current = existing.at(-1);

  const b64 = fs.readFileSync(path.join(shotsDir, file)).toString("base64");
  const currentB64 = current ? fs.readFileSync(path.join(dir, current)).toString("base64") : null;

  // Rack's GL renders are not byte-identical between launches, so compare
  // pixels perceptually against the current webp instead of comparing bytes.
  const { dataUrl, width, height, meanDiff } = await page.evaluate(async ({ b64, currentB64, quality }) => {
    const load = async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      return img;
    };
    const img = await load(`data:image/png;base64,${b64}`);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let meanDiff = Infinity;
    if (currentB64) {
      const prev = await load(`data:image/webp;base64,${currentB64}`);
      if (prev.naturalWidth === img.naturalWidth && prev.naturalHeight === img.naturalHeight) {
        const prevCanvas = document.createElement("canvas");
        prevCanvas.width = prev.naturalWidth;
        prevCanvas.height = prev.naturalHeight;
        const prevCtx = prevCanvas.getContext("2d");
        prevCtx.drawImage(prev, 0, 0);
        const a = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const b = prevCtx.getImageData(0, 0, canvas.width, canvas.height).data;
        let sum = 0;
        for (let i = 0; i < a.length; i += 4) {
          sum += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
        }
        meanDiff = sum / (a.length * 0.75);
      }
    }
    return { dataUrl: canvas.toDataURL("image/webp", quality), width: img.naturalWidth, height: img.naturalHeight, meanDiff };
  }, { b64, currentB64, quality: QUALITY });
  const webp = Buffer.from(dataUrl.split(",")[1], "base64");

  // < 1.0 mean channel difference = render/encode jitter, not an art change
  if (current && meanDiff < 1.0) {
    console.log(`= ${slug}: unchanged (${current}, diff ${meanDiff.toFixed(3)})`);
    continue;
  }

  const version = current ? Number(current.match(/-v(\d+)/)?.[1] ?? 1) + 1 : 2;
  const nextName = `panel-v${version}.webp`;
  fs.writeFileSync(path.join(dir, nextName), webp);
  for (const old of existing) fs.rmSync(path.join(dir, old), { force: true });

  // rewrite modules.ts: hp, then src/width/height (anchored per slug)
  const hp = Math.round(width / (15 * ZOOM));
  const esc = slug.replace(/[-]/g, "\\-");
  const hpRe = new RegExp(`(hp: )\\d+(,\\s*\\n\\s*panelImage: \\{\\s*\\n\\s*src: "/modules/${esc}/)`);
  const imgRe = new RegExp(`(src: ")/modules/${esc}/panel[^"]*(",\\s*\\n\\s*width: )\\d+(,\\s*\\n\\s*height: )\\d+`);
  if (imgRe.test(modulesTs)) {
    modulesTs = modulesTs
      .replace(hpRe, `$1${hp}$2`)
      .replace(imgRe, `$1/modules/${slug}/${nextName}$2${width}$3${height}`);
    console.log(`✓ ${slug}: ${width}x${height} (${hp} hp) -> ${nextName}, ${Math.round(webp.length / 1024)} KB, modules.ts updated`);
  } else {
    console.warn(`✓ ${slug}: wrote ${nextName} but found no panelImage entry in modules.ts — wire it up manually`);
  }
  updated++;
}

await browser.close();
fs.writeFileSync(MODULES_TS, modulesTs);
console.log(`\n${updated} module(s) updated. Review with git diff, then commit.`);
