import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { legacyZiyarat } from "@/content";
import { ziyaratPlaceholders } from "@/content/ziyarat";
import ReaderPage from "@/components/ReaderPage";

const items = [...legacyZiyarat, ...ziyaratPlaceholders];

export function generateStaticParams() {
  return locales.flatMap((locale) => items.map((z) => ({ locale, slug: z.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/ziyarat/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const item = items.find((i) => i.slug === slug);
  if (!item) return {};
  const l = locale as Locale;
  return {
    title: l === "ar" ? item.title_ar : item.title_en,
    description: l === "ar" ? item.summary_ar : item.summary_en,
    alternates: { canonical: `/${l}/ziyarat/${slug}`, languages: { ar: `/ar/ziyarat/${slug}`, en: `/en/ziyarat/${slug}` } },
  };
}

export default async function ZiyaraPage(props: PageProps<"/[locale]/ziyarat/[slug]">) {
  const { locale, slug } = await props.params;
  const l = locale as Locale;
  const item = items.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ReaderPage item={item} locale={l} backHref={`/${l}/ziyarat`} backLabel={t(l, "ziyarat_library")} />;
}
