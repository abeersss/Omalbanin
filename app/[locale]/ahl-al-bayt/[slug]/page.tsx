import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { masumeen, getMasumBySlug } from "@/content/masumeen";
import VerificationBadge from "@/components/VerificationBadge";

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

      <header className="mb-8">
        <VerificationBadge status={m.verification_status} locale={l} />
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--ink)]">{l === "ar" ? m.name_ar : m.name_en}</h1>
        <p className="mt-1 text-lg text-[var(--primary)]">{l === "ar" ? m.title_ar : m.title_en}</p>
      </header>

      <dl className="mb-8 grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:grid-cols-2">
        {(m.birth_ar || m.birth_en) && (
          <div>
            <dt className="text-xs font-semibold text-[var(--ink-soft)]">{t(l, "birth")}</dt>
            <dd className="mt-0.5 text-sm">{l === "ar" ? m.birth_ar : m.birth_en}</dd>
          </div>
        )}
        {(m.martyrdom_ar || m.martyrdom_en) && (
          <div>
            <dt className="text-xs font-semibold text-[var(--ink-soft)]">{t(l, "martyrdom")}</dt>
            <dd className="mt-0.5 text-sm">{l === "ar" ? m.martyrdom_ar : m.martyrdom_en}</dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold text-[var(--ink-soft)]">{t(l, "relation")}</dt>
          <dd className="mt-0.5 text-sm">{l === "ar" ? m.relation_ar : m.relation_en}</dd>
        </div>
      </dl>

      <article className="prose-none space-y-4 text-[var(--ink)] leading-8">
        <p className="whitespace-pre-line">{l === "ar" ? m.bio_ar : m.bio_en}</p>
      </article>

      {m.teachings.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">{t(l, "teachings")}</h2>
          <ul className="space-y-3">
            {m.teachings.map((teach, i) => (
              <li key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-7">
                {l === "ar" ? teach.text_ar : teach.text_en}
              </li>
            ))}
          </ul>
        </div>
      )}

      {m.occasions.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--primary)]">{t(l, "occasions_related")}</h2>
          <div className="flex flex-wrap gap-2">
            {m.occasions.map((o, i) => (
              <span key={i} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm">
                {l === "ar" ? o.label_ar : o.label_en}
              </span>
            ))}
          </div>
        </div>
      )}

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
