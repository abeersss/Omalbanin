"use client";

import { Locale } from "@/lib/i18n";
import { ContentItem, ContentType } from "@/content/types";
import { useLiveItems, pick } from "@/lib/useLiveItems";
import ContentCard from "./ContentCard";

/**
 * A library listing that reflects what the owner has actually saved.
 *
 * The listing pages are generated at build time, so each card carried the
 * wording and the published flag that were in the code. A dua whose text the
 * owner had since written and published still showed as "coming soon" and could
 * not even be opened, while the text sat on its own page perfectly readable.
 * That is the bug this fixes.
 *
 * After mount it asks for the saved records - both the ones matching this
 * listing and any of the same type created later - and re-renders each card
 * from them. Row-level security keeps drafts out, so a record the owner has not
 * published yet simply does not come back and the card keeps its built-in
 * state.
 */
export default function LiveCardGrid({
  items,
  types,
  locale,
  hrefBase,
}: {
  items: ContentItem[];
  types: ContentType[];
  locale: Locale;
  hrefBase: string;
}) {
  const live = useLiveItems(items.map((i) => i.slug), types);

  const merged = items.map((item) => {
    const row = live.get(item.slug);
    if (!row) return item;
    return {
      ...item,
      title_ar: pick("ar", row.title_ar, row.title_en, item.title_ar),
      title_en: pick("en", row.title_ar, row.title_en, item.title_en),
      summary_ar: pick("ar", row.summary_ar, row.summary_en, item.summary_ar ?? ""),
      summary_en: pick("en", row.summary_ar, row.summary_en, item.summary_en ?? ""),
      // A record that came back at all is published: unpublished rows are
      // hidden from visitors by row-level security, so its presence is the
      // proof. This is what makes a finished dua open instead of staying
      // greyed out as "coming soon".
      published: true,
    };
  });

  const known = new Set(items.map((i) => i.slug));
  const extra = live.ofTypes().filter((r) => !known.has(r.slug));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {merged.map((item) => (
        <ContentCard key={item.slug} item={item} locale={locale} href={`${hrefBase}/${item.slug}`} />
      ))}
      {extra.map((r) => (
        <ContentCard
          key={r.slug}
          item={
            {
              id: r.slug,
              slug: r.slug,
              type: types[0],
              title_ar: r.title_ar ?? r.slug,
              title_en: r.title_en ?? r.title_ar ?? r.slug,
              summary_ar: r.summary_ar ?? undefined,
              summary_en: r.summary_en ?? undefined,
              body: [],
              published: true,
              // Written by the owner, so it carries no automated source check.
              verification_status: "needs_verification",
            } as ContentItem
          }
          locale={locale}
          href={`${hrefBase}/${r.slug}`}
        />
      ))}
    </div>
  );
}
