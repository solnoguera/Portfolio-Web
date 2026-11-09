import { skills } from "@/content/skills";
import { SectionHeading } from "../ui/SectionHeading";
import { TagList } from "../ui/Tag";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        id="skills-title"
        index="03"
        title="Skills"
        description="Core stack: Node.js, React and TypeScript."
      />
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category} className="border-t border-border pt-4">
            <dt className="font-mono text-sm font-semibold text-accent">{group.category}</dt>
            <dd className="mt-3">
              <TagList items={group.items} label={group.category} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
