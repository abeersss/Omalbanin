import { Occasion } from "./types";

/**
 * Islamic occasions engine. Dates are the ones most commonly cited across
 * mainstream Twelver Shia sources; some (e.g. exact martyrdom dates) carry
 * minor scholarly variation. Treat as "needs_verification" until checked
 * against the reference the site will standardize on. hijri_month/day use
 * 1=Muharram..12=Dhu al-Hijjah.
 */
export const occasions: Occasion[] = [
  { id: "ashura", slug: "ashura", title_ar: "عاشوراء", title_en: "Ashura", description_ar: "ذكرى استشهاد الإمام الحسين عليه السلام وأهل بيته وأصحابه في كربلاء سنة 61هـ.", description_en: "The anniversary of the martyrdom of Imam Husayn, his family and companions at Karbala, 61 AH.", hijri_month: 1, hijri_day: 10, kind: "shahadat", related_person: "imam-husayn", related_content: ["ziyarat-ashura"], verification_status: "needs_verification" },
  { id: "arbaeen", slug: "arbaeen", title_ar: "الأربعين", title_en: "Arba'een", description_ar: "أربعون يومًا على استشهاد الإمام الحسين عليه السلام؛ مناسبة زيارة كبرى.", description_en: "Forty days after the martyrdom of Imam Husayn; a major visitation occasion.", hijri_month: 2, hijri_day: 20, kind: "other", related_person: "imam-husayn", verification_status: "needs_verification" },
  { id: "eid-al-ghadir", slug: "eid-al-ghadir", title_ar: "عيد الغدير", title_en: "Eid al-Ghadir", description_ar: "ذكرى نصّ النبي محمد صلى الله عليه وآله على ولاية الإمام علي عليه السلام في غدير خم.", description_en: "Commemorates the Prophet's designation of Imam Ali at Ghadir Khumm.", hijri_month: 12, hijri_day: 18, kind: "eid", related_person: "imam-ali", verification_status: "needs_verification" },
  { id: "mabath", slug: "mabath", title_ar: "المبعث النبوي الشريف", title_en: "Mab'ath al-Nabi", description_ar: "ذكرى بعثة النبي محمد صلى الله عليه وآله وبدء الوحي.", description_en: "Commemorates the start of the Prophet's mission and the beginning of revelation.", hijri_month: 7, hijri_day: 27, kind: "other", related_person: "prophet-muhammad", verification_status: "needs_verification" },
  { id: "eid-al-fitr", slug: "eid-al-fitr", title_ar: "عيد الفطر", title_en: "Eid al-Fitr", description_ar: "عيد نهاية شهر رمضان المبارك.", description_en: "The festival marking the end of the holy month of Ramadan.", hijri_month: 10, hijri_day: 1, kind: "eid", verification_status: "needs_verification" },
  { id: "eid-al-adha", slug: "eid-al-adha", title_ar: "عيد الأضحى", title_en: "Eid al-Adha", description_ar: "عيد النحر في موسم الحج.", description_en: "The Festival of Sacrifice during the Hajj season.", hijri_month: 12, hijri_day: 10, kind: "eid", verification_status: "needs_verification" },
  { id: "laylat-al-qadr-19", slug: "laylat-al-qadr-19", title_ar: "ليلة القدر (١٩ رمضان)", title_en: "Laylat al-Qadr (19 Ramadan)", description_ar: "إحدى الليالي المحتملة لليلة القدر.", description_en: "One of the possible nights of Laylat al-Qadr.", hijri_month: 9, hijri_day: 19, kind: "other", verification_status: "needs_verification" },
  { id: "laylat-al-qadr-21", slug: "laylat-al-qadr-21", title_ar: "ليلة القدر (٢١ رمضان)", title_en: "Laylat al-Qadr (21 Ramadan)", description_ar: "إحدى الليالي المحتملة لليلة القدر، وذكرى استشهاد الإمام علي عليه السلام.", description_en: "One of the possible nights of Laylat al-Qadr; also the anniversary of Imam Ali's martyrdom.", hijri_month: 9, hijri_day: 21, kind: "shahadat", related_person: "imam-ali", verification_status: "needs_verification" },
  { id: "laylat-al-qadr-23", slug: "laylat-al-qadr-23", title_ar: "ليلة القدر (٢٣ رمضان)", title_en: "Laylat al-Qadr (23 Ramadan)", description_ar: "إحدى الليالي المحتملة لليلة القدر.", description_en: "One of the possible nights of Laylat al-Qadr.", hijri_month: 9, hijri_day: 23, kind: "other", verification_status: "needs_verification" },
  { id: "wiladat-al-mahdi", slug: "wiladat-al-mahdi", title_ar: "ولادة الإمام المهدي", title_en: "Wiladat Imam al-Mahdi", description_ar: "ذكرى ولادة الإمام الثاني عشر عجل الله فرجه.", description_en: "Commemorates the birth of the twelfth Imam.", hijri_month: 8, hijri_day: 15, kind: "wiladat", related_person: "imam-al-mahdi", verification_status: "needs_verification" },
  { id: "mawlid-al-nabi", slug: "mawlid-al-nabi", title_ar: "المولد النبوي الشريف", title_en: "Mawlid al-Nabi", description_ar: "ذكرى ولادة النبي محمد صلى الله عليه وآله.", description_en: "Commemorates the birth of the Prophet Muhammad.", hijri_month: 3, hijri_day: 17, kind: "wiladat", related_person: "prophet-muhammad", verification_status: "needs_verification" },
];

export function getOccasionsForDate(hijriMonth: number, hijriDay: number): Occasion[] {
  return occasions.filter((o) => o.hijri_month === hijriMonth && o.hijri_day === hijriDay);
}

export function getAllMasumeenOccasions() {
  return occasions;
}
