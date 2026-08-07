import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { duas, getDuaBySlug } from "@/content/duas";
import ReaderPage from "@/components/ReaderPage";

export function generateStaticParams() {
  return locales.flatMap((locale) => duas.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/duas/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const item = getDuaBySlug(slug);
  if (!item) return {};
  const l = locale as Locale;
  return {
    title: l === "ar" ? item.title_ar : item.title_en,
    description: l === "ar" ? item.summary_ar : item.summary_en,
    alternates: { canonical: `/${l}/duas/${slug}`, languages: { ar: `/ar/duas/${slug}`, en: `/en/duas/${slug}` } },
  };
}

export default async function DuaPage(props: PageProps<"/[locale]/duas/[slug]">) {
  const { locale, slug } = await props.params;
  const l = locale as Locale;
  const item = getDuaBySlug(slug);
  if (!item) notFound();
  return <ReaderPage item={item} locale={l} backHref={`/${l}/duas`} backLabel={t(l, "dua_library")} />;
}
