"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { defaultNav, navHref, navLabel } from "@/lib/nav";
import { useSiteSettings } from "@/lib/useSiteSettings";

/**
 * The top menu, as arranged in the dashboard.
 *
 * It used to be a list inside the header component, so an entry could not be
 * renamed, reordered or removed without editing code. The saved arrangement
 * replaces it after mount; until then, and if nothing has been saved, the menu
 * that ships with the build is shown - which also means the links are present
 * in the HTML for a crawler that does not run scripts.
 */
export default function LiveNav({ locale, className = "" }: { locale: Locale; className?: string }) {
  const { nav } = useSiteSettings();
  const items = nav ?? defaultNav();

  return (
    <nav className={className}>
      {items.map((item, i) => (
        <Link
          key={`${item.path}-${i}`}
          href={navHref(item, locale)}
          className="rounded-full px-3 py-1.5 text-[var(--ink-soft)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
        >
          {navLabel(item, locale)}
        </Link>
      ))}
    </nav>
  );
}
