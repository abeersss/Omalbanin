"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";
import SectionBlock from "./SectionBlock";

/**
 * Book-style reader.
 *
 * Pagination is done with CSS multi-column layout rather than by measuring and
 * slicing text in JS: the browser reflows the content into fixed-height columns
 * for us, which stays correct across font-size changes, Arabic shaping and
 * resizes. Turning a page just translates the column strip by one page width.
 *
 * Column flow already follows the document direction, so in RTL the first
 * column sits at the right edge and later columns extend leftwards. That is why
 * the translation sign below depends on `rtl`.
 */
export default function FlipBook({
  locale,
  body,
  fontScale,
}: {
  locale: Locale;
  body: BodyBlock[];
  fontScale: number;
}) {
  const rtl = locale === "ar";
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const [spread, setSpread] = useState(1); // columns visible at once
  const [colWidth, setColWidth] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0); // index of leftmost/first visible column
  const [height, setHeight] = useState(560);
  const [turning, setTurning] = useState(false);

  const GAP = 48;

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const strip = stripRef.current;
    if (!vp || !strip) return;

    const w = vp.clientWidth;
    const twoUp = w >= 880;
    const cols = twoUp ? 2 : 1;
    const cw = twoUp ? (w - GAP) / 2 : w;

    // Fit the book to the viewport but keep it readable on short screens.
    const h = Math.max(420, Math.min(760, window.innerHeight - 260));

    setSpread(cols);
    setColWidth(cw);
    setHeight(h);

    // scrollWidth grows by one column+gap per column of content.
    const total = Math.max(1, Math.round((strip.scrollWidth + GAP) / (cw + GAP)));
    setPageCount(total);
    setPage((p) => Math.min(p, Math.max(0, total - cols)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Font-size changes reflow the columns, so the page count must be recomputed.
  useEffect(() => {
    const id = window.setTimeout(measure, 60);
    return () => window.clearTimeout(id);
  }, [fontScale, measure]);

  const maxPage = Math.max(0, pageCount - spread);

  const go = useCallback(
    (delta: number) => {
      setPage((p) => {
        const next = Math.min(maxPage, Math.max(0, p + delta * spread));
        if (next !== p) {
          setTurning(true);
          window.setTimeout(() => setTurning(false), 420);
        }
        return next;
      });
    },
    [maxPage, spread],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
      else if (e.key === "Home") setPage(0);
      else if (e.key === "End") setPage(maxPage);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, rtl, maxPage]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    // Ignore mostly-vertical drags so page scrolling still works.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    const forward = rtl ? dx > 0 : dx < 0;
    go(forward ? 1 : -1);
  }

  const offset = useMemo(
    () => (rtl ? 1 : -1) * page * (colWidth + GAP),
    [rtl, page, colWidth],
  );

  const atStart = page === 0;
  const atEnd = page >= maxPage;

  const prevLabel = locale === "ar" ? "السابق" : "Previous";
  const nextLabel = locale === "ar" ? "التالي" : "Next";
  const pageWord = locale === "ar" ? "صفحة" : "Page";
  const ofWord = locale === "ar" ? "من" : "of";

  return (
    <div className="no-print">
      <div
        className="book-stage book-breakout relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`illuminated overflow-hidden px-6 py-7 sm:px-10 ${turning ? "page-turn-enter" : ""}`}
        >
          {/* Spine shadow for the two-page spread */}
          {spread === 2 && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-8 start-1/2 w-8 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.10), transparent)",
              }}
            />
          )}

          <div ref={viewportRef} className="overflow-hidden" style={{ height }}>
            <div
              ref={stripRef}
              className="book-page-inner devotional transition-transform duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{
                height,
                columnWidth: colWidth ? `${colWidth}px` : undefined,
                columnGap: `${GAP}px`,
                columnFill: "auto",
                transform: `translateX(${offset}px)`,
                fontSize: `${fontScale}em`,
              }}
            >
              {body.map((block, i) => (
                <div key={i} className="mb-6" style={{ breakInside: "avoid-column" }}>
                  <SectionBlock block={block} locale={locale} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label={prevLabel}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-35 hover:enabled:border-[var(--accent)] hover:enabled:text-[var(--accent)]"
        >
          {rtl ? "→" : "←"}
        </button>

        <div className="min-w-[7rem] text-center text-xs text-[var(--ink-soft)]" aria-live="polite">
          {pageWord} {Math.min(page + 1, pageCount)}
          {spread === 2 && page + 1 < pageCount ? `-${page + 2}` : ""} {ofWord} {pageCount}
        </div>

        <button
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label={nextLabel}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-35 hover:enabled:border-[var(--accent)] hover:enabled:text-[var(--accent)]"
        >
          {rtl ? "←" : "→"}
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={maxPage}
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        aria-label={pageWord}
        className="mx-auto mt-3 block w-full max-w-sm accent-[var(--primary)]"
      />
    </div>
  );
}
