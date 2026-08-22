"use client";

import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { masumeen, masumItemSlug } from "@/content/masumeen";
import { useLiveItems, pick } from "@/lib/useLiveItems";

/**
 * The grid of the fourteen, showing whatever the owner last saved.
 *
 * The names and titles came straight out of content/masumeen.ts, so a correction
 * meant editing code. Each card now reads its record after mount and falls back
 * to the built-in wording until something is saved.
 */
export default function LiveMasumeenGrid({ locale }: { locale: Locale }) {
  const live = useLiveItems(masumeen.map((m) => masumItemSlug(m.slug)));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {masumeen.map((m) => {
        const row = live.get(masumItemSlug(m.slug));
        const name = pick(locale, row?.title_ar, row?.title_en, locale === "ar" ? m.name_ar : m.name_en);
        const title = pick(locale, row?.summary_ar, row?.summary_en, locale === "ar" ? m.title_ar : m.title_en);
        return (
          <Link
            key={m.slug}
            href={`/${locale}/ahl-al-bayt/${m.slug}`}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="mb-1 text-xs font-semibold text-[var(--accent)]">
              {locale === "ar" ? m.order : `#${m.order}`}
            </span>
            <h3 className="font-bold text-[var(--ink)] group-hover:text-[var(--primary)]">{name}</h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{title}</p>
            <span className="mt-4 text-sm font-medium text-[var(--primary)]">
              {t(locale, "read_more")} {locale === "ar" ? "←" : "→"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
