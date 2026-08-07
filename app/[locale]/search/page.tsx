import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import SearchBar from "@/components/SearchBar";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/search">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "nav_search"), alternates: { canonical: `/${locale}/search` } };
}

export default async function SearchPage(props: PageProps<"/[locale]/search">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-[var(--primary)]">{t(l, "search_placeholder")}</h1>
      <SearchBar locale={l} />
    </div>
  );
}
