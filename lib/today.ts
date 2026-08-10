import { siteConfig } from "./site-config";
import { getDuaBySlug, duas } from "@/content/duas";
import { getLegacyBySlug } from "@/content/legacy";
import { legacyZiyarat } from "@/content";
import { getOccasionsForDate } from "@/content/occasions";
import { weekdayPrograms } from "@/content/weekday";
import { gregorianToHijri, getWeekdayKey } from "./hijri";

/**
 * `overrides` carries the values the owner set in the admin dashboard. They are
 * passed in rather than read from a module so this stays pure and testable, and
 * so a change in the dashboard takes effect without rebuilding the site. Each
 * falls back to the value compiled into lib/site-config.ts.
 */
export function getTodaySelections(
  date: Date,
  overrides?: {
    hijriAdjustmentDays?: number;
    featuredDuaSlug?: string | null;
    featuredZiyaraSlug?: string | null;
  },
) {
  const hijri = gregorianToHijri(date, overrides?.hijriAdjustmentDays);
  const weekdayKey = getWeekdayKey(date);
  const occasions = getOccasionsForDate(hijri.month, hijri.day);
  const weekday = weekdayPrograms[weekdayKey];

  const duaSlug = overrides?.featuredDuaSlug ?? siteConfig.featuredDuaSlugOverride;
  const ziyaraSlug = overrides?.featuredZiyaraSlug ?? siteConfig.featuredZiyaraSlugOverride;

  const featuredDua =
    (duaSlug && getDuaBySlug(duaSlug)) ||
    duas.find((d) => d.published && d.featured) ||
    duas.find((d) => d.published);

  const featuredZiyara =
    (ziyaraSlug && getLegacyBySlug(ziyaraSlug)) ||
    legacyZiyarat.find((c) => c.published && c.featured) ||
    legacyZiyarat.find((c) => c.published);

  const featuredAmal = weekday?.practices?.[0];

  return { hijri, weekdayKey, weekday, occasions, featuredDua, featuredZiyara, featuredAmal };
}
