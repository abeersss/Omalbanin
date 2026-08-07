"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, otherLocale } from "@/lib/i18n";

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const next = otherLocale(locale);
  const rest = pathname.split("/").slice(2).join("/");
  const href = `/${next}${rest ? "/" + rest : ""}`;

  return (
    <Link
      href={href}
      onClick={() => {
        try {
          localStorage.setItem("omalbnin-locale", next);
        } catch {}
      }}
      className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--accent-soft)] transition"
    >
      {next === "ar" ? "العربية" : "English"}
    </Link>
  );
}
