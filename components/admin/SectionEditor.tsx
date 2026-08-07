"use client";

import { BodyBlock } from "@/content/types";
import { Locale } from "@/lib/i18n";

const copy = {
  ar: {
    section: "قسم",
    heading: "عنوان القسم",
    textAr: "النص العربي",
    textEn: "الترجمة الإنجليزية (اختياري)",
    note: "ملاحظة أو إرشاد (اختياري)",
    noteHint: "تظهر فوق النص بخط صغير، وليست جزءاً من النص الديني.",
    repeat: "عدد التكرار",
    repeatHint: "اتركه فارغاً إذا لم يكن القسم مكرراً.",
    up: "أعلى",
    down: "أسفل",
    remove: "حذف القسم",
    empty: "فارغ",
    filled: "مكتوب",
    confirmRemove: "حذف هذا القسم نهائياً؟",
  },
  en: {
    section: "Section",
    heading: "Section heading",
    textAr: "Arabic text",
    textEn: "English translation (optional)",
    note: "Note or guidance (optional)",
    noteHint: "Shown above the text in small type. Not part of the religious text.",
    repeat: "Repeat count",
    repeatHint: "Leave blank if the section is not repeated.",
    up: "Up",
    down: "Down",
    remove: "Delete section",
    empty: "Empty",
    filled: "Written",
    confirmRemove: "Delete this section permanently?",
  },
};

export default function SectionEditor({
  blocks,
  locale,
  onChange,
}: {
  blocks: BodyBlock[];
  locale: Locale;
  onChange: (next: BodyBlock[]) => void;
}) {
  const c = copy[locale] ?? copy.ar;

  function update(i: number, patch: Partial<BodyBlock>) {
    const next = blocks.map((b, idx) => (idx === i ? { ...b, ...patch } : b));
    // awaitingText is derived from whether Arabic text exists, so the reader's
    // placeholder disappears the moment real text is entered and comes back if
    // it is cleared. Keeping it manual would let the two drift apart.
    if (patch.text_ar !== undefined) {
      next[i].awaitingText = !patch.text_ar.trim();
    }
    onChange(next);
  }

  function move(i: number, delta: number) {
    const j = i + delta;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function remove(i: number) {
    if (!window.confirm(c.confirmRemove)) return;
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        const written = Boolean(b.text_ar?.trim());
        return (
          <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--ink-soft)]">
                  {c.section} {i + 1}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    written
                      ? "bg-[var(--primary)] text-white"
                      : "border border-dashed border-[var(--border)] text-[var(--ink-soft)]"
                  }`}
                >
                  {written ? c.filled : c.empty}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                  className="rounded border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-30">
                  {c.up}
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}
                  className="rounded border border-[var(--border)] px-2 py-1 text-xs disabled:opacity-30">
                  {c.down}
                </button>
                <button type="button" onClick={() => remove(i)}
                  className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 dark:border-red-800 dark:text-red-400">
                  {c.remove}
                </button>
              </div>
            </div>

            <label className="mb-3 block">
              <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.heading}</span>
              <input
                value={(locale === "ar" ? b.heading_ar : b.heading_en) ?? ""}
                onChange={(e) =>
                  update(i, locale === "ar" ? { heading_ar: e.target.value } : { heading_en: e.target.value })
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
              />
            </label>

            <label className="mb-3 block">
              <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.textAr}</span>
              <textarea
                dir="rtl"
                rows={8}
                value={b.text_ar ?? ""}
                onChange={(e) => update(i, { text_ar: e.target.value })}
                className="devotional w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base leading-loose"
              />
            </label>

            <details className="text-sm">
              <summary className="cursor-pointer text-xs text-[var(--ink-soft)]">
                {c.textEn} / {c.note} / {c.repeat}
              </summary>
              <div className="mt-3 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.textEn}</span>
                  <textarea
                    dir="ltr"
                    rows={4}
                    value={b.text_en ?? ""}
                    onChange={(e) => update(i, { text_en: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.note}</span>
                  <input
                    value={(locale === "ar" ? b.note_ar : b.note_en) ?? ""}
                    onChange={(e) =>
                      update(i, locale === "ar" ? { note_ar: e.target.value } : { note_en: e.target.value })
                    }
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                  <span className="mt-1 block text-[11px] text-[var(--ink-soft)]">{c.noteHint}</span>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.repeat}</span>
                  <input
                    type="number"
                    min={1}
                    value={b.repeat ?? ""}
                    onChange={(e) =>
                      update(i, { repeat: e.target.value ? Number(e.target.value) : undefined })
                    }
                    className="w-32 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                  <span className="mt-1 block text-[11px] text-[var(--ink-soft)]">{c.repeatHint}</span>
                </label>
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
}
