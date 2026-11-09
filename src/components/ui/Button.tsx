import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

/*
 * The offset "stacked" button is a nod to the original site's identity,
 * rebuilt as a single box-shadow with short transitions (no duplicated spans).
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 border-2 px-5 py-2.5 font-mono text-sm font-semibold tracking-tight " +
  "transition-[transform,box-shadow] duration-150 ease-out shadow-[4px_4px_0_var(--shadow)] " +
  "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--shadow)] " +
  "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border-accent bg-accent text-on-accent",
  secondary: "border-fg bg-surface text-fg",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

export function ButtonLink({ variant, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      {children}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
