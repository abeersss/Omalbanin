import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import VerificationBadge from "@/components/VerificationBadge";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/sources">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_sources"), alternates: { canonical: `/${locale}/sources` } };
}

export default async function SourcesPage(props: PageProps<"/[locale]/sources">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const rows: { status: "primary_source" | "traditional_practice" | "needs_verification" | "site_original_media"; ar: string; en: string }[] = [
    { status: "site_original_media", ar: "محتوى محفوظ حرفيًا من الموقع الأصلي omalbnin.com دون أي تعديل على النص الديني.", en: "Content preserved verbatim from the original omalbnin.com, with no edits to the religious text." },
    { status: "traditional_practice", ar: "ممارسة تعبدية متداولة شعبيًا، غير منسوبة مباشرة إلى مفاتيح الجنان أو مصدر أساسي محدد.", en: "A popularly practiced devotional tradition, not directly attributed to Mafatih al-Jinan or a specific primary source." },
    { status: "needs_verification", ar: "لم تُحقَّق نسبة هذا المحتوى أو صحة نصه بعد؛ لا يُنشر نص ديني كامل حتى يتم ذلك.", en: "This content's attribution or exact wording has not yet been verified; no full religious text is published until it is." },
    { status: "primary_source", ar: "تمت مطابقة النص مع مصدر أساسي محدد بالاسم (مثل طبعة معتمدة من مفاتيح الجنان).", en: "The text has been checked against a named primary source (e.g. a trusted Mafatih al-Jinan edition)." },
  ];
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_sources")}</h1>
      <p className="mb-6 text-[var(--ink-soft)]">
        {l === "ar"
          ? "كل نص ديني على هذا الموقع يحمل إحدى الشارات التالية:"
          : "Every religious text on this site carries one of the following badges:"}
      </p>
      <ul className="space-y-4">
        {rows.map((r, i) => (
          <li key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <VerificationBadge status={r.status} locale={l} />
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{l === "ar" ? r.ar : r.en}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
