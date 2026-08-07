"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { formatGregorian, formatHijri, gregorianToHijri, toArabicDigits } from "@/lib/hijri";
import { getTodaySelections } from "@/lib/today";
import { siteConfig } from "@/lib/site-config";
import DashboardCard from "./DashboardCard";

function DateStrip({ locale, selected, onSelect }: { locale: Locale; selected: Date; onSelect: (d: Date) => void }) {
  const days = useMemo(() => {
    const arr: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const weekdayShort = locale === "ar"
    ? ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-1" dir={locale === "ar" ? "rtl" : "ltr"}>
      {days.map((d) => {
        const isToday = d.toDateString() === new Date().toDateString();
        const isSelected = d.toDateString() === selected.toDateString();
        const dayNum = locale === "ar" ? toArabicDigits(d.getDate()) : d.getDate();
        return (
          <button
            key={d.toISOString()}
            onClick={() => onSelect(d)}
            className={`flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-2.5 transition ${
              isSelected
                ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-md"
                : isToday
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-[var(--border)] text-[var(--ink-soft)] hover:bg-[var(--accent-soft)]"
            }`}
          >
            <span className="text-[11px] opacity-80">{weekdayShort[d.getDay()]}</span>
            <span className="text-lg font-bold">{dayNum}</span>
            {isToday && <span className="text-[9px] opacity-90">{locale === "ar" ? "اليوم" : "TODAY"}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function TodayDashboard({ locale }: { locale: Locale }) {
  const [now, setNow] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);

  useEffect(() => {
    // The visitor's real current date must come from the browser, not from
    // build time (this is a static export) - see Counter.tsx for the pattern.
    const d = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(d);
    setSelected(d);
  }, []);

  if (!now || !selected) {
    // Skeleton shown during static prerender / before hydration - avoids
    // baking a build-time date into the static HTML.
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <div className="mx-auto h-8 w-64 animate-pulse rounded-full bg-[var(--border)]" />
      </div>
    );
  }

  const hijri = gregorianToHijri(selected);
  const { occasions, weekday } = getTodaySelections(selected);
  const isFriday = selected.getDay() === 5;

  return (
    <div id="today">
      <div className="mx-auto max-w-4xl px-4 pt-10 pb-6 text-center">
        <p className="text-sm text-[var(--accent)] font-semibold">{t(locale, "home_hero_kicker")}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[var(--primary)]">{formatHijri(hijri, locale)}</h1>
        <p className="mt-2 text-[var(--ink-soft)]">{formatGregorian(selected, locale)}</p>
        <p className="mt-1 text-xs text-[var(--ink-soft)]">{siteConfig.hijriRegionLabel[locale]}</p>

        {occasions.length > 0 && (
          <div className="mx-auto mt-5 max-w-md rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-3">
            <p className="text-xs font-semibold text-[var(--accent)]">{t(locale, "today_in_calendar")}</p>
            {occasions.map((o) => (
              <p key={o.id} className="mt-1 font-bold text-[var(--ink)]">
                {locale === "ar" ? o.title_ar : o.title_en}
              </p>
            ))}
          </div>
        )}

        {isFriday && (
          <Link
            href={`/${locale}/friday`}
            className="mt-5 inline-block rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90"
          >
            {t(locale, "friday_special")}
          </Link>
        )}
      </div>

      <DateStrip locale={locale} selected={selected} onSelect={setSelected} />

      <div className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          eyebrow={t(locale, "today_dua")}
          title={locale === "ar" ? "دعاء الفرج" : "Dua al-Faraj"}
          description={locale === "ar" ? "دعاء لتفريج الهم والكرب، مروي عن أمير المؤمنين عليه السلام." : "A supplication for relief from distress, narrated from Imam Ali."}
          href={`/${locale}/duas/dua-al-faraj`}
          cta={t(locale, "read")}
          icon="🤲"
        />
        <DashboardCard
          eyebrow={t(locale, "today_ziyara")}
          title={locale === "ar" ? "زيارة عاشوراء" : "Ziyarat Ashura"}
          description={locale === "ar" ? "من أعظم زيارات الإمام الحسين عليه السلام." : "One of the greatest visitations of Imam Husayn."}
          href={`/${locale}/ziyarat/ziyarat-ashura`}
          cta={t(locale, "read")}
          icon="🕌"
        />
        <DashboardCard
          eyebrow={t(locale, "today_amal")}
          title={weekday ? (locale === "ar" ? weekday.title_ar : weekday.title_en) : ""}
          description={weekday ? (locale === "ar" ? weekday.intro_ar : weekday.intro_en) : ""}
          href={isFriday ? `/${locale}/friday` : `/${locale}/mafatih-al-jinan`}
          cta={t(locale, "read")}
          icon="✨"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-10">
        <p className="mb-3 text-sm font-semibold text-[var(--ink-soft)]">{t(locale, "quick_access")}</p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: `/${locale}/hadith-al-kisa`, label: t(locale, "hadith_al_kisa") },
            { href: `/${locale}/duas/istighfar`, label: t(locale, "istighfar") },
            { href: `/${locale}/duas/salawat`, label: t(locale, "salawat") },
            { href: `/${locale}/duas/dua-al-faraj`, label: t(locale, "dua_al_faraj") },
            { href: `/${locale}/duas/dua-nudba`, label: locale === "ar" ? "دعاء الندبة" : "Dua al-Nudba" },
            { href: `/${locale}/duas/dua-kumayl`, label: locale === "ar" ? "دعاء كميل" : "Dua Kumayl" },
            { href: `/${locale}/mafatih-al-jinan`, label: t(locale, "mafatih_title") },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
