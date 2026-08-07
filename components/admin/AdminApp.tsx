"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import SetPassword from "./SetPassword";

/** Supabase returns auth results in the URL fragment, both on success
 *  (type=recovery) and on failure (error=access_denied&error_code=otp_expired).
 *  Reading it here means an expired link explains itself instead of silently
 *  dumping the visitor on a page that looks like nothing happened. */
function readHash(): { recovery: boolean; error: string | null } {
  if (typeof window === "undefined") return { recovery: false, error: null };
  const h = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const code = h.get("error_code");
  const desc = h.get("error_description");
  return {
    recovery: h.get("type") === "recovery",
    error: code ? `${code}${desc ? `: ${desc.replace(/\+/g, " ")}` : ""}` : null,
  };
}

export default function AdminApp({ locale }: { locale: Locale }) {
  const [session, setSession] = useState<Session | null>(null);
  const [recovering, setRecovering] = useState(false);
  const [hashError, setHashError] = useState<string | null>(null);
  const [ready, setReady] = useState(!supabaseConfigured);

  useEffect(() => {
    // Read after mount, not in a lazy initializer: this is a static export, so
    // the prerendered HTML is produced without a URL fragment (the server never
    // receives one). Deriving this during render would disagree with the server
    // markup and break hydration.
    const { recovery, error } = readHash();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (error) setHashError(error);
    if (recovery) setRecovering(true);

    const sb = getSupabase();
    if (!sb) return;

    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });

    const { data: sub } = sb.auth.onAuthStateChange((event, s) => {
      setSession(s);
      // Fired when the user arrives from a password-reset email. They have a
      // valid session at this point but still have no password they know, so
      // send them to SetPassword rather than straight into the dashboard.
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      if (event === "SIGNED_OUT") setRecovering(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center text-sm text-[var(--ink-soft)]">
        {locale === "ar"
          ? "لوحة الإدارة غير مهيأة في هذه النسخة."
          : "The admin dashboard is not configured in this build."}
      </div>
    );
  }

  if (hashError) {
    const expired = hashError.startsWith("otp_expired");
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="illuminated px-6 py-8 text-center">
          <p className="mb-2 font-semibold text-[var(--ink)]">
            {locale === "ar"
              ? expired
                ? "انتهت صلاحية الرابط"
                : "تعذر استخدام الرابط"
              : expired
                ? "This link has expired"
                : "This link could not be used"}
          </p>
          <p className="mb-5 text-sm text-[var(--ink-soft)]">
            {locale === "ar"
              ? "روابط إعادة التعيين صالحة لفترة قصيرة، ولمرة واحدة. اطلب رابطاً جديداً من صفحة الدخول."
              : "Reset links are short-lived and single-use. Request a new one from the sign-in page."}
          </p>
          <button
            onClick={() => {
              window.location.hash = "";
              setHashError(null);
            }}
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white"
          >
            {locale === "ar" ? "العودة إلى تسجيل الدخول" : "Back to sign in"}
          </button>
          <p className="mt-4 text-[11px] text-[var(--ink-soft)] opacity-70">{hashError}</p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <p className="px-4 py-16 text-center text-[var(--ink-soft)]">
        {locale === "ar" ? "جارٍ التحميل..." : "Loading..."}
      </p>
    );
  }

  if (session && recovering) return <SetPassword locale={locale} />;

  return session ? <AdminDashboard session={session} locale={locale} /> : <AdminLogin locale={locale} />;
}
