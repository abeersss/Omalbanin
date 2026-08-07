import Link from "next/link";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { weekdayPrograms } from "@/content/weekday";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/mafatih-al-jinan">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "mafatih_title"), alternates: { canonical: `/${locale}/mafatih-al-jinan` } };
}

const weekdayOrder = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];

export default async function MafatihPage(props: PageProps<"/[locale]/mafatih-al-jinan">) {
  const { locale } = await props.params;
  const l = locale as Locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-extrabold text-[var(--primary)]">{t(l, "mafatih_title")}</h1>
      <p className="mb-4 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "مفاتيح الجنان مرجع جامع للأدعية والزيارات وأعمال الأيام والشهور. هذا القسم هو الهيكل التنظيمي لهذا المحتوى على الموقع؛ كل عنصر يحمل توثيقًا لمصدره، وما لم نُحقق نصه بعد يظهر بوضوح كذلك بدلًا من اختلاق نص."
          : "Mafatih al-Jinan is a comprehensive reference for supplications, visitations, and the practices of days and months. This section is this site's organizing structure for that material; every item carries source documentation, and anything not yet verified is clearly marked as such rather than invented."}
      </p>
      <div className="mb-10 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-4 text-sm">
        {l === "ar"
          ? "ملاحظة: النصوص الكاملة المحققة لمعظم أدعية وزيارات مفاتيح الجنان لم تُرفع بعد إلى هذا الموقع في هذه المرحلة. توجد بنية تنظيمية كاملة جاهزة لاستقبالها."
          : "Note: fully verified text for most Mafatih al-Jinan duas and ziyarat has not been added to this site at this stage. The full organizational structure is ready to receive it."}
      </div>

      <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">{l === "ar" ? "الأعمال بحسب أيام الأسبوع" : "Practices by Day of the Week"}</h2>
      <div className="space-y-3">
        {weekdayOrder.map((key) => {
          const w = weekdayPrograms[key];
          return (
            <div key={key} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{l === "ar" ? w.title_ar : w.title_en}</h3>
                {key === "friday" && (
                  <Link href={`/${l}/friday`} className="text-sm font-medium text-[var(--primary)]">
                    {t(l, "view_all")}
                  </Link>
                )}
              </div>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{l === "ar" ? w.intro_ar : w.intro_en}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {w.practices.map((p, i) => (
                  <span key={i} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
                    {l === "ar" ? p.label_ar : p.label_en}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold text-[var(--ink)]">{l === "ar" ? "الأشهر الهجرية" : "Hijri Months"}</h2>
      <p className="text-sm text-[var(--ink-soft)]">
        {l === "ar"
          ? "بنية شهرية مخصصة (رجب، شعبان، رمضان، محرم...) قيد الإعداد، وستُربط بصفحة المناسبات وصفحات الأدعية عند توفر نصوص محققة."
          : "A dedicated per-month structure (Rajab, Sha'ban, Ramadan, Muharram...) is in progress and will link to the Occasions and Dua pages once verified texts are available."}
      </p>
    </div>
  );
}
