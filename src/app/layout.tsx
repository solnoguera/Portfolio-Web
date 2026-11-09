import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const sans = Inter({ variable: "--font-sans-face", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"], display: "swap" });

const title = `${profile.name} · ${profile.role}`;
const description =
  "Senior full stack engineer (Node.js, React, TypeScript) with 6+ years building secure payment, government and blockchain systems and integrating LLMs into production features. Open to remote roles in US/EU time zones.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  keywords: [
    "Senior Full Stack Engineer",
    "Node.js",
    "React",
    "TypeScript",
    "NestJS",
    "Payments",
    "Stripe",
    "LLM",
    "OpenAI API",
    "Remote",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#000018" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is replaced before first paint by the inline script, hence suppressHydrationWarning.
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
