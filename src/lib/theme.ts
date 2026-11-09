export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
/** Key used by the previous version of the site; read once so returning visitors keep their choice. */
const LEGACY_STORAGE_KEY = "current-theme";

/**
 * Runs inline in <head> before first paint: saved choice → OS preference → light.
 * Kept tiny and dependency-free; its SHA-256 is allow-listed in the CSP (netlify.toml).
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("${THEME_STORAGE_KEY}")||localStorage.getItem("${LEGACY_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.setAttribute("data-theme",t)}catch(e){}})()`;

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the theme still applies for this visit.
  }
}

/** Subscribe to data-theme changes on <html>, for useSyncExternalStore. */
export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
