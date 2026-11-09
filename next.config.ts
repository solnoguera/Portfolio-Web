import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: every route is prerendered to HTML at build time (out/).
  output: "export",
  // No image server in a static export; images are pre-optimized to WebP by
  // scripts/optimize-images.mjs and served as-is.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
