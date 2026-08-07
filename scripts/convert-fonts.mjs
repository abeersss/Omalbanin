/**
 * One-off: converts the licensed TTFs into WOFF2 under public/fonts/.
 * Kept in the repo so the font set can be regenerated or extended later.
 */
import { compress } from "wawoff2";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/convert-fonts.mjs <folder-with-ttfs>");
  process.exit(1);
}

const FACES = [
  "Amiri/Amiri-Regular.ttf",
  "Amiri/Amiri-Bold.ttf",
  "Tajawal/Tajawal-Regular.ttf",
  "Tajawal/Tajawal-Medium.ttf",
  "Tajawal/Tajawal-Bold.ttf",
];

mkdirSync("public/fonts", { recursive: true });

let before = 0;
let after = 0;

for (const rel of FACES) {
  const ttf = readFileSync(`${SRC}/${rel}`);
  const woff2 = await compress(ttf);
  const out = `public/fonts/${basename(rel, ".ttf")}.woff2`;
  writeFileSync(out, woff2);
  before += ttf.length;
  after += woff2.length;
  console.log(
    `${basename(rel).padEnd(24)} ${(ttf.length / 1024).toFixed(0).padStart(5)} KB -> ${(woff2.length / 1024).toFixed(0).padStart(4)} KB`,
  );
}

console.log(
  `\ntotal ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (${Math.round((1 - after / before) * 100)}% smaller)`,
);
