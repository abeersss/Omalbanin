import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { ContentItem } from "@/content/types";
import VerificationBadge from "./VerificationBadge";

export default function ContentCard({ item, locale, href }: { item: ContentItem; locale: Locale; href: string }) {
  const title = locale === "ar" ? item.title_ar : item.title_en;
  const summary = locale === "ar" ? item.summary_ar : item.summary_en;

  return (
    <Link
      href={item.published ? href : "#"}
      className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
        !item.published ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--primary)]">{title}</h3>
        {item.reading_time_minutes && (
          <span className="shrink-0 text-xs text-[var(--ink-soft)]">
            {item.reading_time_minutes} {t(locale, "reading_time")}
          </span>
        )}
      </div>
      {summary && <p className="mb-4 line-clamp-2 text-sm text-[var(--ink-soft)]">{summary}</p>}
      <div className="mt-auto flex items-center justify-between gap-2">
        <VerificationBadge status={item.verification_status} locale={locale} />
        <span className="text-sm font-medium text-[var(--primary)]">
          {item.published ? t(locale, "read") : t(locale, "coming_soon")} {item.published ? (locale === "ar" ? "←" : "→") : ""}
        </span>
      </div>
    </Link>
  );
}
