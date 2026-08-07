export interface WeekdayPractice {
  label_ar: string;
  label_en: string;
  duaSlug?: string; // links into the dua/ziyarat library where we have it
  note_ar?: string;
  note_en?: string;
}

export interface WeekdayProgram {
  key: string;
  title_ar: string;
  title_en: string;
  intro_ar: string;
  intro_en: string;
  practices: WeekdayPractice[];
}

/**
 * Day-specific devotional emphasis. We name practices that are broadly and
 * consistently associated with each day across Shia devotional literature
 * (principally Mafatih al-Jinan for Friday) WITHOUT inventing exact wording,
 * counts, or claimed rewards we have not verified. Every practice links to
 * a library entry - many of which are still "coming soon" placeholders
 * (see content/duas.ts, content/ziyarat.ts) rather than fabricated text.
 */
export const weekdayPrograms: Record<string, WeekdayProgram> = {
  sunday: {
    key: "sunday",
    title_ar: "يوم الأحد",
    title_en: "Sunday",
    intro_ar: "يواظب كثير من المؤمنين على الاستغفار والصلاة على محمد وآل محمد في مطلع كل أسبوع.",
    intro_en: "Many believers begin the week with Istighfar and Salawat.",
    practices: [
      { label_ar: "الاستغفار", label_en: "Istighfar", duaSlug: "istighfar" },
      { label_ar: "الصلاة على محمد وآل محمد", label_en: "Salawat", duaSlug: "salawat" },
    ],
  },
  monday: {
    key: "monday",
    title_ar: "يوم الإثنين",
    title_en: "Monday",
    intro_ar: "يوم وُلد فيه النبي محمد صلى الله عليه وآله بحسب الروايات المشهورة.",
    intro_en: "Traditionally associated with the Prophet's birth.",
    practices: [{ label_ar: "الصلاة على محمد وآل محمد", label_en: "Salawat", duaSlug: "salawat" }],
  },
  tuesday: {
    key: "tuesday",
    title_ar: "يوم الثلاثاء",
    title_en: "Tuesday",
    intro_ar: "الاستغفار وذكر الله من العبادات المستحبة في كل يوم، ومنه الثلاثاء.",
    intro_en: "Istighfar and remembrance of God remain recommended every day, Tuesday included.",
    practices: [{ label_ar: "الاستغفار", label_en: "Istighfar", duaSlug: "istighfar" }],
  },
  wednesday: {
    key: "wednesday",
    title_ar: "يوم الأربعاء",
    title_en: "Wednesday",
    intro_ar: "مساء الأربعاء هو ليلة الخميس، وهي مقدمة لأعمال يوم الجمعة عند كثير من المؤمنين.",
    intro_en: "Wednesday evening begins the night before Thursday/Friday, when many believers start their Friday preparations.",
    practices: [{ label_ar: "التهيؤ لأعمال ليلة الجمعة", label_en: "Preparing for Thursday/Friday night practices", duaSlug: undefined }],
  },
  thursday: {
    key: "thursday",
    title_ar: "يوم الخميس",
    title_en: "Thursday",
    intro_ar: "ليلة الجمعة (مساء الخميس) من الأوقات التي يُستحب فيها دعاء كميل عند كثير من المؤمنين.",
    intro_en: "Thursday night (the eve of Friday) is when many believers recite Dua Kumayl.",
    practices: [{ label_ar: "دعاء كميل", label_en: "Dua Kumayl", duaSlug: "dua-kumayl" }],
  },
  friday: {
    key: "friday",
    title_ar: "يوم الجمعة",
    title_en: "Friday",
    intro_ar:
      "يوم الجمعة له مكانة خاصة في المصادر الشيعية وعلى رأسها مفاتيح الجنان، التي خصّصت له مجموعة واسعة من الأعمال والأدعية والزيارات.",
    intro_en:
      "Friday holds special standing in Shia devotional sources, foremost Mafatih al-Jinan, which dedicates an extensive set of practices, supplications, and visitations to it.",
    practices: [
      { label_ar: "دعاء الندبة (صباح الجمعة)", label_en: "Dua al-Nudba (Friday morning)", duaSlug: "dua-nudba" },
      { label_ar: "زيارة عاشوراء", label_en: "Ziyarat Ashura", duaSlug: "ziyarat-ashura" },
      { label_ar: "زيارة الإمام الحسين عليه السلام", label_en: "Ziyarat Imam Husayn", duaSlug: "ziyarat-ashura" },
      { label_ar: "الصلاة على محمد وآل محمد بإكثار", label_en: "Abundant Salawat", duaSlug: "salawat" },
      { label_ar: "الاستغفار", label_en: "Istighfar", duaSlug: "istighfar" },
      { label_ar: "دعاء كميل (ليلة الجمعة)", label_en: "Dua Kumayl (Thursday night)", duaSlug: "dua-kumayl" },
      { label_ar: "تذكر الإمام المهدي عجل الله فرجه", label_en: "Remembrance of Imam al-Mahdi", duaSlug: "dua-nudba" },
      {
        label_ar: "قراءة القرآن (سورة الكهف)",
        label_en: "Qur'an recitation (Surah al-Kahf)",
        note_ar: "من العادات المتداولة على نطاق واسع صباح كل جمعة.",
        note_en: "A widely-observed Friday morning practice.",
      },
    ],
  },
  saturday: {
    key: "saturday",
    title_ar: "يوم السبت",
    title_en: "Saturday",
    intro_ar: "استمرار الأذكار والاستغفار المعتاد.",
    intro_en: "Ordinary daily remembrance and Istighfar continue.",
    practices: [{ label_ar: "الاستغفار", label_en: "Istighfar", duaSlug: "istighfar" }],
  },
};
