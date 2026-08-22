import { ContentItem } from "./types";

/**
 * Editable page content.
 *
 * Pages such as Mafatih al-Jinan, Friday and Umm al-Banin had their prose
 * written directly into the JSX, which meant the owner could not change a word
 * of it without editing code. Each such page now has an entry here, is listed
 * in the admin dashboard like any dua or ziyara, and renders through LiveReader
 * so a saved edit replaces the text below.
 *
 * The structural parts of those pages (the weekday list, the practice cards,
 * the collection grid) stay in code, since they are layout rather than prose.
 *
 * Text below is the existing wording moved verbatim out of the components. It
 * is descriptive site copy, not religious text.
 */
export const pageContent: ContentItem[] = [
  {
    id: "page-sources",
    slug: "page-sources",
    type: "article",
    category: ["page"],
    title_ar: "صفحة المصادر",
    title_en: "Sources page",
    summary_ar: "شرح كل شارة توثيق تظهر على النصوص الدينية في الموقع.",
    summary_en: "What each verification badge on the site's religious texts means.",
    body: [
      {
        kind: "text",
        text_ar: "كل نص ديني على هذا الموقع يحمل إحدى الشارات التالية:",
        text_en: "Every religious text on this site carries one of the following badges:",
      },
      {
        kind: "text",
        badge: "site_original_media",
        text_ar: "محتوى محفوظ حرفيًا من الموقع الأصلي omalbnin.com دون أي تعديل على النص الديني.",
        text_en: "Content preserved verbatim from the original omalbnin.com, with no edits to the religious text.",
      },
      {
        kind: "text",
        badge: "traditional_practice",
        text_ar: "ممارسة تعبدية متداولة، غير منسوبة مباشرة إلى مفاتيح الجنان أو مصدر أساسي محدد.",
        text_en: "A devotional practice as transmitted, not directly attributed to Mafatih al-Jinan or a specific primary source.",
      },
      {
        kind: "text",
        badge: "needs_verification",
        text_ar: "لم تُحقَّق نسبة هذا المحتوى أو صحة نصه بعد؛ لا يُنشر نص ديني كامل حتى يتم ذلك.",
        text_en: "This content's attribution or exact wording has not yet been verified; no full religious text is published until it is.",
      },
      {
        kind: "text",
        badge: "primary_source",
        text_ar: "تمت مطابقة النص مع مصدر أساسي محدد بالاسم (مثل طبعة معتمدة من مفاتيح الجنان).",
        text_en: "The text has been checked against a named primary source (e.g. a trusted Mafatih al-Jinan edition).",
      },
    ],
    verification_status: "site_original_media",
    published: true,
  },
  {
    id: "page-mafatih",
    slug: "page-mafatih",
    type: "article",
    category: ["page"],
    title_ar: "صفحة مفاتيح الجنان (المقدمة)",
    title_en: "Mafatih al-Jinan page (introduction)",
    summary_ar: "النص التعريفي الظاهر أعلى صفحة مفاتيح الجنان.",
    summary_en: "The introductory text shown at the top of the Mafatih al-Jinan page.",
    body: [
      {
        kind: "text",
        text_ar:
          "مفاتيح الجنان مرجع جامع للأدعية والزيارات وأعمال الأيام والشهور. هذا القسم هو الهيكل التنظيمي لهذا المحتوى على الموقع؛ كل عنصر يحمل توثيقًا لمصدره، وما لم نُحقق نصه بعد يظهر بوضوح كذلك بدلًا من اختلاق نص.",
        text_en:
          "Mafatih al-Jinan is a comprehensive reference for supplications, visitations, and the practices of days and months. This section is this site's organizing structure for that material; every item carries source documentation, and anything not yet verified is clearly marked as such rather than invented.",
      },
      {
        kind: "text",
        text_ar:
          "ملاحظة: النصوص الكاملة المحققة لمعظم أدعية وزيارات مفاتيح الجنان لم تُرفع بعد إلى هذا الموقع في هذه المرحلة. توجد بنية تنظيمية كاملة جاهزة لاستقبالها.",
        text_en:
          "Note: fully verified text for most Mafatih al-Jinan duas and ziyarat has not been added to this site at this stage. The full organizational structure is ready to receive it.",
      },
    ],
    verification_status: "site_original_media",
    published: true,
  },
  {
    id: "page-friday",
    slug: "page-friday",
    type: "article",
    category: ["page"],
    title_ar: "صفحة الجمعة (الملاحظة الختامية)",
    title_en: "Friday page (closing note)",
    summary_ar: "الملاحظة المتعلقة بالمصدر أسفل صفحة أعمال يوم الجمعة.",
    summary_en: "The source note at the bottom of the Friday practices page.",
    body: [
      {
        kind: "text",
        text_ar:
          "المرجع الأساسي المعتمد لأعمال يوم الجمعة هو مفاتيح الجنان. بعض العناصر أعلاه لا تزال بانتظار رفع نص محقق (انظر شارة كل عنصر).",
        text_en:
          "The principal reference for Friday practices is Mafatih al-Jinan. Some items above are still awaiting a verified uploaded text (see each item's badge).",
      },
    ],
    verification_status: "site_original_media",
    published: true,
  },
  {
    id: "page-umm-al-banin",
    slug: "page-umm-al-banin",
    type: "article",
    category: ["page"],
    title_ar: "صفحة أم البنين (التعريف)",
    title_en: "Umm al-Banin page (introduction)",
    summary_ar: "النص التعريفي بالسيدة أم البنين عليها السلام.",
    summary_en: "The introductory text about Lady Umm al-Banin.",
    body: [
      {
        kind: "text",
        text_ar:
          "فاطمة بنت حزام الكلابية، المعروفة بأم البنين، زوجة أمير المؤمنين علي عليه السلام بعد وفاة السيدة فاطمة الزهراء عليها السلام، وأم العباس وجعفر وعبد الله وعثمان الذين استُشهدوا جميعًا في كربلاء نصرةً للإمام الحسين عليه السلام. عُرفت بوفائها العميق لأهل البيت، وبقيت هذا الموقع أصلًا مكرَّسًا لتكريمها منذ نشأته.",
        text_en:
          "Fatimah bint Hizam al-Kilabiyya, known as Umm al-Banin, was the wife of Imam Ali after Lady Fatimah al-Zahra's passing, and mother to al-Abbas, Ja'far, Abdullah and Uthman - all martyred at Karbala in support of Imam Husayn. She is remembered for her profound loyalty to Ahl al-Bayt, and this site began as a dedicated tribute to her.",
      },
    ],
    verification_status: "site_original_media",
    published: true,
  },
];

export function getPageContent(slug: string): ContentItem | undefined {
  return pageContent.find((p) => p.slug === slug);
}
