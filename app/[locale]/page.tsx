import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import TodayDashboard from "@/components/TodayDashboard";
import ContentCard from "@/components/ContentCard";
import DashboardCard from "@/components/DashboardCard";
import { masumeen } from "@/content/masumeen";
import { duas } from "@/content/duas";
import { legacyCollections, legacyZiyarat } from "@/content";
import { occasions } from "@/content/occasions";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  const l = locale as Locale;

  const ziyaratItems = legacyZiyarat.slice(0, 3);
  const duaItems = duas.slice(0, 3);

  return (
    <div>
      <TodayDashboard locale={l} />

      {/* 14 Ma'sumeen */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--primary)]">{t(l, "the_fourteen")}</h2>
          <Link href={`/${l}/ahl-al-bayt`} className="text-sm font-medium text-[var(--accent)]">
            {t(l, "view_all")}
          </Link>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
          {masumeen.map((m) => (
            <Link
              key={m.slug}
              href={`/${l}/ahl-al-bayt/${m.slug}`}
              className="flex min-w-[180px] max-w-[180px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mb-2 text-xs font-semibold text-[var(--accent)]">
                {l === "ar" ? `${m.order}` : `#${m.order}`}
              </span>
              <span className="font-bold leading-snug text-[var(--ink)]">{l === "ar" ? m.name_ar : m.name_en}</span>
              <span className="mt-1 text-xs text-[var(--ink-soft)]">{l === "ar" ? m.title_ar : m.title_en}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Dua Library preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--primary)]">{t(l, "dua_library")}</h2>
          <Link href={`/${l}/duas`} className="text-sm font-medium text-[var(--accent)]">
            {t(l, "view_all")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {duaItems.map((d) => (
            <ContentCard key={d.slug} item={d} locale={l} href={`/${l}/duas/${d.slug}`} />
          ))}
        </div>
      </section>

      {/* Ziyarat preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--primary)]">{t(l, "ziyarat_library")}</h2>
          <Link href={`/${l}/ziyarat`} className="text-sm font-medium text-[var(--accent)]">
            {t(l, "view_all")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ziyaratItems.map((z) => (
            <ContentCard key={z.slug} item={z} locale={l} href={`/${l}/ziyarat/${z.slug}`} />
          ))}
        </div>
      </section>

      {/* Mafatih al-Jinan */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardCard
            eyebrow={t(l, "mafatih_title")}
            title={l === "ar" ? "مكتبة مفاتيح الجنان" : "The Mafatih al-Jinan Library"}
            description={
              l === "ar"
                ? "أعمال يومية وأسبوعية وشهرية، منظمة بحسب الشهر والمناسبة، مع توثيق المصدر لكل عمل."
                : "Daily, weekly and monthly practices, organized by month and occasion, each with a documented source."
            }
            href={`/${l}/mafatih-al-jinan`}
            cta={t(l, "read_more")}
            icon="📗"
          />
          <DashboardCard
            eyebrow={t(l, "nav_friday")}
            title={t(l, "friday_dashboard")}
            description={
              l === "ar"
                ? "لوحة موسّعة بأعمال يوم الجمعة اعتمادًا على مفاتيح الجنان."
                : "An expanded dashboard of Friday practices drawn from Mafatih al-Jinan."
            }
            href={`/${l}/friday`}
            cta={t(l, "read_more")}
            icon="🕋"
          />
        </div>
      </section>

      {/* Occasions */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--primary)]">{t(l, "occasions_title")}</h2>
          <Link href={`/${l}/occasions`} className="text-sm font-medium text-[var(--accent)]">
            {t(l, "view_all")}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {occasions.slice(0, 8).map((o) => (
            <Link
              key={o.id}
              href={`/${l}/occasions`}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm hover:border-[var(--primary)]"
            >
              {l === "ar" ? o.title_ar : o.title_en}
            </Link>
          ))}
        </div>
      </section>

      {/* Umm al-Banin identity section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--ink)]">{t(l, "umm_al_banin_title")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--ink-soft)]">
            {l === "ar"
              ? "أُنشئ هذا الموقع أساسًا لتكريم السيدة أم البنين عليها السلام، ويبقى هذا المحور حاضرًا وسط مكتبة روحية أوسع."
              : "This site began as a tribute to Lady Umm al-Banin, and that focus remains central within a broader spiritual library."}
          </p>
          <Link
            href={`/${l}/umm-al-banin`}
            className="mt-5 inline-block rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white"
          >
            {t(l, "read_more")}
          </Link>
        </div>
      </section>

      {/* Existing Omalbnin collections */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--primary)]">{t(l, "legacy_title")}</h2>
          <Link href={`/${l}/collections`} className="text-sm font-medium text-[var(--accent)]">
            {t(l, "view_all")}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legacyCollections.map((c) => (
            <ContentCard key={c.slug} item={c} locale={l} href={`/${l}/collections/${c.slug}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
