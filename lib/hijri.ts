import { toHijri as rawToHijri } from "hijri-converter";
import { siteConfig } from "./site-config";

export interface HijriDate {
  year: number;
  month: number; // 1-12
  day: number;
  monthNameAr: string;
  monthNameEn: string;
}

export const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

export const HIJRI_MONTHS_EN = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Ula",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

/**
 * Converts a Gregorian date to a Shia-usable Hijri date.
 *
 * IMPORTANT: tabular/astronomical calculation cannot capture local moon-sighting
 * announcements, which is why `siteConfig.hijriAdjustmentDays` exists — an
 * administrator can shift the displayed date by -2..+2 days (see lib/site-config.ts)
 * without touching this code, to reflect a moon-sighting committee's announcement.
 */
export function gregorianToHijri(date: Date): HijriDate {
  const adjusted = new Date(date);
  adjusted.setDate(adjusted.getDate() + siteConfig.hijriAdjustmentDays);

  const { hy, hm, hd } = rawToHijri(
    adjusted.getFullYear(),
    adjusted.getMonth() + 1,
    adjusted.getDate()
  );

  return {
    year: hy,
    month: hm,
    day: hd,
    monthNameAr: HIJRI_MONTHS_AR[hm - 1],
    monthNameEn: HIJRI_MONTHS_EN[hm - 1],
  };
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function toArabicDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

export function formatHijri(h: HijriDate, locale: "ar" | "en"): string {
  if (locale === "ar") {
    return `${toArabicDigits(h.day)} ${h.monthNameAr} ${toArabicDigits(h.year)} هـ`;
  }
  return `${h.day} ${h.monthNameEn} ${h.year} AH`;
}

const AR_WEEKDAYS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const EN_WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const AR_MONTHS_G = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
const EN_MONTHS_G = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatGregorian(date: Date, locale: "ar" | "en"): string {
  const weekday = locale === "ar" ? AR_WEEKDAYS[date.getDay()] : EN_WEEKDAYS[date.getDay()];
  const month = locale === "ar" ? AR_MONTHS_G[date.getMonth()] : EN_MONTHS_G[date.getMonth()];
  const day = locale === "ar" ? toArabicDigits(date.getDate()) : date.getDate();
  const year = locale === "ar" ? toArabicDigits(date.getFullYear()) : date.getFullYear();
  if (locale === "ar") {
    return `${weekday}، ${day} ${month} ${year}`;
  }
  return `${weekday}, ${day} ${month} ${year}`;
}

export function getWeekdayKey(date: Date): string {
  const keys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return keys[date.getDay()];
}
