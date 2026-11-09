import type { AnchorHTMLAttributes } from "react";
import { Icon } from "./Icon";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  showIcon?: boolean;
}

/** Opens in a new tab and says so to screen reader users. */
export function ExternalLink({ children, showIcon = true, className = "", ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      {showIcon && <Icon name="external" size={14} className="ml-1 inline-block align-[-1px]" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
