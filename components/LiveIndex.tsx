"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";
import { ContentItem, ContentType } from "@/content/types";
import ContentCard from "./ContentCard";

type Row = {
  slug: string;
  type: ContentType;
  title_ar: string | null;
  title_en: string | null;
  summary_ar: string | null;
  summary_en: string | null;
};

/**
 * Adds pages created in the admin dashboard to a listing that was generated at
 * build time.
 *
 * The listing pages are static, so a page the owner adds later is reachable at
 * its own address but would otherwise be invisible here until the next build.
 * This reads the rows of the same type after mount and renders the ones the
 * static list does not already contain. Row-level security hides drafts from
 * visitors, so nothing unpublished appears.
 *
 * Render it inside the listing's grid so the extra cards line up with the rest.
 */
export default function LiveIndex({
  types,
  knownSlugs,
  locale,
  hrefBase,
}: {
  types: ContentType[];
  knownSlugs: string[];
  locale: Locale;
  hrefBase: string;
}) {
  const [extra, setExtra] = useState<ContentItem[]>([]);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    const known = new Set(knownSlugs);

    let cancelled = false;
    sb.from("content_items")
      .select("slug, type, title_ar, title_en, summary_ar, summary_en, published")
      .in("type", types)
      .eq("published", true)
      .then(({ data }) => {
        if (cancelled || !data) return;
        const rows = (data as unknown as Row[]).filter((r) => !known.has(r.slug));
        if (rows.length === 0) return;
        setExtra(
          rows.map((r) => ({
            id: r.slug,
            slug: r.slug,
            type: r.type,
            title_ar: r.title_ar ?? r.slug,
            title_en: r.title_en ?? r.title_ar ?? r.slug,
            summary_ar: r.summary_ar ?? undefined,
            summary_en: r.summary_en ?? undefined,
            body: [],
            published: true,
            // Pages written by the site owner carry no automated source check,
            // so they are labelled the way the editor labels owner-entered text
            // rather than claiming a verification that never happened.
            verification_status: "needs_verification",
          })),
        );
      });

    return () => {
      cancelled = true;
    };
    // knownSlugs is a fresh array on every render of the server-rendered
    // parent, so it is compared by content rather than identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types.join(","), knownSlugs.join(",")]);

  return (
    <>
      {extra.map((item) => (
        <ContentCard key={item.slug} item={item} locale={locale} href={`${hrefBase}/${item.slug}`} />
      ))}
    </>
  );
}
