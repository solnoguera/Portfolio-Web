export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="border border-border bg-bg px-2.5 py-1 font-mono text-xs font-medium text-fg">
          {item}
        </li>
      ))}
    </ul>
  );
}
