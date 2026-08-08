import Link from "next/link";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import ContentCard from "@/components/ContentCard";
import { legacyContent } from "@/content/legacy";
import { getPageContent } from "@/content/pages";
import LivePageText from "@/components/LivePageText";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/umm-al-banin">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "umm_al_banin_title"), alternates: { canonical: `/${locale}/umm-al-banin` } };
}

export default async function UmmAlBaninPage(props: PageProps<"/[locale]/umm-al-banin">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const items = legacyContent.filter((c) => (c.category || []).includes("umm-al-banin"));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-8 text-center">
        <h1 className="text-3xl font-extrabold text-[var(--ink)]">{t(l, "umm_al_banin_title")}</h1>
        <LivePageText
          slug="page-umm-al-banin"
          locale={l}
          staticBody={getPageContent("page-umm-al-banin")?.body ?? []}
          className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((c) => (
          <ContentCard key={c.slug} item={c} locale={l} href={`/${l}/collections/${c.slug}`} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href={`/${l}/ahl-al-bayt/imam-husayn`} className="text-sm font-medium text-[var(--primary)] underline">
          {l === "ar" ? "قراءة المزيد عن الإمام الحسين عليه السلام" : "Read more about Imam Husayn"}
        </Link>
      </div>
    </div>
  );
}
