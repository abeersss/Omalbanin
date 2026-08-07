"use client";

import { useEffect, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import { BodyBlock } from "@/content/types";
import FlipBook from "./FlipBook";
import SectionBlock from "./SectionBlock";

const FONT_STEPS = [0.9, 1, 1.15, 1.3, 1.5];
type ReadMode = "scroll" | "book";

export default function ContentReader({
  slug,
  locale,
  body,
}: {
  slug: string;
  locale: Locale;
  body: BodyBlock[];
}) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<ReadMode>("scroll");
  const [bookmarked, setBookmarked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Post-mount localStorage reads - see Counter.tsx for why these run in an
    // effect instead of a useState lazy initializer.
    const savedStep = Number(localStorage.getItem("omalbnin-reader-fontstep") ?? 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(Number.isFinite(savedStep) ? savedStep : 1);
    const savedMode = localStorage.getItem("omalbnin-reader-mode");
    if (savedMode === "book" || savedMode === "scroll") setMode(savedMode);
    const bm = JSON.parse(localStorage.getItem("omalbnin-bookmarks") || "[]");
    const fav = JSON.parse(localStorage.getItem("omalbnin-favorites") || "[]");
    setBookmarked(bm.includes(slug));
    setFavorited(fav.includes(slug));

    function onScroll() {
      const el = document.getElementById("reader-article");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  function changeStep(delta: number) {
    const next = Math.min(FONT_STEPS.length - 1, Math.max(0, step + delta));
    setStep(next);
    localStorage.setItem("omalbnin-reader-fontstep", String(next));
  }

  function changeMode(next: ReadMode) {
    setMode(next);
    localStorage.setItem("omalbnin-reader-mode", next);
  }

  function toggle(key: "omalbnin-bookmarks" | "omalbnin-favorites", setter: (v: boolean) => void) {
    const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    const has = list.includes(slug);
    const next = has ? list.filter((s) => s !== slug) : [...list, slug];
    localStorage.setItem(key, JSON.stringify(next));
    setter(!has);
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 mb-6 border-b border-[var(--border)] bg-[var(--bg)]/95 px-4 py-2.5 backdrop-blur no-print">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <div
            className="h-full bg-[var(--primary)] transition-all"
            style={{ width: mode === "scroll" ? `${progress}%` : "0%" }}
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <div className="flex rounded-full border border-[var(--border)] p-0.5" role="group" aria-label={t(locale, "read_mode")}>
            {(["scroll", "book"] as const).map((m) => (
              <button
                key={m}
                onClick={() => changeMode(m)}
                aria-pressed={mode === m}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  mode === m
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {m === "book" ? "📖 " : "☰ "}
                {t(locale, m === "book" ? "read_mode_book" : "read_mode_scroll")}
              </button>
            ))}
          </div>
          <span className="mx-1 h-4 w-px bg-[var(--border)]" />
          <span className="text-[var(--ink-soft)] text-xs">{t(locale, "font_size")}</span>
          <button onClick={() => changeStep(-1)} className="h-8 w-8 rounded-full border border-[var(--border)] hover:bg-[var(--accent-soft)]" aria-label="A-">
            A−
          </button>
          <button onClick={() => changeStep(1)} className="h-8 w-8 rounded-full border border-[var(--border)] hover:bg-[var(--accent-soft)]" aria-label="A+">
            A+
          </button>
          <span className="mx-1 h-4 w-px bg-[var(--border)]" />
          <button
            onClick={() => toggle("omalbnin-bookmarks", setBookmarked)}
            className={`rounded-full border px-3 py-1.5 text-xs ${bookmarked ? "border-[var(--primary)] text-[var(--primary)]" : "border-[var(--border)]"}`}
          >
            {bookmarked ? "✓ " : ""}
            {t(locale, "bookmark")}
          </button>
          <button
            onClick={() => toggle("omalbnin-favorites", setFavorited)}
            className={`rounded-full border px-3 py-1.5 text-xs ${favorited ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)]"}`}
          >
            {favorited ? "♥ " : "♡ "}
            {t(locale, "favorite")}
          </button>
          <button onClick={share} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs">
            {t(locale, "share")}
          </button>
          <button onClick={copyLink} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs">
            {copied ? "✓" : t(locale, "copy_link")}
          </button>
          <button onClick={() => window.print()} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs">
            {t(locale, "print")}
          </button>
        </div>
      </div>

      {mode === "book" && <FlipBook locale={locale} body={body} fontScale={FONT_STEPS[step]} />}

      <article
        id="reader-article"
        style={{ fontSize: `${FONT_STEPS[step]}em` }}
        className={`devotional space-y-8 ${mode === "book" ? "hidden print:block" : ""}`}
      >
        {body.map((block, i) => (
          <div key={i}>
            <SectionBlock block={block} locale={locale} />
          </div>
        ))}
      </article>
    </div>
  );
}
