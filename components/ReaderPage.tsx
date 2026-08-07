import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { ContentItem } from "@/content/types";
import ContentReader from "./ContentReader";
import VerificationBadge from "./VerificationBadge";

export default function ReaderPage({
  item,
  locale,
  backHref,
  backLabel,
}: {
  item: ContentItem;
  locale: Locale;
  backHref: string;
  backLabel: string;
}) {
  const l = locale;
  const title = l === "ar" ? item.title_ar : item.title_en;
  const summary = l === "ar" ? item.summary_ar : item.summary_en;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={backHref} className="mb-6 inline-block text-sm text-[var(--ink-soft)] hover:text-[var(--primary)]">
        {l === "ar" ? "→" : "←"} {backLabel}
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <VerificationBadge status={item.verification_status} locale={l} />
          {item.reading_time_minutes && (
            <span className="text-xs text-[var(--ink-soft)]">
              {item.reading_time_minutes} {t(l, "reading_time")}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--ink)]">{title}</h1>
        {summary && <p className="mt-3 text-[var(--ink-soft)]">{summary}</p>}
        {item.source && (
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            <span className="font-semibold">{t(l, "source")}:</span> {l === "ar" ? item.source.name_ar : item.source.name_en}
            {item.source.reference ? ` — ${item.source.reference}` : ""}
          </p>
        )}
      </header>

      {item.published ? (
        <ContentReader slug={item.slug} locale={l} body={item.body} />
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--ink-soft)]">
          {t(l, "coming_soon")}
        </div>
      )}

      {item.related_content && item.related_content.length > 0 && (
        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <p className="mb-3 text-sm font-semibold">{t(l, "related")}</p>
        </div>
      )}
    </div>
  );
}
