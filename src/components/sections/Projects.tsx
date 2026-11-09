import Image from "next/image";
import { featuredProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { buttonClasses } from "../ui/Button";
import { ExternalLink } from "../ui/ExternalLink";
import { SectionHeading } from "../ui/SectionHeading";
import { TagList } from "../ui/Tag";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading id="projects-title" index="02" title="Projects" />
        <FeaturedProject />
        <h3 className="mb-8 mt-20 font-mono text-sm font-semibold uppercase tracking-widest text-muted">More work</h3>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturedProject() {
  const p = featuredProject;
  return (
    <article
      aria-labelledby="featured-title"
      className="border-2 border-fg bg-bg p-6 shadow-[8px_8px_0_var(--shadow)] sm:p-10"
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">Featured case study</p>
      <h3 id="featured-title" className="mt-3 text-2xl font-bold sm:text-3xl">
        {p.title}
      </h3>
      <p className="mt-1 font-mono text-sm text-muted">{p.period}</p>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed">{p.summary}</p>

      <div className="mt-8 border-l-2 border-accent-2 pl-4">
        <h4 className="font-mono text-sm font-semibold text-accent-2">The problem</h4>
        <p className="mt-2 max-w-3xl leading-relaxed">{p.problem}</p>
      </div>

      <h4 className="mt-10 font-mono text-sm font-semibold text-accent-2">Key decisions</h4>
      <ul className="mt-4 grid gap-6 sm:grid-cols-2">
        {p.decisions.map((decision) => (
          <li key={decision.title} className="border border-border bg-surface p-5">
            <p className="font-semibold">{decision.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{decision.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <TagList items={p.stack} label={`${p.title} technologies`} />
        <div className="flex shrink-0 flex-wrap gap-4">
          {p.links.map((link, i) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              className={buttonClasses(i === 0 ? "primary" : "secondary")}
              showIcon={false}
            >
              {link.label}
              <span className="sr-only"> for {p.title}</span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={slug(project.title)} className="flex h-full flex-col border border-border bg-bg">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
        className="aspect-[16/9] w-full border-b border-border object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <h4 id={slug(project.title)} className="text-lg font-bold leading-snug">
          {project.title}
        </h4>
        <p className="mt-1 font-mono text-xs text-muted">
          {project.year} · {project.role}
        </p>
        <p className="mt-4 text-sm leading-relaxed">{project.summary}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent-2">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="mt-5">
          <TagList items={project.stack} label={`${project.title} technologies`} />
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 font-mono text-sm">
          {project.links.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center font-semibold text-accent underline-offset-4 hover:underline"
            >
              {link.label}
              <span className="sr-only"> {project.title}</span>
            </ExternalLink>
          ))}
          {project.note && <p className="text-xs text-muted">{project.note}</p>}
        </div>
      </div>
    </article>
  );
}

function slug(text: string) {
  return `project-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}
