import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import LiveMasumeenGrid from "@/components/LiveMasumeenGrid";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/ahl-al-bayt">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "the_fourteen"), alternates: { canonical: `/${locale}/ahl-al-bayt` } };
}

export default async function MasumeenPage(props: PageProps<"/[locale]/ahl-al-bayt">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "the_fourteen")}</h1>
      <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "تواريخ الميلاد والاستشهاد أدناه هي الأكثر تداولًا في المصادر الشيعية العامة، وتحتاج مراجعة علمية نهائية قبل اعتمادها كمرجع دقيق - انظر صفحة المصادر."
          : "Birth/martyrdom dates below reflect the ones most commonly cited across general Shia sources and still need final scholarly review - see the Sources page."}
      </p>
      <LiveMasumeenGrid locale={l} />
    </div>
  );
}
