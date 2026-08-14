"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Locale } from "@/lib/i18n";
import BrandMark from "./BrandMark";

/**
 * Renders an uploaded PDF as a page-turning book.
 *
 * Pages are rasterised with pdf.js on demand rather than all at once, so a long
 * booklet does not stall the browser or pull the whole file into memory before
 * anything appears. Two pages show side by side on a wide screen and one on a
 * phone, matching the text flipbook.
 *
 * In RTL the book opens from the right, so "next" moves the reader leftwards
 * and the arrow keys are swapped to match.
 */
export default function PdfFlipBook({ url, locale }: { url: string; locale: Locale }) {
  const rtl = locale === "ar";
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(0);
  const [spread, setSpread] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docRef = useRef<any>(null);
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);

  const copy = rtl
    ? { loading: "جارٍ فتح الكتاب...", failed: "تعذر فتح الملف.", page: "صفحة", of: "من", prev: "السابق", next: "التالي", download: "تحميل PDF" }
    : { loading: "Opening the book...", failed: "Could not open this file.", page: "Page", of: "of", prev: "Previous", next: "Next", download: "Download PDF" };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ url }).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError(copy.failed);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    function onResize() {
      setSpread(window.innerWidth >= 880 ? 2 : 1);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const render = useCallback(async (canvas: HTMLCanvasElement | null, pageNum: number) => {
    const doc = docRef.current;
    if (!canvas || !doc || pageNum < 1 || pageNum > doc.numPages) {
      if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const p = await doc.getPage(pageNum);
    const base = p.getViewport({ scale: 1 });
    // Fit the page to the container, then multiply by the device pixel ratio so
    // Arabic script stays sharp rather than blurring on high-density screens.
    const targetWidth = canvas.parentElement?.clientWidth ?? 600;
    const scale = (targetWidth / base.width) * Math.min(window.devicePixelRatio || 1, 2);
    const viewport = p.getViewport({ scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    const ctx = canvas.getContext("2d");
    if (ctx) await p.render({ canvas, canvasContext: ctx, viewport }).promise;
  }, []);

  useEffect(() => {
    if (loading || error) return;
    render(rightRef.current, page + 1);
    if (spread === 2) render(leftRef.current, page + 2);
  }, [page, spread, loading, error, render]);

  const maxPage = Math.max(0, numPages - spread);
  const go = useCallback(
    (delta: number) => setPage((p) => Math.min(maxPage, Math.max(0, p + delta * spread))),
    [maxPage, spread],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, rtl]);

  const touch = useRef<{ x: number; y: number } | null>(null);

  if (loading)
    return (
      <div className="py-10 text-center">
        <BrandMark size={44} spinning className="mx-auto" />
        <p className="mt-3 text-sm text-[var(--ink-soft)]">{copy.loading}</p>
      </div>
    );
  if (error)
    return (
      <div className="rounded-xl border border-[var(--border)] p-6 text-center">
        <p className="mb-3 text-sm text-[var(--ink-soft)]">{error}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--primary)] underline">
          {copy.download}
        </a>
      </div>
    );

  return (
    <div className="no-print">
      <div
        className="book-stage book-breakout"
        onTouchStart={(e) => {
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          if (!touch.current) return;
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
          go((rtl ? dx > 0 : dx < 0) ? 1 : -1);
        }}
      >
        <div className="illuminated px-4 py-5 sm:px-6">
          <div className={`grid gap-4 ${spread === 2 ? "grid-cols-2" : "grid-cols-1"}`} dir={rtl ? "rtl" : "ltr"}>
            <div className="book-page overflow-hidden rounded-lg">
              <canvas ref={rightRef} className="block w-full" />
            </div>
            {spread === 2 && (
              <div className="book-page overflow-hidden rounded-lg">
                <canvas ref={leftRef} className="block w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label={copy.prev}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-35"
        >
          {rtl ? "→" : "←"}
        </button>
        <span className="min-w-[7rem] text-center text-xs text-[var(--ink-soft)]" aria-live="polite">
          {copy.page} {page + 1}
          {spread === 2 && page + 2 <= numPages ? `-${page + 2}` : ""} {copy.of} {numPages}
        </span>
        <button
          onClick={() => go(1)}
          disabled={page >= maxPage}
          aria-label={copy.next}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm disabled:opacity-35"
        >
          {rtl ? "←" : "→"}
        </button>
      </div>

      <div className="mt-3 text-center">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--ink-soft)] underline">
          {copy.download}
        </a>
      </div>
    </div>
  );
}
