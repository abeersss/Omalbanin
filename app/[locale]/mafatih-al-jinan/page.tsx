import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { getPageContent } from "@/content/pages";
import LivePageText from "@/components/LivePageText";
import LiveWeekdayList from "@/components/LiveWeekdayList";

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
      <LivePageText
        slug="page-mafatih"
        locale={l}
        staticBody={getPageContent("page-mafatih")?.body ?? []}
        className="mb-10 max-w-2xl text-[var(--ink-soft)]"
      />

      <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">{l === "ar" ? "الأعمال بحسب أيام الأسبوع" : "Practices by Day of the Week"}</h2>
      <LiveWeekdayList locale={l} order={weekdayOrder} />

      <h2 className="mt-10 mb-4 text-xl font-bold text-[var(--ink)]">{l === "ar" ? "الأشهر الهجرية" : "Hijri Months"}</h2>
      <p className="text-sm text-[var(--ink-soft)]">
        {l === "ar"
          ? "بنية شهرية مخصصة (رجب، شعبان، رمضان، محرم...) قيد الإعداد، وستُربط بصفحة المناسبات وصفحات الأدعية عند توفر نصوص محققة."
          : "A dedicated per-month structure (Rajab, Sha'ban, Ramadan, Muharram...) is in progress and will link to the Occasions and Dua pages once verified texts are available."}
      </p>
    </div>
  );
}
