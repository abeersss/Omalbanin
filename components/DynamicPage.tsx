"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { Locale, t, defaultLocale, locales } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";
import SectionBlock from "./SectionBlock";
import BrandMark from "./BrandMark";

type Row = {
  slug: string;
  title_ar: string | null;
  title_en: string | null;
  summary_ar: string | null;
  summary_en: string | null;
  body: BodyBlock[];
  published: boolean;
};

/**
 * Renders pages created in the admin dashboard after the site was built.
 *
 * A static export only contains files generated at build time, so a page the
 * owner adds later has no HTML on the server and the request 404s. Apache is
 * configured to serve this page for any unmatched address, so it reads the
 * address, looks for a matching row, and renders it. If nothing matches it
 * behaves as a normal 404.
 *
 * Row-level security means an unpublished page returns nothing to a visitor, so
 * drafts stay private without a check being needed here.
 */
export default function DynamicPage() {
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");
  const [row, setRow] = useState<Row | null>(null);
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Read after mount rather than during render: this is a static export, so
    // the prerendered HTML is produced without knowledge of the address, and
    // deriving it during render would disagree with the server markup.
    const parts = window.location.pathname.split("/").filter(Boolean);
    const maybeLocale = parts[0] as Locale;
    const loc = locales.includes(maybeLocale) ? maybeLocale : defaultLocale;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(loc);

    const slug = parts[parts.length - 1] ?? "";
    const sb = getSupabase();
    if (!sb || !slug) {
      setState("missing");
      return;
    }

    let cancelled = false;
    sb.from("content_items")
      .select("slug, title_ar, title_en, summary_ar, summary_en, body, published")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (data) {
          setRow(data as Row);
          setState("found");
        } else {
          setState("missing");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <BrandMark size={44} spinning className="mx-auto" />
        <div className="mx-auto mt-4 h-8 w-56 animate-pulse rounded-full bg-[var(--border)]" />
      </div>
    );
  }

  if (state === "missing" || !row) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-6xl font-black text-[var(--primary)]">٤٠٤</p>
        <h1 className="mt-4 text-2xl font-bold">{t(locale, "404_title")}</h1>
        <p className="mt-2 text-[var(--ink-soft)]">{t(locale, "404_body")}</p>
        <Link
          href={`/${locale}`}
          className="mt-6 inline-block rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white"
        >
          {t(locale, "back_home")}
        </Link>
      </div>
    );
  }

  const title = (locale === "ar" ? row.title_ar : row.title_en) || row.title_ar || row.slug;
  const summary = locale === "ar" ? row.summary_ar : row.summary_en;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--ink)]">{title}</h1>
        {summary && <p className="mt-3 text-[var(--ink-soft)]">{summary}</p>}
      </header>
      <article className="devotional space-y-8">
        {(row.body ?? []).map((block, i) => (
          <div key={i}>
            <SectionBlock block={block} locale={locale} />
          </div>
        ))}
      </article>
    </div>
  );
}
