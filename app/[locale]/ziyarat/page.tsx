import { Locale, t, locales } from "@/lib/i18n";
import LiveCardGrid from "@/components/LiveCardGrid";
import { legacyZiyarat } from "@/content";
import { ziyaratPlaceholders } from "@/content/ziyarat";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/ziyarat">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "ziyarat_library"), alternates: { canonical: `/${locale}/ziyarat` } };
}

export default async function ZiyaratPage(props: PageProps<"/[locale]/ziyarat">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const items = [...legacyZiyarat, ...ziyaratPlaceholders];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "ziyarat_library")}</h1>
      <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "الزيارات المتوفرة أدناه محفوظة كما هي من الموقع الأصلي (نصًا أو صورًا)."
          : "The visitations below are preserved as they existed on the original site (as text or images)."}
      </p>
      <LiveCardGrid items={items} types={["ziyara"]} locale={l} hrefBase={`/${l}/ziyarat`} />
    </div>
  );
}
