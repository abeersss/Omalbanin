import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { masumeen, getMasumBySlug } from "@/content/masumeen";
import LiveMasumArticle from "@/components/LiveMasumArticle";

export function generateStaticParams() {
  return locales.flatMap((locale) => masumeen.map((m) => ({ locale, slug: m.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/ahl-al-bayt/[slug]">): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const m = getMasumBySlug(slug);
  if (!m) return {};
  const l = locale as Locale;
  return {
    title: l === "ar" ? m.name_ar : m.name_en,
    description: l === "ar" ? m.bio_ar.slice(0, 150) : m.bio_en.slice(0, 150),
    alternates: { canonical: `/${l}/ahl-al-bayt/${slug}`, languages: { ar: `/ar/ahl-al-bayt/${slug}`, en: `/en/ahl-al-bayt/${slug}` } },
  };
}

export default async function MasumPage(props: PageProps<"/[locale]/ahl-al-bayt/[slug]">) {
  const { locale, slug } = await props.params;
  const l = locale as Locale;
  const m = getMasumBySlug(slug);
  if (!m) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/${l}/ahl-al-bayt`} className="mb-6 inline-block text-sm text-[var(--ink-soft)] hover:text-[var(--primary)]">
        {l === "ar" ? "→" : "←"} {t(l, "the_fourteen")}
      </Link>

      <LiveMasumArticle masum={m} locale={l} />

      {m.related_content.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">{t(l, "related")}</h2>
          <div className="flex flex-wrap gap-2">
            {m.related_content.map((slug) => (
              <Link key={slug} href={`/${l}/duas/${slug}`} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--primary)]">
                {slug}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
