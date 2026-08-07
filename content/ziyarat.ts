import { ContentItem } from "./types";
import { divisionsFor } from "./templates";

/**
 * Ziyarat Library index. Ziyarat Ashura, Ziyarat al-Abbas, and Ziyarat Umm
 * al-Banin / Sayyida Nafisa all have their full content in legacy.ts (they
 * are real migrated site content); this file re-exposes them under /ziyarat
 * plus lists well-known ziyarat the brief asks for that we do not yet have
 * verified text for (published:false placeholders, never fabricated).
 */
export const ziyaratPlaceholders: ContentItem[] = [
  {
    id: "ziyarat-warith",
    slug: "ziyarat-warith",
    type: "ziyara",
    category: ["karbala"],
    title_ar: "زيارة وارث",
    title_en: "Ziyarat Waritha",
    summary_ar: "إحدى زيارات الإمام الحسين عليه السلام المشهورة.",
    summary_en: "One of the well-known visitations of Imam Husayn.",
    body: divisionsFor("ziyarat-warith"),
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    related_person: ["imam-husayn"],
    published: false,
  },
  {
    id: "ziyarat-amin-allah",
    slug: "ziyarat-amin-allah",
    type: "ziyara",
    category: ["general"],
    title_ar: "زيارة أمين الله",
    title_en: "Ziyarat Amin Allah",
    summary_ar: "زيارة جامعة تُقرأ عند مراقد المعصومين عليهم السلام.",
    summary_en: "A general visitation recited at the shrines of the Infallibles.",
    body: divisionsFor("ziyarat-amin-allah"),
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    published: false,
  },
  {
    id: "ziyarat-jamia-kabira",
    slug: "ziyarat-jamia-kabira",
    type: "ziyara",
    category: ["general"],
    title_ar: "الزيارة الجامعة الكبيرة",
    title_en: "Ziyarat al-Jami'a al-Kabira",
    summary_ar: "زيارة جامعة منسوبة إلى الإمام علي الهادي عليه السلام.",
    summary_en: "A comprehensive visitation attributed to Imam Ali al-Hadi.",
    body: divisionsFor("ziyarat-jamia-kabira"),
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    related_person: ["imam-al-hadi"],
    published: false,
  },
];
