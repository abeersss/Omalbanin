import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import SearchBar from "./SearchBar";

export default function Header({ locale }: { locale: Locale }) {
  const nav = [
    { href: `/${locale}`, label: t(locale, "nav_home") },
    { href: `/${locale}/duas`, label: t(locale, "nav_duas") },
    { href: `/${locale}/ziyarat`, label: t(locale, "nav_ziyarat") },
    { href: `/${locale}/ahl-al-bayt`, label: t(locale, "nav_masumeen") },
    { href: `/${locale}/mafatih-al-jinan`, label: t(locale, "nav_mafatih") },
    { href: `/${locale}/friday`, label: t(locale, "nav_friday") },
    { href: `/${locale}/umm-al-banin`, label: t(locale, "nav_umm_al_banin") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-baseline gap-2 shrink-0">
          <span className="text-xl font-bold text-[var(--primary)]">{t(locale, "siteName")}</span>
          <span className="text-xs text-[var(--ink-soft)]">{t(locale, "siteNameSub")}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 mx-4 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 hidden md:block max-w-xs mx-auto">
          <SearchBar locale={locale} compact />
        </div>

        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitch locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <SearchBar locale={locale} compact />
      </div>
    </header>
  );
}
