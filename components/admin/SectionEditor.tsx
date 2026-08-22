"use client";

import { useState } from "react";
import { BodyBlock, FactRow } from "@/content/types";
import { Locale } from "@/lib/i18n";
import { getSupabase } from "@/lib/supabase";

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
    kind: "نوع القسم",
    kindText: "نص",
    kindImage: "صورة",
    kindEmbed: "رابط خارجي",
    kindPdf: "كتاب PDF",
    kindFacts: "جدول معلومات",
    badge: "شارة التوثيق",
    badgeNone: "بدون شارة",
    badgeOriginal: "من الموقع الأصلي",
    badgeTransmitted: "حسب المنقول",
    badgeUnverified: "حسب المصدر",
    badgePrimary: "مصدر أساسي موثق",
    factLabelAr: "العنوان (عربي)",
    factLabelEn: "العنوان (إنجليزي)",
    factValueAr: "القيمة (عربي)",
    factValueEn: "القيمة (إنجليزي)",
    addFact: "+ إضافة سطر",
    removeFact: "حذف السطر",
    headingAr: "عنوان القسم (عربي)",
    headingEn: "عنوان القسم (إنجليزي)",
    textEnFull: "النص الإنجليزي",
    noteArFull: "ملاحظة (عربي)",
    noteEnFull: "ملاحظة (إنجليزي)",
    pdfAr: "ملف PDF (العربية)",
    pdfEn: "ملف PDF (الإنجليزية) - اختياري",
    pdfEnHint: "اتركه فارغاً لاستخدام الملف العربي في اللغتين.",
    pdfHint: "بعد الرفع سيُعرض الملف ككتاب يُقلَّب، وليس كرابط تحميل.",
    uploadPdf: "رفع ملف PDF",
    removePdf: "إزالة الملف",
    imageAr: "الصورة (العربية)",
    imageEn: "الصورة (الإنجليزية) - اختياري",
    imageEnHint: "اتركها فارغة لاستخدام الصورة نفسها في اللغتين.",
    altAr: "وصف الصورة بالعربية",
    altEn: "وصف الصورة بالإنجليزية",
    upload: "رفع صورة",
    uploading: "جارٍ الرفع...",
    uploadFailed: "تعذر رفع الصورة.",
    orPasteUrl: "أو الصق رابط الصورة",
    removeImage: "إزالة الصورة",
    embedUrl: "رابط المحتوى الخارجي",
    embedLabel: "وصف الرابط",
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
    kind: "Section type",
    kindText: "Text",
    kindImage: "Image",
    kindEmbed: "External link",
    kindPdf: "PDF book",
    kindFacts: "Facts table",
    badge: "Verification badge",
    badgeNone: "No badge",
    badgeOriginal: "From the original site",
    badgeTransmitted: "As transmitted",
    badgeUnverified: "Per the source",
    badgePrimary: "Documented primary source",
    factLabelAr: "Label (Arabic)",
    factLabelEn: "Label (English)",
    factValueAr: "Value (Arabic)",
    factValueEn: "Value (English)",
    addFact: "+ Add row",
    removeFact: "Remove row",
    headingAr: "Section heading (Arabic)",
    headingEn: "Section heading (English)",
    textEnFull: "English text",
    noteArFull: "Note (Arabic)",
    noteEnFull: "Note (English)",
    pdfAr: "PDF file (Arabic)",
    pdfEn: "PDF file (English) - optional",
    pdfEnHint: "Leave empty to use the Arabic file for both languages.",
    pdfHint: "Once uploaded it is shown as a page-turning book, not a download link.",
    uploadPdf: "Upload a PDF",
    removePdf: "Remove file",
    imageAr: "Image (Arabic)",
    imageEn: "Image (English) - optional",
    imageEnHint: "Leave empty to use the same image for both languages.",
    altAr: "Image description in Arabic",
    altEn: "Image description in English",
    upload: "Upload image",
    uploading: "Uploading...",
    uploadFailed: "Could not upload the image.",
    orPasteUrl: "Or paste an image URL",
    removeImage: "Remove image",
    embedUrl: "External content URL",
    embedLabel: "Link description",
  },
};

/** Uploads into the public `media` bucket. Storage policies allow reads by
 *  anyone but writes only from an admin, so the returned URL is safe to embed
 *  in published content. */
