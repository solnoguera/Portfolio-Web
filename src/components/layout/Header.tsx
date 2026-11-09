"use client";

import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { useActiveSection } from "@/lib/useActiveSection";
import { Icon } from "../ui/Icon";
import { ThemeToggle } from "../ui/ThemeToggle";

export const navItems = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const active = useActiveSection(sectionIds);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeMenu = () => dialogRef.current?.close();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-2">
          <Image src="/images/logo.webp" alt="" width={48} height={48} priority className="dark:invert" />
          <span className="font-mono text-sm font-semibold">{profile.name}</span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="relative inline-flex min-h-11 items-center px-3 font-mono text-sm text-muted transition-colors hover:text-fg aria-[current=true]:text-fg after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 aria-[current=true]:after:scale-x-100"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.resumeHref}
            download
            className="hidden min-h-11 items-center gap-2 px-3 font-mono text-sm font-semibold text-accent hover:underline sm:inline-flex"
          >
            <Icon name="download" size={16} />
            Resume
            <span className="sr-only">(PDF)</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Icon name="menu" size={24} />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Native modal dialog: focus is trapped, the page behind is inert and Esc closes it.
          The backdrop click is a mouse convenience; keyboard users already have Esc and the Close button. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-bg p-0 text-fg backdrop:bg-black/50 lg:hidden"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu(); // click on backdrop
        }}
      >
        <div className="flex h-full flex-col px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted">Menu</span>
            <button type="button" onClick={closeMenu} className="inline-flex size-11 items-center justify-center">
              <Icon name="close" size={24} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="flex flex-col gap-2">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={closeMenu}
                    aria-current={active === id ? "true" : undefined}
                    className="flex min-h-12 items-center text-2xl font-semibold aria-[current=true]:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeHref}
                  download
                  className="flex min-h-12 items-center gap-2 text-2xl font-semibold text-accent"
                >
                  Resume <span className="sr-only">(PDF)</span>
                  <Icon name="download" size={22} />
                </a>
              </li>
            </ul>
          </nav>
          <ul className="mt-auto flex gap-2 border-t border-border pt-4" aria-label="Social links">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex size-11 items-center justify-center hover:text-accent"
                  {...(social.icon !== "mail" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon name={social.icon} size={22} />
                  <span className="sr-only">
                    {social.label}
                    {social.icon !== "mail" && " (opens in a new tab)"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </header>
  );
}
