// true  = Safe Path pages cover the whole screen (hides AppShell chrome on these pages)
// false = pages render inside AppShell's content area
const FULLSCREEN = true;

export default function AuthLayout({ pageKey, children }) {
  return (
    <div className={FULLSCREEN ? "auth-full" : undefined}>
      <div className="auth-page" key={pageKey}>{children}</div>
    </div>
  );
}
