import Link from "next/link";
import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { HIJRI_MONTHS_AR, HIJRI_MONTHS_EN } from "@/lib/hijri";
import { occasions } from "@/content/occasions";
import VerificationBadge from "@/components/VerificationBadge";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/occasions">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "occasions_title"), alternates: { canonical: `/${locale}/occasions` } };
}

export default async function OccasionsPage(props: PageProps<"/[locale]/occasions">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  const sorted = [...occasions].sort((a, b) => a.hijri_month - b.hijri_month || a.hijri_day - b.hijri_day);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-extrabold text-[var(--primary)]">{t(l, "occasions_title")}</h1>
      <p className="mb-8 text-[var(--ink-soft)]">
        {l === "ar"
          ? "التواريخ الهجرية أدناه قابلة للتعديل الإداري (± يوم) بحسب رؤية الهلال - راجع lib/site-config.ts."
          : "Hijri dates below are subject to the administrator's moon-sighting adjustment - see lib/site-config.ts."}
      </p>
      <ul className="space-y-3">
        {sorted.map((o) => (
          <li key={o.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[var(--accent)] font-semibold">
                  {o.hijri_day} {l === "ar" ? HIJRI_MONTHS_AR[o.hijri_month - 1] : HIJRI_MONTHS_EN[o.hijri_month - 1]}
                </p>
                <h2 className="font-bold">{l === "ar" ? o.title_ar : o.title_en}</h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{l === "ar" ? o.description_ar : o.description_en}</p>
              </div>
              <VerificationBadge status={o.verification_status} locale={l} />
            </div>
            {o.related_person && (
              <Link href={`/${l}/ahl-al-bayt/${o.related_person}`} className="mt-3 inline-block text-xs font-medium text-[var(--primary)]">
                {t(l, "read_more")} {l === "ar" ? "←" : "→"}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
