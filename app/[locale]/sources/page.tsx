import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { getPageContent } from "@/content/pages";
import LivePageText from "@/components/LivePageText";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/sources">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_sources"), alternates: { canonical: `/${locale}/sources` } };
}

/**
 * What each verification badge means.
 *
 * The rows were written into this component, so the owner could not reword a
 * definition or drop a badge that no longer applies. They now live in the
 * editable record "page-sources", one section per row, each carrying its own
 * badge - which is what lets a row be deleted without the remaining badges
 * sliding onto the wrong descriptions.
 */
export default async function SourcesPage(props: PageProps<"/[locale]/sources">) {
  const { locale } = await props.params;
  const l = locale as Locale;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_sources")}</h1>
      <LivePageText
        slug="page-sources"
        locale={l}
        staticBody={getPageContent("page-sources")?.body ?? []}
        className="text-[var(--ink-soft)]"
        rowClassName="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
      />
    </div>
  );
}
