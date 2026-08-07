import Link from "next/link";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { masumeen } from "@/content/masumeen";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/ahl-al-bayt">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "the_fourteen"), alternates: { canonical: `/${locale}/ahl-al-bayt` } };
}

export default async function MasumeenPage(props: PageProps<"/[locale]/ahl-al-bayt">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "the_fourteen")}</h1>
      <p className="mb-8 max-w-2xl text-[var(--ink-soft)]">
        {l === "ar"
          ? "تواريخ الميلاد والاستشهاد أدناه هي الأكثر تداولًا في المصادر الشيعية العامة، وتحتاج مراجعة علمية نهائية قبل اعتمادها كمرجع دقيق — انظر صفحة المصادر."
          : "Birth/martyrdom dates below reflect the ones most commonly cited across general Shia sources and still need final scholarly review — see the Sources page."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {masumeen.map((m) => (
          <Link
            key={m.slug}
            href={`/${l}/ahl-al-bayt/${m.slug}`}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="mb-1 text-xs font-semibold text-[var(--accent)]">{l === "ar" ? m.order : `#${m.order}`}</span>
            <h3 className="font-bold text-[var(--ink)] group-hover:text-[var(--primary)]">{l === "ar" ? m.name_ar : m.name_en}</h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{l === "ar" ? m.title_ar : m.title_en}</p>
            <span className="mt-4 text-sm font-medium text-[var(--primary)]">{t(l, "read_more")} {l === "ar" ? "←" : "→"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
