import { profile } from "@/content/profile";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <p className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-2 opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
        </span>
        {profile.availability}
      </p>

      <h1 id="hero-title" className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">
        <span aria-hidden="true" className="font-mono text-2xl font-medium text-accent sm:text-3xl">
          {"<"}
        </span>
        {profile.name}
        <span aria-hidden="true" className="font-mono text-2xl font-medium text-accent sm:text-3xl">
          {" />"}
        </span>
        <span className="mt-3 block text-2xl font-semibold text-muted sm:text-4xl">{profile.role}</span>
      </h1>

      <p className="mt-4 font-mono text-sm text-accent-2 sm:text-base">{profile.stack}</p>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">{profile.tagline}</p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <ButtonLink href="#experience">
          View experience
          <Icon name="arrowRight" size={16} />
        </ButtonLink>
        <ButtonLink href={profile.resumeHref} download variant="secondary">
          <Icon name="download" size={16} />
          Download CV <span className="sr-only">(PDF)</span>
        </ButtonLink>
        <ul className="flex items-center gap-1" aria-label="Social links">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className="inline-flex size-11 items-center justify-center text-muted transition-colors hover:text-accent"
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
    </section>
  );
}
