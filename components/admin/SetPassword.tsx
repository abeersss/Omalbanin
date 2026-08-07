"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";

const copy = {
  ar: {
    title: "تعيين كلمة المرور",
    sub: "اختر كلمة مرور جديدة لحسابك، ثم استخدمها في كل مرة تدخل فيها.",
    password: "كلمة المرور الجديدة",
    confirm: "تأكيد كلمة المرور",
    save: "حفظ كلمة المرور",
    working: "جارٍ الحفظ...",
    mismatch: "الحقلان غير متطابقين.",
    tooShort: "كلمة المرور يجب أن تكون ٨ أحرف على الأقل.",
    failed: "تعذر حفظ كلمة المرور. قد يكون الرابط منتهي الصلاحية، اطلب رابطاً جديداً.",
    done: "تم حفظ كلمة المرور. يمكنك الآن استخدامها لتسجيل الدخول.",
  },
  en: {
    title: "Set your password",
    sub: "Choose a new password for your account, then use it every time you sign in.",
    password: "New password",
    confirm: "Confirm password",
    save: "Save password",
    working: "Saving...",
    mismatch: "The two fields do not match.",
    tooShort: "Password must be at least 8 characters.",
    failed: "Could not save the password. The link may have expired; request a new one.",
    done: "Password saved. You can now use it to sign in.",
  },
};

export default function SetPassword({ locale }: { locale: Locale }) {
  const c = copy[locale] ?? copy.ar;
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (pw.length < 8) {
      setErr(c.tooShort);
      return;
    }
    if (pw !== pw2) {
      setErr(c.mismatch);
      return;
    }
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) {
      setErr(c.failed);
      return;
    }
    // Clear the recovery token out of the address bar so a refresh or a shared
    // URL cannot replay it.
    window.history.replaceState({}, "", window.location.pathname);
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="illuminated px-6 py-8">
        <h1 className="mb-1 text-2xl font-bold text-[var(--primary)]">{c.title}</h1>
        <p className="mb-6 text-sm text-[var(--ink-soft)]">{c.sub}</p>

        {done ? (
          <p className="rounded-lg border border-[var(--primary)] px-4 py-3 text-sm text-[var(--primary)]">
            {c.done}
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.password}</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.confirm}</span>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
              />
            </label>

            {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {busy ? c.working : c.save}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
