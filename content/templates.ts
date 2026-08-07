import { BodyBlock } from "./types";

/**
 * Section skeletons ("divisions") for texts the site owner will write.
 *
 * These files deliberately contain NO devotional text. Every section ships
 * empty with `awaitingText: true`, and the reader renders a visible "awaiting
 * text" placeholder rather than a blank gap. Nothing here is ever auto-filled
 * from an outside source or from model knowledge: the owner types the Arabic,
 * from a printed Mafatih al-Jinan edition, and only then is `published` set to
 * true and `verification_status` raised to `primary_source`.
 *
 * The headings and recitation counts below are structural labels describing how
 * these texts are conventionally laid out. They are starting points, editable
 * and removable in the admin editor, not claims about the text itself.
 */

function section(
  heading_ar: string,
  heading_en: string,
  extra: Partial<BodyBlock> = {},
): BodyBlock {
  return {
    kind: "text",
    heading_ar,
    heading_en,
    text_ar: "",
    text_en: "",
    awaitingText: true,
    ...extra,
  };
}

export const divisionTemplates: Record<string, BodyBlock[]> = {
  "ziyarat-ashura": [
    section("آداب الزيارة", "Etiquette of the visitation", {
      note_ar: "تمهيد وآداب، وليس من متن الزيارة.",
      note_en: "Introductory etiquette, not part of the visitation text itself.",
    }),
    section("السلام على الإمام الحسين عليه السلام", "Salutation upon Imam Husayn"),
    section("اللعن", "The invocation against the oppressors", { repeat: 100 }),
    section("السلام", "The salutation", { repeat: 100 }),
    section("الدعاء بعد الزيارة", "Supplication after the visitation"),
    section("سجدة الزيارة", "The prostration"),
    section("دعاء علقمة", "Dua Alqama", {
      note_ar: "يُذكر بعد الزيارة، ويُثبت كقسم مستقل.",
      note_en: "Recited after the visitation and kept as its own section.",
    }),
  ],

  "ziyarat-abbas": [
    section("الإذن بالدخول", "Seeking permission to enter"),
    section("السلام على أبي الفضل العباس عليه السلام", "Salutation upon Abu al-Fadl al-Abbas"),
    section("الدعاء بعد الزيارة", "Supplication after the visitation"),
  ],

  "ziyarat-warith": [
    section("السلام", "The salutations"),
    section("الدعاء بعد الزيارة", "Supplication after the visitation"),
  ],

  "ziyarat-amin-allah": [
    section("متن الزيارة", "The visitation text"),
    section("الدعاء بعد الزيارة", "Supplication after the visitation"),
  ],

  "ziyarat-jamia-kabira": [
    section("الإذن بالدخول", "Seeking permission to enter"),
    section("التكبيرات", "The takbirat"),
    section("متن الزيارة", "The visitation text"),
    section("الدعاء بعد الزيارة", "Supplication after the visitation"),
  ],

  "dua-kumayl": [
    section("آداب الدعاء ووقته", "Etiquette and time of recitation", {
      note_ar: "تمهيد، وليس من متن الدعاء.",
      note_en: "Introductory note, not part of the supplication text.",
    }),
    section("متن الدعاء", "The supplication"),
  ],

  "dua-tawassul": [
    section("المقدمة", "Opening"),
    section("التوسل بالمعصومين عليهم السلام", "Tawassul through the Infallibles", {
      note_ar:
        "يُكرَّر النداء لكل معصوم. يمكن إبقاؤه قسماً واحداً أو تقسيمه إلى أربعة عشر قسماً في المحرر.",
      note_en:
        "The call is repeated for each Infallible. Keep as one section, or split into fourteen in the editor.",
    }),
    section("الدعاء الختامي", "Closing supplication"),
  ],

  "dua-nudba": [
    section("الحمد والثناء", "Praise and glorification"),
    section("ذكر الأنبياء عليهم السلام", "Mention of the Prophets"),
    section("ذكر أهل البيت عليهم السلام", "Mention of Ahl al-Bayt"),
    section("النداء والدعاء", "The call and supplication"),
  ],
};

/** Sections for an item that has no template yet. */
export const genericDivisions: BodyBlock[] = [
  section("المقدمة", "Opening"),
  section("المتن", "Main text"),
  section("الدعاء الختامي", "Closing supplication"),
];

export function divisionsFor(slug: string): BodyBlock[] {
  // Cloned so callers editing a returned array cannot mutate the template.
  return structuredClone(divisionTemplates[slug] ?? genericDivisions);
}
