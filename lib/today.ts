import { siteConfig } from "./site-config";
import { getDuaBySlug, duas } from "@/content/duas";
import { getLegacyBySlug } from "@/content/legacy";
import { legacyZiyarat } from "@/content";
import { getOccasionsForDate } from "@/content/occasions";
import { weekdayPrograms } from "@/content/weekday";
import { gregorianToHijri, getWeekdayKey } from "./hijri";

export function getTodaySelections(date: Date) {
  const hijri = gregorianToHijri(date);
  const weekdayKey = getWeekdayKey(date);
  const occasions = getOccasionsForDate(hijri.month, hijri.day);
  const weekday = weekdayPrograms[weekdayKey];

  const featuredDua =
    (siteConfig.featuredDuaSlugOverride && getDuaBySlug(siteConfig.featuredDuaSlugOverride)) ||
    duas.find((d) => d.published && d.featured) ||
    duas.find((d) => d.published);

  const featuredZiyara =
    (siteConfig.featuredZiyaraSlugOverride && getLegacyBySlug(siteConfig.featuredZiyaraSlugOverride)) ||
    legacyZiyarat.find((c) => c.published && c.featured) ||
    legacyZiyarat.find((c) => c.published);

  const featuredAmal = weekday?.practices?.[0];

  return { hijri, weekdayKey, weekday, occasions, featuredDua, featuredZiyara, featuredAmal };
}
