import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import AuthFrame from "../components/auth/AuthFrame";
import AuthLayout from "../components/auth/AuthLayout";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgotPassword from "../components/auth/ForgotPassword";
import { useCooldown } from "../lib/useCooldown";
import { wipeThen } from "../lib/wipe";
// Stylesheets last, so the responsive rules override the page styles
import "../components/auth/auth.css";
import "../components/auth/responsive.css";

export function Login() {
  const nav = useNavigate();
  const [view, setView] = useState("signin"); // "signin" | "forgot"
  const go = (next) => next !== view && wipeThen(() => setView(next));

  return (
    <AuthLayout pageKey={view}>
      {view === "signin" ? (
        <SignIn
          onSignUp={() => wipeThen(() => nav("/signup"))}
          onForgot={() => go("forgot")}
          onSuccess={() => nav("/dashboard")}
        />
      ) : (
        <ForgotPassword onBackToSignIn={() => go("signin")} />
      )}
    </AuthLayout>
  );
}

export function Signup() {
  const nav = useNavigate();
  return (
    <AuthLayout pageKey="signup">
      <SignUp onSignIn={() => wipeThen(() => nav("/login"))} onSuccess={() => nav("/verify")} />
    </AuthLayout>
  );
}

export function Verify() {
  return (
    <AuthFrame title="Check your inbox" sub="A verification link is on its way. Click it, then come back and your map is waiting." footer={<>Wrong address? <Link to="/signup" className="font-bold text-teal-800 underline dark:text-teal-300">Start over</Link></>}>
      <div className="rounded-2xl border border-teal-600/20 bg-teal-50 p-4 text-[14px] text-teal-900 dark:border-teal-400/20 dark:bg-white/5 dark:text-teal-200">
        <p className="font-bold">Skipping the inbox in this prototype</p>
        <p className="mt-1">Email sending connects with the API. Continue to explore the app now:</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <BeuiButton to="/dashboard" className="flex-1">Open dashboard</BeuiButton>
        <BeuiButton to="/login" variant="ghost">Back to login</BeuiButton>
      </div>
    </AuthFrame>
  );
}

export function AuthError() {
  const [left, restart] = useCooldown(60);
  return (
    <AuthFrame title="Too many attempts" sub="Sign-in is paused to stop abuse. Try again when the timer ends." footer={<Link to="/login" className="font-bold text-teal-800 underline dark:text-teal-300">Back to login</Link>}>
      <div className="rounded-2xl border border-red-300 bg-red-50 p-5 dark:border-red-500/30 dark:bg-red-500/10">
        <BeuiBadge tone="danger">Rate limit exceeded</BeuiBadge>
        <p className="mt-2 text-[14px] font-semibold text-red-800 dark:text-red-300" role="status">
          {left > 0 ? `Retry available in ${left} seconds.` : "Press Retry now below to try again."}
        </p>
      </div>
      <div className="mt-4">
        <BeuiButton variant="ghost" className="w-full" disabled={left > 0} onClick={restart}>
          {left > 0 ? `Wait ${left}s` : "Retry now"}
        </BeuiButton>
      </div>
    </AuthFrame>
  );
}
