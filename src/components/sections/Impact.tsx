import { metrics } from "@/content/profile";

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="impact-title" className="sr-only">
          Impact at a glance
        </h2>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.value} className="flex flex-col-reverse justify-end gap-2 border-l-2 border-accent pl-4">
              <dt className="text-sm leading-snug text-muted">{metric.label}</dt>
              <dd className="font-mono text-lg font-bold tracking-tight whitespace-nowrap">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
