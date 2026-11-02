/* Water-wipe transition (styles live in components/auth/auth.css).
   The overlay is added straight to <body>, so it keeps playing while React
   swaps routes (/login <-> /signup) or views (sign in <-> forgot password). */
let wiping = false;

export function wipeThen(action) {
  if (wiping) return;
  wiping = true;
  const el = document.createElement("div");
  el.className = "auth-wipe go";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  setTimeout(action, 430); // swap while the wipe fully covers the screen
  setTimeout(() => { el.remove(); wiping = false; }, 900);
}
