import { useEffect, useSyncExternalStore } from "react";

const KEY = "lang";
const EVT = "safeway:lang";

function read() {
  try { return localStorage.getItem(KEY) === "bn" ? "bn" : "en"; } catch { return "en"; }
}

let current = read();

function subscribe(cb) {
  const onStorage = () => { current = read(); cb(); }; // another tab changed it
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setLang(next) {
  current = next === "bn" ? "bn" : "en";
  try { localStorage.setItem(KEY, current); } catch { /* storage blocked */ }
  window.dispatchEvent(new Event(EVT));
}

/** Returns [lang, setLang]. Every component using it re-renders when the language changes. */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, () => current, () => "en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return [lang, setLang];
}
