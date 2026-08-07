"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminApp({ locale }: { locale: Locale }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setReady(true);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
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

  if (!ready) {
    return (
      <p className="px-4 py-16 text-center text-[var(--ink-soft)]">
        {locale === "ar" ? "جارٍ التحميل..." : "Loading..."}
      </p>
    );
  }

  return session ? <AdminDashboard session={session} locale={locale} /> : <AdminLogin locale={locale} />;
}
