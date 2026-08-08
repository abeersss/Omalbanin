import Link from "next/link";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { weekdayPrograms } from "@/content/weekday";
import { getPageContent } from "@/content/pages";
import LivePageText from "@/components/LivePageText";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/friday">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "friday_dashboard"), alternates: { canonical: `/${locale}/friday` } };
}

export default async function FridayPage(props: PageProps<"/[locale]/friday">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const friday = weekdayPrograms.friday;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-6 text-center">
        <p className="text-sm font-semibold text-[var(--accent)]">{t(l, "nav_friday")}</p>
        <h1 className="mt-1 text-3xl font-extrabold text-[var(--ink)]">{t(l, "friday_dashboard")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--ink-soft)]">{l === "ar" ? friday.intro_ar : friday.intro_en}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {friday.practices.map((p, i) => (
          <div key={i} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div>
              <p className="font-semibold">{l === "ar" ? p.label_ar : p.label_en}</p>
              {(p.note_ar || p.note_en) && <p className="mt-1 text-xs text-[var(--ink-soft)]">{l === "ar" ? p.note_ar : p.note_en}</p>}
            </div>
            {p.duaSlug && (
              <Link
                href={`/${l}/duas/${p.duaSlug}`}
                className="shrink-0 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white"
              >
                {t(l, "read")}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--border)] p-5 text-sm text-[var(--ink-soft)]">
        <p className="font-semibold text-[var(--ink)] mb-1">{t(l, "source")}</p>
        <LivePageText
          slug="page-friday"
          locale={l}
          staticBody={getPageContent("page-friday")?.body ?? []}
        />
      </div>
    </div>
  );
}
