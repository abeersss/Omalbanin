import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { legacyCollections } from "@/content";
import ReaderPage from "@/components/ReaderPage";

export function generateStaticParams() {
  return locales.flatMap((locale) => legacyCollections.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/collections/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const item = legacyCollections.find((i) => i.slug === slug);
  if (!item) return {};
  const l = locale as Locale;
  return {
    title: l === "ar" ? item.title_ar : item.title_en,
    description: l === "ar" ? item.summary_ar : item.summary_en,
    alternates: { canonical: `/${l}/collections/${slug}`, languages: { ar: `/ar/collections/${slug}`, en: `/en/collections/${slug}` } },
  };
}

export default async function CollectionItemPage(props: PageProps<"/[locale]/collections/[slug]">) {
  const { locale, slug } = await props.params;
  const l = locale as Locale;
  const item = legacyCollections.find((i) => i.slug === slug);
  if (!item) notFound();
  return <ReaderPage item={item} locale={l} backHref={`/${l}/collections`} backLabel={t(l, "legacy_title")} />;
}
