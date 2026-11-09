#!/usr/bin/env node
/**
 * Converts source images (originals are kept out of the repo) into
 * web-ready WebP files under public/images, plus app icons.
 *
 * Usage: node scripts/optimize-images.mjs <source-dir>
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: node scripts/optimize-images.mjs <source-dir>");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/images");
const appDir = path.join(root, "src/app");
await mkdir(outDir, { recursive: true });

/** @type {{ src: string; out: string; width: number; quality?: number }[]} */
const images = [
  { src: "profile.jpg", out: "profile.webp", width: 640 },
  { src: "play_rps.png", out: "project-rps-league.webp", width: 1200 },
  { src: "galeno_mobile.png", out: "project-galeno.webp", width: 1200 },
  { src: "catalogue.png", out: "project-room-simulator.webp", width: 800 },
  { src: "sol-black-logo.png", out: "logo.webp", width: 160, quality: 90 },
];

for (const { src, out, width, quality = 78 } of images) {
  const info = await sharp(path.join(srcDir, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(path.join(outDir, out));
  console.log(`${out.padEnd(32)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

// App icons: the "SN" monogram cropped from the logo, white on the brand navy.
const NAVY = { r: 0, g: 0, b: 24, alpha: 1 };
const monogram = await sharp(path.join(srcDir, "sol-white-logo.png"))
  .extract({ left: 100, top: 85, width: 300, height: 280 })
  .toBuffer();

async function icon(size, file) {
  const inner = Math.round(size * 0.78);
  const mark = await sharp(monogram)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(file);
  console.log(`${path.relative(root, file).padEnd(32)} ${size}x${size}`);
}

await icon(512, path.join(appDir, "icon.png"));
await icon(180, path.join(appDir, "apple-icon.png"));
await icon(192, path.join(root, "public/icon-192.png"));
await icon(512, path.join(root, "public/icon-512.png"));
