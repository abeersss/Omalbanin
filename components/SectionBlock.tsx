import dynamic from "next/dynamic";
import { Locale, t } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";

// pdf.js is large and only needed when a booklet is actually present, so it is
// loaded on demand rather than shipped with every page.
const PdfFlipBook = dynamic(() => import("./PdfFlipBook"));

/**
 * Renders one body block for both the scrolling reader and the flipbook, so
 * the two views can never drift apart in how they present a section.
 *
 * A section awaiting the owner's text renders an explicit placeholder rather
 * than collapsing to nothing: an empty gap reads as "there is no more text",
 * which is exactly the wrong impression for an incomplete devotional page.
 */
export default function SectionBlock({
  block,
  locale,
  compact = false,
}: {
  block: BodyBlock;
  locale: Locale;
  compact?: boolean;
}) {
  const heading = locale === "ar" ? block.heading_ar : block.heading_en ?? block.heading_ar;
  const note = locale === "ar" ? block.note_ar : block.note_en ?? block.note_ar;
  const text = locale === "ar" ? block.text_ar : block.text_en ?? block.text_ar;
  const awaiting = block.awaitingText || (block.kind === "text" && !text?.trim());

  return (
    <>
      {heading && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className={`font-bold text-[var(--primary)] ${compact ? "text-lg" : "text-xl"}`}>
            {heading}
          </h2>
          {block.repeat && (
            <span className="rounded-full border border-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
              {t(locale, "repeat_times").replace("{n}", String(block.repeat))}
            </span>
          )}
        </div>
      )}

      {note && (
        <p className="mb-3 rounded-lg border-s-2 border-[var(--accent)] bg-[var(--accent-soft)]/40 px-3 py-2 text-xs leading-relaxed text-[var(--ink-soft)]">
          {note}
        </p>
      )}

      {block.kind === "text" &&
        (awaiting ? (
          <div className="rounded-xl border border-dashed border-[var(--border)] px-4 py-6 text-center">
            <p className="text-sm font-medium text-[var(--ink-soft)]">{t(locale, "awaiting_text")}</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)] opacity-75">{t(locale, "awaiting_hint")}</p>
          </div>
        ) : (
          <p className="whitespace-pre-line text-[var(--ink)]">{text}</p>
        ))}

      {block.kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={(locale === "en" && block.imageUrl_en) || block.imageUrl}
          alt={(locale === "ar" ? block.imageAlt_ar : block.imageAlt_en) || ""}
          className="mx-auto max-w-full rounded-xl border border-[var(--border)]"
          loading="lazy"
        />
      )}

      {block.kind === "pdf" && block.pdfUrl && <PdfFlipBook url={block.pdfUrl} locale={locale} />}

      {block.kind === "embed" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <p className="mb-2 text-xs text-[var(--ink-soft)]">{t(locale, "external_embed_notice")}</p>
          <a
            href={block.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--primary)] underline underline-offset-2"
          >
            {(locale === "ar" ? block.embedLabel_ar : block.embedLabel_en) || block.embedUrl}
          </a>
        </div>
      )}
    </>
  );
}
