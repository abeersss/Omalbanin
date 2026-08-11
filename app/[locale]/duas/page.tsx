import { Locale, t, locales } from "@/lib/i18n";
import ContentCard from "@/components/ContentCard";
import LiveIndex from "@/components/LiveIndex";
import { duas } from "@/content/duas";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/duas">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "dua_library"), alternates: { canonical: `/${locale}/duas` } };
}

export default async function DuasPage(props: PageProps<"/[locale]/duas">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "dua_library")}</h1>
      <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "بعض الأدعية أدناه نصوص حقيقية منقولة من الموقع الأصلي أو مصادر موثوقة، وبعضها لا يزال بانتظار نص محقق - لن نكتب دعاءً من الذاكرة دون تحقق."
          : "Some duas below carry real migrated or sourced text; others are still awaiting verified text - we won't write a supplication from memory without checking it."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {duas.map((d) => (
          <ContentCard key={d.slug} item={d} locale={l} href={`/${l}/duas/${d.slug}`} />
        ))}
        <LiveIndex types={["dua"]} knownSlugs={duas.map((d) => d.slug)} locale={l} hrefBase={`/${l}/duas`} />
      </div>
    </div>
  );
}
