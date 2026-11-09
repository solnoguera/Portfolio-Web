import { profile } from "@/content/profile";
import { Icon } from "../ui/Icon";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="contact-title" className="flex items-baseline gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span aria-hidden="true" className="font-mono text-base font-semibold text-accent sm:text-lg">
              05.
            </span>
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            I&apos;m available now for senior full stack or backend roles, remote with US or EU teams. The fastest way
            to reach me is email.
          </p>
          <ul className="mt-8 space-y-3">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex min-h-11 items-center gap-3 font-mono text-sm hover:text-accent"
                  {...(social.icon !== "mail" && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon name={social.icon} size={20} />
                  {social.icon === "mail" ? profile.email : social.href.replace(/^https:\/\/(www\.)?/, "")}
                  {social.icon !== "mail" && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
