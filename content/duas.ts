import { ContentItem } from "./types";

/**
 * Dua Library. Two entries below carry real migrated text (see legacy.ts -
 * Dua al-Faraj and the Imam al-Jawad qunuts are duplicated here under the
 * library's category system so they're browsable from /duas as well as from
 * their legacy collection page). Everything else in the "vision" library that
 * we do NOT yet have verified sourced text for is listed with published:false
 * and verification_status "needs_verification" so the architecture exists
 * without fabricating sacred wording - see RELIGIOUS_CONTENT_REVIEW.md.
 */
export const duas: ContentItem[] = [
  {
    id: "dua-al-faraj-al-saghir",
    slug: "dua-al-faraj",
    type: "dua",
    category: ["forgiveness", "relief", "الفرج"],
    title_ar: "دعاء الفرج",
    title_en: "Dua al-Faraj",
    summary_ar: "دعاء مروي عن أمير المؤمنين علي عليه السلام لتفريج الهم والكرب.",
    summary_en: "A supplication narrated from Imam Ali for the relief of distress and hardship.",
    body: [
      {
        kind: "text",
        text_ar:
          "يا عِمادَ مَنْ لا عِمادَ لَهُ وَ يا ذُخْرَ مَنْ لا ذُخْرَ لَهُ وَيا سَنَدَ مَنْ لا سَنَدَ لَهُ وَيا حِرْزَ مَنْ لا حِرْزَ لَهُ وَيا غِياثَ مَنْ لا غِياثَ لَهُ وَيَا كَنْزَ مَنْ لا كَنْزَ لَهُ وَيَا عِزَّ مَنْ لا عِزَّ لَهُ، يَا كَريمَ الْعَفْوِ وَيا حَسَنَ التَّجاوز، يَا عَوْنَ الْضُعَفَاء يَا كَنْزَ الْفُقَرَاء يَا عَظِيمَ الْرَجَاء، يَا مُنْقِذَ الْغَرْقَى يَا مُنْجِيَ الْهَلْكَى، يَا مُحْسِنُ يَا مُجْمِلُ يَا مُنْعِمُ يَا مُفْضِلُ، أَنْتَ الَّذي سَجَدَ لَكَ سَوَادُ الْلَّيلِ وَنُوْرُ الْنَّهار وَضُوءُ الْقَمر وَشُعَاعُ الْشَّمس وَحَفيفُ الْشَّجر وَدَويُّ الماء، يَا اللهُ يَا اللهُ يَا اللهُ، لا إلهَ إلا أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، يَا رَبَّاهُ يَا اللهُ صَلِّ عَلَى مُحَمَّدٍ وَآَلِ مُحَمَّد وَافْعَل بِنَا مَـا أَنْتَ أَهْلُهُ.",
      },
    ],
    source: { name_ar: "الموقع الأصلي - omalbnin.com", name_en: "Original site - omalbnin.com" },
    verification_status: "site_original_media",
    reading_time_minutes: 2,
    featured: true,
    tags_ar: ["الفرج", "الكرب", "أمير المؤمنين"],
    tags_en: ["relief", "distress", "Imam Ali"],
    published: true,
    related_content: ["sofra-umm-al-banin"],
  },
  {
    id: "istighfar-common",
    slug: "istighfar",
    type: "dua",
    category: ["forgiveness", "الاستغفار"],
    title_ar: "الاستغفار",
    title_en: "Istighfar",
    summary_ar: "صيغة الاستغفار المتداولة «أَسْتَغْفِرُ اللهَ رَبِّي وَأَتُوبُ إِلَيْهِ»، مع مساحة للعدّاد.",
    summary_en: "The common Istighfar formula 'Astaghfirullaha Rabbi wa atubu ilayh', with a tally counter.",
    body: [
      {
        kind: "text",
        text_ar: "أَسْتَغْفِرُ اللهَ رَبِّي وَأَتُوبُ إِلَيْهِ.",
        text_en: "Astaghfir Allaha Rabbi wa atubu ilayh - I seek God's forgiveness, my Lord, and I turn to Him in repentance.",
      },
    ],
    source: {
      name_ar: "صيغة استغفار متداولة على نطاق واسع",
      name_en: "A widely-recited Istighfar formula",
    },
    verification_status: "traditional_practice",
    reading_time_minutes: 1,
    featured: true,
    tags_ar: ["الاستغفار", "التوبة"],
    tags_en: ["forgiveness", "repentance"],
    published: true,
  },
  {
    id: "salawat-common",
    slug: "salawat",
    type: "dua",
    category: ["salawat", "الصلاة على محمد وآل محمد"],
    title_ar: "الصلاة على محمد وآل محمد",
    title_en: "Salawat upon Muhammad and his Household",
    summary_ar: "صيغة الصلاة الإبراهيمية المتداولة، مع عدّاد خاص.",
    summary_en: "The commonly recited Salawat formula, with a dedicated counter.",
    body: [
      {
        kind: "text",
        text_ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ.",
        text_en: "Allahumma salli 'ala Muhammadin wa Aali Muhammad - O God, send blessings upon Muhammad and the family of Muhammad.",
      },
    ],
    source: { name_ar: "صيغة متداولة على نطاق واسع بين المسلمين", name_en: "A formula widely recited across the Muslim world" },
    verification_status: "traditional_practice",
    reading_time_minutes: 1,
    featured: true,
    tags_ar: ["الصلوات", "محمد وآل محمد"],
    tags_en: ["salawat", "blessings"],
    published: true,
  },
  // --- Architecture placeholders: named in the product brief, no verified
  // source text migrated into this project yet. Kept unpublished so nothing
  // fabricated ever reaches a visitor; ready for verified text to be added.
  {
    id: "dua-kumayl",
    slug: "dua-kumayl",
    type: "dua",
    category: ["rajab", "friday", "دعاء كميل"],
    title_ar: "دعاء كميل",
    title_en: "Dua Kumayl",
    summary_ar: "دعاء مروي عن الإمام علي عليه السلام لكميل بن زياد، يُستحب ليلة النصف من شعبان وليالي الجمعة.",
    summary_en: "A supplication taught by Imam Ali to Kumayl ibn Ziyad, recommended on the night of mid-Sha'ban and Thursday/Friday nights.",
    body: [
      {
        kind: "text",
        text_ar: "النص الكامل والمحقق لهذا الدعاء لم يُرفع بعد إلى هذا الموقع. سيُضاف فور توفر نسخة موثوقة تُقابَل مع طبعة معتمدة من مفاتيح الجنان.",
        text_en: "The complete, verified text of this supplication has not yet been added to this site. It will be published once checked against a reliable Mafatih al-Jinan edition.",
      },
    ],
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    weekday: "friday",
    tags_ar: ["دعاء كميل", "رجب"],
    tags_en: ["Dua Kumayl", "Rajab"],
    published: false,
  },
  {
    id: "dua-tawassul",
    slug: "dua-tawassul",
    type: "dua",
    category: ["tawassul", "دعاء التوسل"],
    title_ar: "دعاء التوسل",
    title_en: "Dua al-Tawassul",
    summary_ar: "دعاء التوسل بالمعصومين الأربعة عشر عليهم السلام.",
    summary_en: "A supplication invoking intercession through the Fourteen Infallibles.",
    body: [
      {
        kind: "text",
        text_ar: "النص الكامل والمحقق لهذا الدعاء لم يُرفع بعد إلى هذا الموقع.",
        text_en: "The complete, verified text of this supplication has not yet been added to this site.",
      },
    ],
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    tags_ar: ["التوسل"],
    tags_en: ["tawassul"],
    published: false,
  },
  {
    id: "dua-nudba",
    slug: "dua-nudba",
    type: "dua",
    category: ["friday", "imam-mahdi", "دعاء الندبة"],
    title_ar: "دعاء الندبة",
    title_en: "Dua al-Nudba",
    summary_ar: "دعاء يُستحب قراءته صباح كل جمعة، ويعبّر عن التوجع لغيبة الإمام المهدي عجل الله فرجه.",
    summary_en: "A supplication recommended every Friday morning, expressing yearning for the reappearance of Imam al-Mahdi.",
    body: [
      {
        kind: "text",
        text_ar: "النص الكامل والمحقق لهذا الدعاء لم يُرفع بعد إلى هذا الموقع.",
        text_en: "The complete, verified text of this supplication has not yet been added to this site.",
      },
    ],
    source: { name_ar: "مصدر يحتاج إلى تحقق", name_en: "Source attribution requires verification" },
    verification_status: "needs_verification",
    weekday: "friday",
    related_person: ["imam-al-mahdi"],
    tags_ar: ["دعاء الندبة", "الجمعة"],
    tags_en: ["Dua al-Nudba", "Friday"],
    published: false,
  },
];

export function getDuaBySlug(slug: string) {
  return duas.find((d) => d.slug === slug);
}