async function uploadImage(file: File): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  // Arabic filenames would otherwise become percent-encoded object keys that
  // are painful to trace in the bucket, so the name is reduced to a safe slug
  // and made unique with a timestamp.
  const safe = file.name.replace(/[^\w.-]/g, "_");
  const path = `${Date.now()}-${safe}`;
  const { error } = await sb.storage.from("media").upload(path, file, { upsert: false });
  if (error) return null;
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

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
  const [busyAt, setBusyAt] = useState<string | null>(null);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  async function pickAndUpload(i: number, field: "imageUrl" | "imageUrl_en", file?: File) {
    if (!file) return;
    setUploadErr(null);
    setBusyAt(`${i}:${field}`);
    const url = await uploadImage(file);
    setBusyAt(null);
    if (!url) {
      setUploadErr(c.uploadFailed);
      return;
    }
    update(i, { [field]: url } as Partial<BodyBlock>);
  }

  async function pickAndUploadPdf(i: number, field: "pdfUrl" | "pdfUrl_en", file?: File) {
    if (!file) return;
    setUploadErr(null);
    setBusyAt(`${i}:${field}`);
    const url = await uploadImage(file);
    setBusyAt(null);
    if (!url) {
      setUploadErr(c.uploadFailed);
      return;
    }
    update(i, { [field]: url, kind: "pdf" } as Partial<BodyBlock>);
  }

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
        // A section counts as filled once it carries whatever its own type
        // needs, so an image or embed block is not reported as empty forever.
        const written =
          b.kind === "image"
            ? Boolean(b.imageUrl)
            : b.kind === "pdf"
              ? Boolean(b.pdfUrl || b.pdfUrl_en)
              : b.kind === "embed"
                ? Boolean(b.embedUrl)
                : b.kind === "facts"
                  ? Boolean(b.facts?.some((f) => f.value_ar || f.value_en))
                  : Boolean(b.text_ar?.trim());
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
              <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.kind}</span>
              <select
                value={b.kind}
                onChange={(e) => update(i, { kind: e.target.value as BodyBlock["kind"] })}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
              >
                <option value="text">{c.kindText}</option>
                <option value="image">{c.kindImage}</option>
                <option value="pdf">{c.kindPdf}</option>
                <option value="embed">{c.kindEmbed}</option>
                <option value="facts">{c.kindFacts}</option>
              </select>
            </label>

            {/* Only offered on text sections, where it labels a definition such
                as a row on the Sources page. */}
            {b.kind === "text" && (
              <label className="mb-3 block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.badge}</span>
                <select
                  value={b.badge ?? ""}
                  onChange={(e) =>
                    update(i, {
                      badge: (e.target.value || undefined) as BodyBlock["badge"],
                    })
                  }
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                >
                  <option value="">{c.badgeNone}</option>
                  <option value="site_original_media">{c.badgeOriginal}</option>
                  <option value="traditional_practice">{c.badgeTransmitted}</option>
                  <option value="needs_verification">{c.badgeUnverified}</option>
                  <option value="primary_source">{c.badgePrimary}</option>
                </select>
              </label>
            )}

            {/* Both languages are always shown. Previously each field followed
                the dashboard's own language, so the English side of a section
                was unreachable from the Arabic dashboard. */}
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.headingAr}</span>
                <input
                  dir="rtl"
                  value={b.heading_ar ?? ""}
                  onChange={(e) => update(i, { heading_ar: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.headingEn}</span>
                <input
                  dir="ltr"
                  value={b.heading_en ?? ""}
                  onChange={(e) => update(i, { heading_en: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
            </div>

            {b.kind === "text" && (
              <div className="mb-3 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.textAr}</span>
                  <textarea
                    dir="rtl"
                    rows={8}
                    value={b.text_ar ?? ""}
                    onChange={(e) => update(i, { text_ar: e.target.value })}
                    className="devotional w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base leading-loose"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.textEnFull}</span>
                  <textarea
                    dir="ltr"
                    rows={5}
                    value={b.text_en ?? ""}
                    onChange={(e) => update(i, { text_en: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
              </div>
            )}

            {b.kind === "facts" && (
              <div className="mb-3 space-y-3">
                {(b.facts ?? []).map((f, fi) => {
                  const patchFact = (patch: Partial<FactRow>) => {
                    const next = [...(b.facts ?? [])];
                    next[fi] = { ...next[fi], ...patch };
                    update(i, { facts: next });
                  };
                  return (
                    <div key={fi} className="rounded-lg border border-[var(--border)] p-3">
                      <div className="mb-2 grid gap-2 sm:grid-cols-2">
                        <input
                          dir="rtl"
                          placeholder={c.factLabelAr}
                          value={f.label_ar ?? ""}
                          onChange={(e) => patchFact({ label_ar: e.target.value })}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs"
                        />
                        <input
                          dir="ltr"
                          placeholder={c.factLabelEn}
                          value={f.label_en ?? ""}
                          onChange={(e) => patchFact({ label_en: e.target.value })}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs"
                        />
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          dir="rtl"
                          placeholder={c.factValueAr}
                          value={f.value_ar ?? ""}
                          onChange={(e) => patchFact({ value_ar: e.target.value })}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        />
                        <input
                          dir="ltr"
                          placeholder={c.factValueEn}
                          value={f.value_en ?? ""}
                          onChange={(e) => patchFact({ value_en: e.target.value })}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        />
                      </div>
                      <button
                        onClick={() => update(i, { facts: (b.facts ?? []).filter((_, x) => x !== fi) })}
                        className="mt-2 rounded border border-red-300 px-2 py-1 text-xs text-red-600 dark:border-red-800 dark:text-red-400"
                      >
                        {c.removeFact}
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() =>
                    update(i, {
                      facts: [...(b.facts ?? []), { label_ar: "", label_en: "", value_ar: "", value_en: "" }],
                    })
                  }
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs"
                >
                  {c.addFact}
                </button>
              </div>
            )}

            {b.kind === "pdf" && (
              <div className="mb-3 space-y-4">
                {(["pdfUrl", "pdfUrl_en"] as const).map((field) => (
                  <div key={field}>
                    <span className="mb-1 block text-xs text-[var(--ink-soft)]">
                      {field === "pdfUrl" ? c.pdfAr : c.pdfEn}
                    </span>
                    {b[field] && (
                      <p className="mb-2 break-all rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs" dir="ltr">
                        {b[field]}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent)]">
                        {busyAt === `${i}:${field}` ? c.uploading : c.uploadPdf}
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => pickAndUploadPdf(i, field, e.target.files?.[0])}
                        />
                      </label>
                      {b[field] && (
                        <button
                          type="button"
                          onClick={() => update(i, { [field]: undefined } as Partial<BodyBlock>)}
                          className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 dark:border-red-800 dark:text-red-400"
                        >
                          {c.removePdf}
                        </button>
                      )}
                    </div>
                    {field === "pdfUrl_en" && (
                      <span className="mt-1 block text-[11px] text-[var(--ink-soft)]">{c.pdfEnHint}</span>
                    )}
                  </div>
                ))}
                <span className="block text-[11px] text-[var(--ink-soft)]">{c.pdfHint}</span>
                {uploadErr && <p className="text-sm text-red-600 dark:text-red-400">{uploadErr}</p>}
              </div>
            )}

            {b.kind === "image" && (
              <div className="mb-3 space-y-4">
                {(["imageUrl", "imageUrl_en"] as const).map((field) => (
                  <div key={field}>
                    <span className="mb-1 block text-xs text-[var(--ink-soft)]">
                      {field === "imageUrl" ? c.imageAr : c.imageEn}
                    </span>
                    {b[field] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b[field]}
                        alt=""
                        className="mb-2 max-h-48 rounded-lg border border-[var(--border)]"
                      />
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent)]">
                        {busyAt === `${i}:${field}` ? c.uploading : c.upload}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => pickAndUpload(i, field, e.target.files?.[0])}
                        />
                      </label>
                      {b[field] && (
                        <button
                          type="button"
                          onClick={() => update(i, { [field]: undefined } as Partial<BodyBlock>)}
                          className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 dark:border-red-800 dark:text-red-400"
                        >
                          {c.removeImage}
                        </button>
                      )}
                    </div>
                    <input
                      placeholder={c.orPasteUrl}
                      dir="ltr"
                      value={b[field] ?? ""}
                      onChange={(e) => update(i, { [field]: e.target.value } as Partial<BodyBlock>)}
                      className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs"
                    />
                    {field === "imageUrl_en" && (
                      <span className="mt-1 block text-[11px] text-[var(--ink-soft)]">{c.imageEnHint}</span>
                    )}
                  </div>
                ))}

                {uploadErr && <p className="text-sm text-red-600 dark:text-red-400">{uploadErr}</p>}

                {(["imageAlt_ar", "imageAlt_en"] as const).map((field) => (
                  <label key={field} className="block">
                    <span className="mb-1 block text-xs text-[var(--ink-soft)]">
                      {field === "imageAlt_ar" ? c.altAr : c.altEn}
                    </span>
                    <input
                      value={b[field] ?? ""}
                      onChange={(e) => update(i, { [field]: e.target.value } as Partial<BodyBlock>)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    />
                  </label>
                ))}
              </div>
            )}

            {b.kind === "embed" && (
              <div className="mb-3 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.embedUrl}</span>
                  <input
                    dir="ltr"
                    value={b.embedUrl ?? ""}
                    onChange={(e) => update(i, { embedUrl: e.target.value })}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.embedLabel}</span>
                  <input
                    value={(locale === "ar" ? b.embedLabel_ar : b.embedLabel_en) ?? ""}
                    onChange={(e) =>
                      update(i, locale === "ar" ? { embedLabel_ar: e.target.value } : { embedLabel_en: e.target.value })
                    }
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
              </div>
            )}

            <details className="text-sm">
              <summary className="cursor-pointer text-xs text-[var(--ink-soft)]">
                {c.note} / {c.repeat}
              </summary>
              <div className="mt-3 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.noteArFull}</span>
                    <input
                      dir="rtl"
                      value={b.note_ar ?? ""}
                      onChange={(e) => update(i, { note_ar: e.target.value })}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.noteEnFull}</span>
                    <input
                      dir="ltr"
                      value={b.note_en ?? ""}
                      onChange={(e) => update(i, { note_en: e.target.value })}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <span className="block text-[11px] text-[var(--ink-soft)]">{c.noteHint}</span>
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
