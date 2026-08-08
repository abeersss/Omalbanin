"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Locale, t } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";
import ContentReader from "./ContentReader";

/**
 * Bridges the statically exported pages to content edited in the admin
 * dashboard.
 *
 * Every page here is prerendered at build time from content/*.ts, so an edit
 * saved in the dashboard would otherwise never appear on the site: the row
 * lands in Supabase and the visitor keeps seeing the baked-in copy. This
 * fetches the row for the current slug after mount and, when one exists, uses
 * it instead.
 *
 * The static copy stays the first paint, so the page is still readable with no
 * network and identical to what search engines index. RLS means an anonymous
 * visitor only ever receives rows marked published, so unpublished edits stay
 * private without any check being needed here.
 */
export default function LiveReader({
  slug,
  locale,
  staticBody,
  staticPublished,
}: {
  slug: string;
  locale: Locale;
  staticBody: BodyBlock[];
  staticPublished: boolean;
}) {
  const [body, setBody] = useState<BodyBlock[]>(staticBody);
  const [published, setPublished] = useState(staticPublished);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let cancelled = false;

    sb.from("content_items")
      .select("body, published")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return;
        // Once a row exists it is authoritative, including when its body is
        // empty. Falling back to the static copy on an empty array would make
        // deleting a section look like it silently failed, since the removed
        // block would reappear on the live page.
        if (Array.isArray(data.body)) setBody(data.body as BodyBlock[]);
        setPublished(Boolean(data.published));
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!published) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--ink-soft)]">
        {t(locale, "coming_soon")}
      </div>
    );
  }

  return <ContentReader slug={slug} locale={locale} body={body} />;
}
