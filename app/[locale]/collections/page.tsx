import { Locale, t, locales } from "@/lib/i18n";
import ContentCard from "@/components/ContentCard";
import LiveIndex from "@/components/LiveIndex";
import { legacyCollections } from "@/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/collections">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "legacy_title"), alternates: { canonical: `/${locale}/collections` } };
}

export default async function CollectionsPage(props: PageProps<"/[locale]/collections">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "legacy_title")}</h1>
      <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "هذا المحتوى موجود على الموقع الأصلي omalbnin.com قبل إعادة التصميم، وتم الحفاظ عليه هنا مع تصنيف واضح لمصدره."
          : "This content existed on the original omalbnin.com before the redesign and is preserved here with clear source classification."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {legacyCollections.map((c) => (
          <ContentCard key={c.slug} item={c} locale={l} href={`/${l}/collections/${c.slug}`} />
        ))}
        <LiveIndex
          types={["collection", "article", "amal"]}
          knownSlugs={legacyCollections.map((c) => c.slug)}
          locale={l}
          hrefBase={`/${l}/collections`}
        />
      </div>
    </div>
  );
}
