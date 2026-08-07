"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Locale, t } from "@/lib/i18n";
import { allContent } from "@/content";
import { masumeen } from "@/content/masumeen";

/** Very light Arabic normalization: strips tashkeel/diacritics and unifies
 * alef/ya/ta-marbuta variants so search tolerates common spelling variance. */
function normalizeArabic(input: string): string {
  return input
    .replace(/[ً-ٰٟ]/g, "") // diacritics
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .toLowerCase();
}

export default function SearchBar({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    const contentItems = allContent
      .filter((c) => c.published)
      .map((c) => ({
        slug: c.slug,
        type: c.type,
        title: locale === "ar" ? c.title_ar : c.title_en,
        norm: normalizeArabic(`${c.title_ar} ${c.title_en} ${c.summary_ar ?? ""} ${c.summary_en ?? ""}`),
        href:
          c.slug === "hadith-al-kisa"
            ? `/${locale}/hadith-al-kisa`
            : c.type === "dua"
            ? `/${locale}/duas/${c.slug}`
            : c.type === "ziyara"
            ? `/${locale}/ziyarat/${c.slug}`
            : `/${locale}/collections/${c.slug}`,
      }));
    const personItems = masumeen.map((m) => ({
      slug: m.slug,
      type: "person" as const,
      title: locale === "ar" ? m.name_ar : m.name_en,
      norm: normalizeArabic(`${m.name_ar} ${m.name_en} ${m.title_ar} ${m.title_en}`),
      href: `/${locale}/ahl-al-bayt/${m.slug}`,
    }));
    return [...contentItems, ...personItems];
  }, [locale]);

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["norm", "title"], threshold: 0.35 }),
    [items]
  );

  const results = query.trim() ? fuse.search(normalizeArabic(query)).slice(0, 8) : [];

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={t(locale, "search_placeholder")}
        className={`w-full rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)] ${
          compact ? "" : "py-3 text-base"
        }`}
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-xl">
          {results.map((r) => (
            <li key={r.item.href}>
              <Link href={r.item.href} className="block px-4 py-2.5 text-sm hover:bg-[var(--accent-soft)]">
                {r.item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
