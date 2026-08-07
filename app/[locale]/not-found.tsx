import Link from "next/link";
import { t, defaultLocale } from "@/lib/i18n";

export default function LocaleNotFound() {
  const l = defaultLocale;
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl font-black text-[var(--primary)]">٤٠٤</p>
      <h1 className="mt-4 text-2xl font-bold">{t(l, "404_title")}</h1>
      <p className="mt-2 text-[var(--ink-soft)]">{t(l, "404_body")}</p>
      <Link href={`/${l}`} className="mt-6 inline-block rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white">
        {t(l, "back_home")}
      </Link>
    </div>
  );
}
