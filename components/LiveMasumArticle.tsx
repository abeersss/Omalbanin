"use client";

import { Locale, t } from "@/lib/i18n";
import { Masum } from "@/content/types";
import { masumeenPages, masumItemSlug } from "@/content/masumeen";
import { useLiveItems, pick } from "@/lib/useLiveItems";
import SectionBlock from "./SectionBlock";
import VerificationBadge from "./VerificationBadge";

/**
 * One of the fourteen, showing whatever the owner last saved.
 *
 * The dates panel, the biography and the teachings were all written into
 * content/masumeen.ts and rendered by a fixed layout, which put them out of the
 * dashboard's reach. They are mirrored as an ordinary record (see
 * content/masumeen.ts) whose sections are, in order: the dates panel, the
 * biography, then one section per teaching. Those sections are rendered here
 * through the same SectionBlock the rest of the site uses, so an added section
 * simply appears, and a deleted one disappears.
 *
 * A saved record wins even where a section is empty: clearing a line in the
 * dashboard has to clear it on the page, or a deletion looks like it failed.
 */
export default function LiveMasumArticle({ masum, locale }: { masum: Masum; locale: Locale }) {
  const slug = masumItemSlug(masum.slug);
  const live = useLiveItems([slug]);
  const row = live.get(slug);

  const staticItem = masumeenPages.find((p) => p.slug === slug);
  const blocks = row?.body ?? staticItem?.body ?? [];

  const name = pick(locale, row?.title_ar, row?.title_en, locale === "ar" ? masum.name_ar : masum.name_en);
  const title = pick(locale, row?.summary_ar, row?.summary_en, locale === "ar" ? masum.title_ar : masum.title_en);

  return (
    <>
      <header className="mb-8">
        <VerificationBadge status={masum.verification_status} locale={locale} />
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--ink)]">{name}</h1>
        <p className="mt-1 text-lg text-[var(--primary)]">{title}</p>
      </header>

      <div className="space-y-8">
        {blocks.map((block, i) => (
          <div key={i}>
            <SectionBlock block={block} locale={locale} compact />
          </div>
        ))}
      </div>

      {masum.occasions.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">{t(locale, "occasions_related")}</h2>
          <div className="flex flex-wrap gap-2">
            {masum.occasions.map((o, i) => (
              <span key={i} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm">
                {locale === "ar" ? o.label_ar : o.label_en}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
