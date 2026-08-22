import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import SearchBar from "./SearchBar";
import LiveNav from "./LiveNav";

export default function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-baseline gap-2 shrink-0">
          <span className="text-xl font-bold text-[var(--primary)]">{t(locale, "siteName")}</span>
          <span className="text-xs text-[var(--ink-soft)]">{t(locale, "siteNameSub")}</span>
        </Link>

        <LiveNav locale={locale} className="mx-4 hidden items-center gap-1 text-sm lg:flex" />

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
