#!/usr/bin/env node
/** Renders public/og.png (1200×630), the social preview card. Usage: node scripts/generate-og.mjs */
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000018"/>
  <rect x="60" y="60" width="1080" height="510" fill="none" stroke="#26273b" stroke-width="2"/>
  <rect x="60" y="560" width="1080" height="10" fill="#4fd08a"/>
  <text x="110" y="170" font-family="Menlo, monospace" font-size="28" fill="#4fd08a">Open to remote · US / EU time zones</text>
  <text x="104" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="104" font-weight="700" fill="#e2dfc7">
    <tspan fill="#f9b82c" font-family="Menlo, monospace" font-size="56">&lt;</tspan>Sol Noguera<tspan fill="#f9b82c" font-family="Menlo, monospace" font-size="56"> /&gt;</tspan>
  </text>
  <text x="110" y="380" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="52" font-weight="600" fill="#a8a690">Senior Full Stack Engineer</text>
  <text x="110" y="470" font-family="Menlo, monospace" font-size="32" fill="#f9b82c">Node.js · React · TypeScript</text>
</svg>`;

const out = path.join(root, "public/og.png");
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("wrote", path.relative(root, out));
