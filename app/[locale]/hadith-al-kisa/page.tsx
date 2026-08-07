import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { getLegacyBySlug } from "@/content/legacy";
import ReaderPage from "@/components/ReaderPage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/hadith-al-kisa">): Promise<Metadata> {
  const { locale } = await props.params;
  const l = locale as Locale;
  return {
    title: t(l, "hadith_al_kisa"),
    alternates: { canonical: `/${l}/hadith-al-kisa`, languages: { ar: "/ar/hadith-al-kisa", en: "/en/hadith-al-kisa" } },
  };
}

export default async function HadithAlKisaPage(props: PageProps<"/[locale]/hadith-al-kisa">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const item = getLegacyBySlug("hadith-al-kisa");
  if (!item) notFound();
  return <ReaderPage item={item} locale={l} backHref={`/${l}`} backLabel={t(l, "nav_home")} />;
}
