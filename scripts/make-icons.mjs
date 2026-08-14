import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile("app/icon.svg");
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// Apple's home-screen icon is composited on a white background by iOS when the
// PNG has alpha, so it is rendered opaque here rather than left transparent.
await writeFile("app/apple-icon.png", await png(180));
for (const s of [192, 512]) await writeFile(`public/icon-${s}.png`, await png(s));

// A .ico holding 16/32/48 so old browsers and the Windows taskbar all get a
// size they can use without downscaling a large PNG themselves.
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = [], body = [];
sizes.forEach((s, i) => {
  const e = Buffer.alloc(16);
  e[0] = s === 256 ? 0 : s; e[1] = s === 256 ? 0 : s;
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(imgs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += imgs[i].length;
  dir.push(e); body.push(imgs[i]);
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...dir, ...body]));
console.log("wrote apple-icon.png, icon-192/512.png, favicon.ico");
