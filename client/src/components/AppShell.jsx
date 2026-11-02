import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppShell({ children }) {
  const loc = useLocation();

  // TODO: replace with your real auth state once login exists
  const user = { name: "Safeway user" };
  const handleLogout = () => {};

  const isLanding = loc.pathname === "/";
  const isAuth = ["/login", "/signup", "/verify", "/auth-error"].includes(loc.pathname);

  if (isLanding) return <>{children}</>;

  if (isAuth) {
    return (
      <div className="min-h-screen bg-[#eef2f5] dark:bg-slate-950">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 lg:pb-0">
      {/* The only navigation: full top bar on desktop; slim top bar + bottom bar on phones */}
      <Navbar user={user} onLogout={handleLogout} />

      <main className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6">{children}</main>
    </div>
  );
}
