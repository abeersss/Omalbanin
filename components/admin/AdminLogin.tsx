"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";

const copy = {
  ar: {
    title: "لوحة الإدارة",
    sub: "تسجيل الدخول مخصص لمالك الموقع فقط.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    forgot: "نسيت كلمة المرور؟",
    sent: "تم إرسال رابط إعادة التعيين إلى بريدك.",
    working: "جارٍ...",
    bad: "تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور.",
    needEmail: "أدخل بريدك الإلكتروني أولاً.",
  },
  en: {
    title: "Admin dashboard",
    sub: "Sign in is limited to the site owner.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    forgot: "Forgot your password?",
    sent: "A reset link has been sent to your inbox.",
    working: "Working...",
    bad: "Could not sign in. Check the email and password.",
    needEmail: "Enter your email first.",
  },
};

export default function AdminLogin({ locale }: { locale: Locale }) {
  const c = copy[locale] ?? copy.ar;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    setErr(null);
    setMsg(null);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    // Deliberately generic: a message that distinguishes "no such user" from
    // "wrong password" tells an attacker which emails are registered.
    if (error) setErr(c.bad);
  }

  async function reset() {
    const sb = getSupabase();
    if (!sb) return;
    if (!email) {
      setErr(c.needEmail);
      return;
    }
    setBusy(true);
    setErr(null);
    await sb.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/admin/`,
    });
    setBusy(false);
    setMsg(c.sent);
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="illuminated px-6 py-8">
        <h1 className="mb-1 text-2xl font-bold text-[var(--primary)]">{c.title}</h1>
        <p className="mb-6 text-sm text-[var(--ink-soft)]">{c.sub}</p>

        <form onSubmit={signIn} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.email}</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.password}</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            />
          </label>

          {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}
          {msg && <p className="text-sm text-[var(--primary)]">{msg}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {busy ? c.working : c.signIn}
          </button>
        </form>

        <button
          onClick={reset}
          disabled={busy}
          className="mt-4 w-full text-center text-xs text-[var(--ink-soft)] underline underline-offset-2"
        >
          {c.forgot}
        </button>
      </div>
    </div>
  );
}
