"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "./supabase";
import { BodyBlock, ContentType } from "@/content/types";

export interface LiveRow {
  slug: string;
  type?: ContentType;
  title_ar: string | null;
  title_en: string | null;
  summary_ar: string | null;
  summary_en: string | null;
  body: BodyBlock[] | null;
}

/**
 * Reads several editable records at once and returns them by address.
 *
 * The site is a static export, so a page is built with the wording that existed
 * at build time. Pages that show many records at once - the fourteen, the
 * weekday cards, a library listing - would otherwise need one request each.
 * This asks for the whole set in a single query after mount and hands back a
 * lookup, leaving the page to fall back to its built-in wording for anything
 * not saved yet.
 *
 * Passing `types` also brings back every published record of those types, which
 * is how a page created after the build reaches its listing.
 *
 * Row-level security hides unpublished records from visitors, so a row coming
 * back at all means it is published.
 */
export function useLiveItems(slugs: string[], types: ContentType[] = []) {
  const slugKey = slugs.join(",");
  const typeKey = types.join(",");
  const [rows, setRows] = useState<Map<string, LiveRow> | null>(null);
  const [byType, setByType] = useState<LiveRow[]>([]);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    const wantedSlugs = slugKey ? slugKey.split(",") : [];
    const wantedTypes = typeKey ? typeKey.split(",") : [];
    if (wantedSlugs.length === 0 && wantedTypes.length === 0) return;

    let cancelled = false;
    const select = "slug, type, title_ar, title_en, summary_ar, summary_en, body";

    // Two narrow queries rather than one `or(...)`: PostgREST's or-filter needs
    // the values inlined into a string, and an address containing a comma or a
    // parenthesis would break the expression.
    const bySlug = wantedSlugs.length
      ? sb.from("content_items").select(select).in("slug", wantedSlugs)
      : Promise.resolve({ data: [] as LiveRow[] });
    const byTypeQuery = wantedTypes.length
      ? sb.from("content_items").select(select).in("type", wantedTypes).eq("published", true)
      : Promise.resolve({ data: [] as LiveRow[] });

    Promise.all([bySlug, byTypeQuery]).then(([a, b]) => {
      if (cancelled) return;
      const all = [...((a.data as LiveRow[]) ?? []), ...((b.data as LiveRow[]) ?? [])];
      setRows(new Map(all.map((r) => [r.slug, r])));
      setByType(((b.data as LiveRow[]) ?? []));
    });

    return () => {
      cancelled = true;
    };
    // Compared by the addresses themselves: the caller builds a fresh array on
    // every render, so comparing the arrays by identity would refetch endlessly.
  }, [slugKey, typeKey]);

  return useMemo(
    () => ({
      /** The saved record for an address, or undefined while loading or unsaved. */
      get: (slug: string) => rows?.get(slug),
      /** Every published record of the requested types. */
      ofTypes: () => byType,
      loaded: rows !== null,
    }),
    [rows, byType],
  );
}

/** Picks the reader's language, falling back to Arabic so a record filled in
 *  only once still shows on the English side rather than going blank. */
export function pick(locale: string, ar: string | null | undefined, en: string | null | undefined, fallback: string) {
  const chosen = locale === "ar" ? ar : en ?? ar;
  return chosen === null || chosen === undefined ? fallback : chosen;
}
