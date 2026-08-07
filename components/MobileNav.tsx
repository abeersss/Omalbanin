import Link from "next/link";
import { Locale, t } from "@/lib/i18n";

export default function MobileNav({ locale }: { locale: Locale }) {
  const items = [
    { href: `/${locale}`, label: t(locale, "nav_home"), icon: "🏠" },
    { href: `/${locale}#today`, label: t(locale, "nav_today"), icon: "📅" },
    { href: `/${locale}/duas`, label: t(locale, "nav_duas"), icon: "🤲" },
    { href: `/${locale}/ziyarat`, label: t(locale, "nav_ziyarat"), icon: "🕌" },
    { href: `/${locale}/collections`, label: t(locale, "nav_more"), icon: "☰" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg-elevated)]/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] text-[var(--ink-soft)]">
              <span className="text-lg leading-none">{it.icon}</span>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
