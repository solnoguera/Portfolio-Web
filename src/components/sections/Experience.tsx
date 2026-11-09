import { experience } from "@/content/experience";
import { SectionHeading } from "../ui/SectionHeading";
import { TagList } from "../ui/Tag";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        id="experience-title"
        index="01"
        title="Experience"
        description="Six years across payments, government compliance and blockchain, where mistakes cost real money."
      />

      <ol className="relative space-y-12 border-l-2 border-border pl-6 sm:pl-10">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-2 size-4 border-2 border-accent bg-bg sm:-left-[49px]"
            />
            <article aria-labelledby={`job-${job.company}`}>
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 id={`job-${job.company}`} className="text-xl font-bold">
                  {job.role} <span className="text-accent">· {job.company}</span>
                </h3>
                <p className="shrink-0 font-mono text-sm text-muted">
                  {job.period} · {job.location}
                </p>
              </header>
              <p className="mt-1 text-sm text-muted">{job.companyContext}</p>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed marker:text-accent-2">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-4">
                <TagList items={job.stack} label={`Technologies used at ${job.company}`} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
