"use client";

import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribeToTheme } from "@/lib/theme";
import { Icon } from "./Icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Server snapshot is null: the theme is only known in the browser (set pre-paint by the inline script).
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => null);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex size-11 items-center justify-center text-fg transition-colors hover:text-accent ${className}`}
    >
      {/* Icons swap via CSS so the server HTML is already correct before hydration. */}
      <Icon name="moon" className="hidden dark:block" />
      <Icon name="sun" className="block dark:hidden" />
    </button>
  );
}
