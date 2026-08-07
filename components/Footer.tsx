import Link from "next/link";
import { Locale, t } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const year = 2026;
  const cols = [
    {
      title: t(locale, "footer_about"),
      links: [
        { href: `/${locale}/about`, label: t(locale, "footer_about") },
        { href: `/${locale}/sources`, label: t(locale, "footer_sources") },
        { href: `/${locale}/contact`, label: t(locale, "footer_contact") },
      ],
    },
    {
      title: t(locale, "nav_more"),
      links: [
        { href: `/${locale}/occasions`, label: t(locale, "nav_occasions") },
        { href: `/${locale}/collections`, label: t(locale, "nav_collections") },
        { href: `/${locale}/hadith-al-kisa`, label: t(locale, "hadith_al_kisa") },
      ],
    },
    {
      title: t(locale, "footer_privacy"),
      links: [
        { href: `/${locale}/privacy`, label: t(locale, "footer_privacy") },
        { href: `/${locale}/disclaimer`, label: t(locale, "footer_disclaimer") },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--bg-elevated)] pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-[var(--primary)]">{t(locale, "siteName")}</p>
          <p className="mt-2 text-sm text-[var(--ink-soft)] max-w-xs">{t(locale, "tagline")}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold mb-3">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--ink-soft)] hover:text-[var(--primary)] transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 text-xs text-[var(--ink-soft)] border-t border-[var(--border)] pt-4">
        © {year} Omalbnin.com — {t(locale, "all_rights")}
      </div>
    </footer>
  );
}
