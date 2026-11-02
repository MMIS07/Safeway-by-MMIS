import { useSyncExternalStore } from "react";

const KEY = "sp-theme";
const EVT = "safeway:theme";
export const THEME_MODES = ["light", "dark"];

// First visit (or an old saved "system" value): start from the device's preference once,
// then the visitor's own choice is remembered.
function read() {
  try {
    const saved = localStorage.getItem(KEY);
    if (THEME_MODES.includes(saved)) return saved;
  } catch {
    /* private mode: fall through to the device preference */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let mode = read();

function apply() {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark"); // Tailwind darkMode: "class"
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode;
}

function notify() {
  window.dispatchEvent(new Event(EVT));
}

// Apply as soon as this module loads
apply();
window.addEventListener("storage", (e) => {
  if (e.key === KEY) { mode = read(); apply(); notify(); }
});

export function setThemeMode(next) {
  mode = next === "dark" ? "dark" : "light";
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* private mode: preference lasts for the session */
  }
  apply();
  notify();
}

/** The mode a one-click toggle moves to: light <-> dark. */
export const nextThemeMode = (m) => (m === "dark" ? "light" : "dark");

function subscribe(cb) {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
}

/** Kept so existing imports keep working. The theme is applied by this module, so the provider just renders children. */
export function ThemeProvider({ children }) {
  return <>{children}</>;
}

/** { mode: "light" | "dark", resolved: "light" | "dark", setMode } (resolved equals mode, kept for existing callers) */
export function useTheme() {
  const current = useSyncExternalStore(subscribe, () => mode, () => "light");
  return { mode: current, resolved: current, setMode: setThemeMode };
}
