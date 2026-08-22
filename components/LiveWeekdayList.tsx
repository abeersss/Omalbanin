"use client";

import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { weekdayPrograms, weekdayItemSlug } from "@/content/weekday";
import { useLiveItems, pick } from "@/lib/useLiveItems";
import SectionBlock from "./SectionBlock";

/**
 * The weekday cards on the Mafatih al-Jinan page, showing the owner's edits.
 *
 * Heading and sentence come from the saved record; the practice chips stay in
 * code because they are links into the dua library rather than prose. Any
 * section added to the record in the dashboard appears under the chips.
 */
export default function LiveWeekdayList({ locale, order }: { locale: Locale; order: string[] }) {
  const live = useLiveItems(order.map(weekdayItemSlug));

  return (
    <div className="space-y-3">
      {order.map((key) => {
        const w = weekdayPrograms[key];
        const row = live.get(weekdayItemSlug(key));
        const title = pick(locale, row?.title_ar, row?.title_en, locale === "ar" ? w.title_ar : w.title_en);
        const intro = pick(locale, row?.summary_ar, row?.summary_en, locale === "ar" ? w.intro_ar : w.intro_en);
        const extra = row?.body ?? [];

        return (
          <div key={key} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{title}</h3>
              {key === "friday" && (
                <Link href={`/${locale}/friday`} className="text-sm font-medium text-[var(--primary)]">
                  {t(locale, "view_all")}
                </Link>
              )}
            </div>
            {intro && <p className="mt-1 text-sm text-[var(--ink-soft)]">{intro}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {w.practices.map((p, i) => (
                <span key={i} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
                  {locale === "ar" ? p.label_ar : p.label_en}
                </span>
              ))}
            </div>
            {extra.length > 0 && (
              <div className="mt-4 space-y-4">
                {extra.map((block, i) => (
                  <div key={i}>
                    <SectionBlock block={block} locale={locale} compact />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
