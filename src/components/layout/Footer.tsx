import { profile } from "@/content/profile";
import { ExternalLink } from "../ui/ExternalLink";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with Next.js, TypeScript and Tailwind CSS ·{" "}
          <ExternalLink href="https://github.com/solnoguera/Portfolio-Web" className="underline hover:text-accent">
            Source on GitHub
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
