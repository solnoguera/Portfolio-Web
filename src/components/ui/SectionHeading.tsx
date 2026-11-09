interface SectionHeadingProps {
  id: string;
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="flex items-baseline gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span aria-hidden="true" className="font-mono text-base font-semibold text-accent sm:text-lg">
          {index}.
        </span>
        {title}
      </h2>
      {description && <p className="mt-3 text-lg text-muted">{description}</p>}
    </div>
  );
}
