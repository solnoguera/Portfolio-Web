import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found · Sol Noguera" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center gap-6 px-4">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-4xl font-bold">This page doesn&apos;t exist.</h1>
      <p className="text-lg text-muted">The link may be old or mistyped.</p>
      <ButtonLink href="/">Back to the portfolio</ButtonLink>
    </main>
  );
}
