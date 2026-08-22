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
  rowClassName = "",
}: {
  slug: string;
  locale: Locale;
  staticBody: BodyBlock[];
  className?: string;
  /** Applied to sections that carry a verification badge. A badge marks the
   *  section as one row of a labelled list, such as the Sources page, which
   *  wants each row boxed while the introduction above stays plain. */
  rowClassName?: string;
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
        <div key={i} className={`${i > 0 ? "mt-3" : ""} ${block.badge ? rowClassName : ""}`.trim()}>
          <SectionBlock block={block} locale={locale} compact />
        </div>
      ))}
    </div>
  );
}
