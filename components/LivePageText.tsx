"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";
import SectionBlock from "./SectionBlock";

/**
 * Renders the prose parts of a page (Mafatih al-Jinan, Friday, Umm al-Banin)
 * from content the owner can edit, falling back to the wording shipped in the
 * build. Same bridge as LiveReader, but for pages whose layout stays in code
 * and only the surrounding text is editable.
 */
export default function LivePageText({
  slug,
  locale,
  staticBody,
  className = "",
}: {
  slug: string;
  locale: Locale;
  staticBody: BodyBlock[];
  className?: string;
}) {
  const [body, setBody] = useState<BodyBlock[]>(staticBody);

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
        if (Array.isArray(data.body)) setBody(data.body as BodyBlock[]);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (body.length === 0) return null;

  return (
    <div className={className}>
      {body.map((block, i) => (
        <div key={i} className={i > 0 ? "mt-3" : ""}>
          <SectionBlock block={block} locale={locale} compact />
        </div>
      ))}
    </div>
  );
}
