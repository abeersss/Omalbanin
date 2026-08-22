import { ContentItem, Masum } from "./types";

/**
 * Biographical dates below follow the dates most commonly cited in mainstream
 * Shia Ithna Ashari sources. Minor variations exist between scholars/editions.
 * verification_status is deliberately "needs_verification" for every entry -
 * see RELIGIOUS_CONTENT_REVIEW.md. Teaching notes describe well-known emphases
 * rather than quoting exact wording we cannot cross-check in this project yet.
 */
export const masumeen: Masum[] = [
  {
    id: "prophet-muhammad",
    slug: "prophet-muhammad",
    order: 1,
    name_ar: "النبي محمد صلى الله عليه وآله",
    name_en: "Prophet Muhammad ﷺ",
    title_ar: "خاتم الأنبياء والمرسلين",
    title_en: "Seal of the Prophets",
    kunya_ar: "أبو القاسم",
    kunya_en: "Abu al-Qasim",
    birth_ar: "١٧ ربيع الأول، عام الفيل (مكة المكرمة)",
    birth_en: "17 Rabi al-Awwal, the Year of the Elephant (Mecca)",
    martyrdom_ar: "٢٨ صفر، ١١ هـ (المدينة المنورة)",
    martyrdom_en: "28 Safar, 11 AH (Medina)",
    relation_ar: "خاتم الأنبياء، جد الأئمة عليهم السلام",
    relation_en: "Seal of the Prophets; forefather of the Imams",
    bio_ar:
      "هو محمد بن عبد الله، خاتم الأنبياء والمرسلين، بعثه الله رحمة للعالمين وحامل الرسالة الخاتمة. نشأ يتيمًا في مكة، وعُرف بالصدق والأمانة قبل البعثة، ثم أوحي إليه في غار حراء وهو ابن أربعين عامًا. دعا إلى التوحيد وأسس أمة الإسلام، وهاجر إلى المدينة، ونصّب علي بن أبي طالب عليه السلام وليًا من بعده في غدير خم بحسب ما ترويه المصادر الشيعية.",
    bio_en:
      "Muhammad ibn Abdullah, the final Messenger of God, was raised an orphan in Mecca and known for his truthfulness before receiving revelation at age forty in the Cave of Hira. He established the message of Islamic monotheism, migrated to Medina, and - as related in Shia sources - designated Ali ibn Abi Talib as his successor at Ghadir Khumm.",
    teachings: [
      {
        text_ar: "التأكيد على وحدة الله ورسالة الأخلاق ورحمته بالعالمين، وربط النجاة بالتمسك بالثقلين: كتاب الله وأهل بيته.",
        text_en:
          "Emphasis on the oneness of God, universal mercy and ethics, and - per Shia tradition - linking guidance after him to holding fast to 'the two weighty things': the Qur'an and his household.",
      },
    ],
    related_content: ["hadith-al-kisa", "ziyarat-jamia-kabira"],
    occasions: [
      { label_ar: "المولد النبوي الشريف", label_en: "Mawlid al-Nabi", hijri_month: 3, hijri_day: 17 },
      { label_ar: "المبعث النبوي", label_en: "Mab'ath", hijri_month: 7, hijri_day: 27 },
    ],
    verification_status: "needs_verification",
  },
  {
    id: "fatimah-al-zahra",
    slug: "fatimah-al-zahra",
    order: 2,
    name_ar: "السيدة فاطمة الزهراء عليها السلام",
    name_en: "Lady Fatimah al-Zahra (peace be upon her)",
    title_ar: "سيدة نساء العالمين",
    title_en: "Mistress of the Women of the Worlds",
    kunya_ar: "أم أبيها",
    kunya_en: "Umm Abiha",
    birth_ar: "٢٠ جمادى الآخرة، ٥ بعد البعثة (مكة)",
    birth_en: "20 Jumada al-Thani, 5 years after the Bi'tha (Mecca)",
    martyrdom_ar: "٣ جمادى الآخرة، ١١ هـ (المدينة، بحسب الرواية الأشهر)",
    martyrdom_en: "3 Jumada al-Thani, 11 AH (Medina, per the most commonly cited narration)",
    relation_ar: "ابنة النبي محمد صلى الله عليه وآله، زوجة الإمام علي، أم الحسن والحسين عليهم السلام",
    relation_en: "Daughter of the Prophet; wife of Imam Ali; mother of Hasan and Husayn",
    bio_ar:
      "فاطمة بنت رسول الله، أصغر بناته وأحبهن إليه، تزوجت من الإمام علي بن أبي طالب عليه السلام. أنجبت الحسن والحسين وزينب وأم كلثوم. تُروى عنها المرتبة الرفيعة عند الله وعصمتها ضمن أهل الكساء، وشدة تعلقها بالصلاة والعبادة والزهد، ودورها بعد وفاة النبي في الدفاع عن حق أهل البيت.",
    bio_en:
      "Fatimah, the Prophet's youngest and most beloved daughter, married Ali ibn Abi Talib. She was mother to Hasan, Husayn, Zaynab and Umm Kulthum. Shia sources describe her elevated station and infallibility as one of the Ahl al-Kisa, her devotion to prayer, and her role defending the rights of Ahl al-Bayt after the Prophet's passing.",
    teachings: [
      {
        text_ar: "تمسكها بالحق ودفاعها عنه، وقدوتها في العبادة والزهد والصبر.",
        text_en: "Steadfast defense of truth, and a model of worship, simplicity, and patience.",
      },
    ],
    related_content: ["hadith-al-kisa"],
    occasions: [{ label_ar: "استشهاد السيدة فاطمة الزهراء", label_en: "Shahadat of Lady Fatimah", hijri_month: 6, hijri_day: 3 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-ali",
    slug: "imam-ali",
    order: 3,
    name_ar: "الإمام علي بن أبي طالب عليه السلام",
    name_en: "Imam Ali ibn Abi Talib",
    title_ar: "أمير المؤمنين",
    title_en: "Commander of the Faithful",
    kunya_ar: "أبو الحسن",
    kunya_en: "Abu al-Hasan",
    birth_ar: "١٣ رجب (داخل الكعبة، بحسب الرواية المشهورة)",
    birth_en: "13 Rajab (inside the Ka'bah, per the well-known narration)",
    martyrdom_ar: "٢١ رمضان، ٤٠ هـ (الكوفة)",
    martyrdom_en: "21 Ramadan, 40 AH (Kufa)",
    relation_ar: "ابن عم النبي وصهره وزوج فاطمة الزهراء، الإمام الأول",
    relation_en: "The Prophet's cousin and son-in-law; husband of Fatimah; the first Imam",
    bio_ar:
      "أول من آمن من الرجال، ورفيق النبي في مسيرته كلها، وزوج فاطمة الزهراء عليها السلام. بحسب المصدر الشيعي، نُصّ عليه بالخلافة يوم غدير خم. تولى الخلافة بعد عثمان وواجه حروبًا داخلية (الجمل وصفين والنهروان)، واستشهد بضربة سيف وهو ساجد في محراب الكوفة.",
    bio_en:
      "The first male believer and the Prophet's constant companion, and husband of Fatimah al-Zahra. Shia sources hold that he was explicitly designated successor at Ghadir Khumm. He assumed the caliphate after Uthman, faced internal conflicts (Jamal, Siffin, Nahrawan), and was martyred by a sword strike while prostrating in prayer at the mosque of Kufa.",
    teachings: [
      {
        text_ar: "خطبه ورسائله المجموعة في نهج البلاغة تتناول العدل والزهد وأصول الحكم الرشيد.",
        text_en: "His sermons and letters, collected in Nahj al-Balagha, address justice, simplicity, and principles of just governance.",
      },
    ],
    related_content: ["dua-kumayl"],
    occasions: [
      { label_ar: "عيد الغدير", label_en: "Eid al-Ghadir", hijri_month: 12, hijri_day: 18 },
      { label_ar: "استشهاد الإمام علي", label_en: "Shahadat of Imam Ali", hijri_month: 9, hijri_day: 21 },
    ],
    verification_status: "needs_verification",
  },
  {
    id: "imam-hasan",
    slug: "imam-hasan",
    order: 4,
    name_ar: "الإمام الحسن المجتبى عليه السلام",
    name_en: "Imam Hasan al-Mujtaba",
    title_ar: "المجتبى، سبط رسول الله",
    title_en: "Al-Mujtaba, grandson of the Prophet",
    kunya_ar: "أبو محمد",
    kunya_en: "Abu Muhammad",
    birth_ar: "١٥ رمضان، ٣ هـ (المدينة)",
    birth_en: "15 Ramadan, 3 AH (Medina)",
    martyrdom_ar: "٧ صفر، ٥٠ هـ (المدينة، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "7 Safar, 50 AH (Medina; by poisoning, per Shia narration)",
    relation_ar: "الابن الأكبر للإمام علي وفاطمة الزهراء، الإمام الثاني",
    relation_en: "Eldest son of Imam Ali and Fatimah; the second Imam",
    bio_ar:
      "تولى الإمامة بعد استشهاد أبيه، وعقد صلحًا مع معاوية حقن به دماء المسلمين في ظرف سياسي بالغ التعقيد. عُرف بحلمه وكرمه وعبادته، واستُشهد مسمومًا، ودُفن في البقيع بالمدينة المنورة.",
    bio_en:
      "He assumed the Imamate after his father's martyrdom and concluded a truce with Mu'awiya to preserve Muslim lives amid a highly volatile political landscape. Known for his forbearance, generosity and devotion, he was martyred by poisoning and buried in al-Baqi', Medina.",
    teachings: [
      {
        text_ar: "الصبر السياسي وحفظ وحدة الأمة، والكرم المعروف عنه في السيرة.",
        text_en: "Political patience and preservation of communal unity, and the generosity attributed to him throughout his biography.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الحسن", label_en: "Shahadat of Imam Hasan", hijri_month: 2, hijri_day: 7 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-husayn",
    slug: "imam-husayn",
    order: 5,
    name_ar: "الإمام الحسين عليه السلام",
    name_en: "Imam Husayn",
    title_ar: "سيد الشهداء",
    title_en: "Master of the Martyrs",
    kunya_ar: "أبو عبد الله",
    kunya_en: "Abu Abdillah",
    birth_ar: "٣ شعبان، ٤ هـ (المدينة)",
    birth_en: "3 Sha'ban, 4 AH (Medina)",
    martyrdom_ar: "١٠ محرم، ٦١ هـ - يوم عاشوراء (كربلاء)",
    martyrdom_en: "10 Muharram, 61 AH - the Day of Ashura (Karbala)",
    relation_ar: "الابن الثاني للإمام علي وفاطمة الزهراء، الإمام الثالث",
    relation_en: "Second son of Imam Ali and Fatimah; the third Imam",
    bio_ar:
      "رفض مبايعة يزيد بن معاوية وخرج من المدينة إلى مكة ثم نحو الكوفة تلبيةً لدعوة أهلها، فحوصر في كربلاء واستُشهد مع أهل بيته وأصحابه يوم عاشوراء عام 61هـ في واقعة كربلاء التي تمثل محورًا أساسيًا في العقيدة والوجدان الشيعي، وسُبيت نساؤه وأطفاله بعد المعركة.",
    bio_en:
      "He refused to pledge allegiance to Yazid ibn Mu'awiya, departing Medina for Mecca and then toward Kufa at its people's invitation. Besieged at Karbala, he was martyred with his family and companions on the Day of Ashura, 61 AH - an event central to Shia faith and devotional life - after which the surviving women and children were taken captive.",
    teachings: [
      {
        text_ar: "الوقوف في وجه الظلم ولو كلّف كل شيء، وهو المعنى المركزي في زيارة عاشوراء وسائر زيارات كربلاء.",
        text_en: "Standing against injustice whatever the cost - the central theme of Ziyarat Ashura and the Karbala visitations.",
      },
    ],
    related_content: ["ziyarat-ashura"],
    occasions: [
      { label_ar: "عاشوراء", label_en: "Ashura", hijri_month: 1, hijri_day: 10 },
      { label_ar: "الأربعين", label_en: "Arba'een", hijri_month: 2, hijri_day: 20 },
    ],
    verification_status: "needs_verification",
  },
  {
    id: "imam-zayn-al-abidin",
    slug: "imam-zayn-al-abidin",
    order: 6,
    name_ar: "الإمام علي زين العابدين عليه السلام",
    name_en: "Imam Ali Zayn al-Abidin",
    title_ar: "زين العابدين، السجاد",
    title_en: "Zayn al-Abidin, al-Sajjad",
    kunya_ar: "أبو محمد",
    kunya_en: "Abu Muhammad",
    birth_ar: "٥ شعبان، ٣٨ هـ (المدينة)",
    birth_en: "5 Sha'ban, 38 AH (Medina)",
    martyrdom_ar: "٢٥ محرم، ٩٥ هـ (المدينة، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "25 Muharram, 95 AH (Medina; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام الحسين، الإمام الرابع",
    relation_en: "Son of Imam Husayn; the fourth Imam",
    bio_ar:
      "نجا من مجزرة كربلاء بسبب مرضه، وسُبي مع النساء إلى الشام ثم عاد إلى المدينة. عُرف بكثرة سجوده وعبادته حتى لُقّب بالسجاد وزين العابدين، وتُروى عنه مجموعة الأدعية المعروفة بالصحيفة السجادية.",
    bio_en:
      "He survived the Karbala massacre due to illness, was taken captive to Damascus with the women, and later returned to Medina. Known for extensive prostration and worship - hence his titles al-Sajjad and Zayn al-Abidin - he is the source to whom the collection of supplications known as al-Sahifa al-Sajjadiyya is attributed.",
    teachings: [
      {
        text_ar: "منهج الدعاء والمناجاة كوسيلة تربوية، كما تجسّد في الصحيفة السجادية.",
        text_en: "A pedagogy of supplication and intimate conversation with God, embodied in al-Sahifa al-Sajjadiyya.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام زين العابدين", label_en: "Shahadat of Imam Zayn al-Abidin", hijri_month: 1, hijri_day: 25 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-baqir",
    slug: "imam-al-baqir",
    order: 7,
    name_ar: "الإمام محمد الباقر عليه السلام",
    name_en: "Imam Muhammad al-Baqir",
    title_ar: "الباقر",
    title_en: "Al-Baqir (the one who splits knowledge open)",
    kunya_ar: "أبو جعفر",
    kunya_en: "Abu Ja'far",
    birth_ar: "١ رجب، ٥٧ هـ (المدينة)",
    birth_en: "1 Rajab, 57 AH (Medina)",
    martyrdom_ar: "٧ ذو الحجة، ١١٤ هـ (المدينة، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "7 Dhu al-Hijjah, 114 AH (Medina; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام زين العابدين، الإمام الخامس",
    relation_en: "Son of Imam Zayn al-Abidin; the fifth Imam",
    bio_ar:
      "عاصر فترة ضعف نسبي في قبضة الدولة الأموية، فتفرغ لبثّ العلم وتأسيس حلقات فقهية وحديثية اتسع فيها عدد تلامذته، ولُقّب بالباقر لتعمقه في العلم وشقّه له شقًا.",
    bio_en:
      "Living through a period of relative weakness in Umayyad control, he devoted himself to teaching and founded circles of jurisprudence and hadith that drew a wide circle of students - earning the title al-Baqir, 'the one who splits knowledge open.'",
    teachings: [
      {
        text_ar: "توسيع العمل العلمي والفقهي بين الشيعة، وتأسيس الأرضية لمدرسة الإمام الصادق من بعده.",
        text_en: "Expanding scholarly and juristic activity among Shia Muslims, laying groundwork for Imam al-Sadiq's school that followed.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الباقر", label_en: "Shahadat of Imam al-Baqir", hijri_month: 12, hijri_day: 7 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-sadiq",
    slug: "imam-al-sadiq",
    order: 8,
    name_ar: "الإمام جعفر الصادق عليه السلام",
    name_en: "Imam Ja'far al-Sadiq",
    title_ar: "الصادق",
    title_en: "Al-Sadiq (the truthful)",
    kunya_ar: "أبو عبد الله",
    kunya_en: "Abu Abdillah",
    birth_ar: "١٧ ربيع الأول، ٨٣ هـ (المدينة)",
    birth_en: "17 Rabi al-Awwal, 83 AH (Medina)",
    martyrdom_ar: "٢٥ شوال، ١٤٨ هـ (المدينة، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "25 Shawwal, 148 AH (Medina; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام محمد الباقر، الإمام السادس",
    relation_en: "Son of Imam Muhammad al-Baqir; the sixth Imam",
    bio_ar:
      "استفاد من الفراغ السياسي بين سقوط الدولة الأموية وقيام العباسية ليؤسس أوسع مدرسة فقهية وحديثية في تاريخ التشيع، وتخرج على يديه آلاف الرواة، حتى نُسب إليه المذهب الفقهي الجعفري.",
    bio_en:
      "Taking advantage of the political vacuum between the fall of the Umayyads and the rise of the Abbasids, he built the broadest school of jurisprudence and hadith transmission in Shia history, training thousands of narrators - the Ja'fari school of law is named after him.",
    teachings: [
      {
        text_ar: "تدوين الفقه والحديث الشيعي بشكل منهجي واسع.",
        text_en: "Systematic, wide-scale codification of Shia jurisprudence and hadith.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الصادق", label_en: "Shahadat of Imam al-Sadiq", hijri_month: 10, hijri_day: 25 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-musa-al-kazim",
    slug: "imam-musa-al-kazim",
    order: 9,
    name_ar: "الإمام موسى الكاظم عليه السلام",
    name_en: "Imam Musa al-Kazim",
    title_ar: "الكاظم",
    title_en: "Al-Kazim (the one who suppresses anger)",
    kunya_ar: "أبو الحسن",
    kunya_en: "Abu al-Hasan",
    birth_ar: "٧ صفر، ١٢٨ هـ (المدينة)",
    birth_en: "7 Safar, 128 AH (Medina)",
    martyrdom_ar: "٢٥ رجب، ١٨٣ هـ (سجن بغداد، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "25 Rajab, 183 AH (imprisoned in Baghdad; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام جعفر الصادق، الإمام السابع",
    relation_en: "Son of Imam Ja'far al-Sadiq; the seventh Imam",
    bio_ar:
      "عاصر بداية الدولة العباسية وتشدد الرقابة على أئمة أهل البيت، فسُجن مرارًا من قبل هارون الرشيد وتوفي في سجن بغداد. عُرف بحلمه الشديد حتى لُقّب بالكاظم.",
    bio_en:
      "Living under the early Abbasid state's tightening surveillance of the Imams, he was repeatedly imprisoned by Harun al-Rashid and died in a Baghdad prison. Known for his extraordinary forbearance, earning him the title al-Kazim.",
    teachings: [
      {
        text_ar: "الصبر في وجه القمع السياسي مع الاستمرار في التوجيه الروحي لأتباعه من داخل السجن.",
        text_en: "Endurance under political repression while continuing spiritual guidance for followers, even from prison.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الكاظم", label_en: "Shahadat of Imam al-Kazim", hijri_month: 7, hijri_day: 25 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-rida",
    slug: "imam-al-rida",
    order: 10,
    name_ar: "الإمام علي الرضا عليه السلام",
    name_en: "Imam Ali al-Rida",
    title_ar: "الرضا",
    title_en: "Al-Rida",
    kunya_ar: "أبو الحسن",
    kunya_en: "Abu al-Hasan",
    birth_ar: "١١ ذو القعدة، ١٤٨ هـ (المدينة)",
    birth_en: "11 Dhu al-Qi'dah, 148 AH (Medina)",
    martyrdom_ar: "آخر صفر، ٢٠٣ هـ (طوس/مشهد، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "end of Safar, 203 AH (Tus/Mashhad; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام موسى الكاظم، الإمام الثامن",
    relation_en: "Son of Imam Musa al-Kazim; the eighth Imam",
    bio_ar:
      "استُدعي من المدينة إلى خراسان من قِبَل الخليفة العباسي المأمون وعُيّن وليًا للعهد في ترتيب سياسي مثير للجدل، وتوفي بمدينة طوس (مشهد حاليًا) حيث يقع مرقده الذي يزوره ملايين الشيعة سنويًا.",
    bio_en:
      "Summoned from Medina to Khorasan by the Abbasid caliph al-Ma'mun and appointed crown prince in a politically contentious arrangement, he died in Tus (present-day Mashhad), where his shrine is visited by millions of Shia pilgrims annually.",
    teachings: [
      {
        text_ar: "مناظراته الفكرية المروية مع أصحاب الديانات والمذاهب المختلفة دفاعًا عن العقيدة.",
        text_en: "His recorded theological debates defending the faith against various religious and doctrinal positions.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الرضا", label_en: "Shahadat of Imam al-Rida", hijri_month: 2, hijri_day: 29 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-jawad",
    slug: "imam-al-jawad",
    order: 11,
    name_ar: "الإمام محمد الجواد عليه السلام",
    name_en: "Imam Muhammad al-Jawad",
    title_ar: "الجواد، التقي",
    title_en: "Al-Jawad, al-Taqi",
    kunya_ar: "أبو جعفر",
    kunya_en: "Abu Ja'far",
    birth_ar: "١٠ رجب، ١٩٥ هـ (المدينة)",
    birth_en: "10 Rajab, 195 AH (Medina)",
    martyrdom_ar: "آخر ذو القعدة، ٢٢٠ هـ (بغداد، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "end of Dhu al-Qi'dah, 220 AH (Baghdad; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام علي الرضا، الإمام التاسع",
    relation_en: "Son of Imam Ali al-Rida; the ninth Imam",
    bio_ar:
      "تولى الإمامة وهو في سن مبكرة (نحو السابعة)، ما جعله موضع اختبار من علماء عصره في مناظرات عامة أثبت فيها علمه، وتُروى عنه قنوتان مأثوران محفوظان على هذا الموقع. توفي في بغداد ودُفن في الكاظمية إلى جانب جده الإمام الكاظم.",
    bio_en:
      "He assumed the Imamate at a young age (around seven), which made him the subject of public examination by scholars of his time - debates in which his knowledge was affirmed. Two supplications (qunut) attributed to him are preserved on this site. He died in Baghdad and is buried in al-Kazimiyya beside his grandfather Imam al-Kazim.",
    teachings: [
      {
        text_ar: "قنوتاه المحفوظان يتضمنان الثناء على الله والتوسل بالفرج، وهما من محتوى هذا الموقع الأصلي.",
        text_en: "His two preserved qunut supplications - praise of God and supplication for relief - are part of this site's original migrated content.",
      },
    ],
    related_content: ["imam-al-jawad-qunut"],
    occasions: [{ label_ar: "استشهاد الإمام الجواد", label_en: "Shahadat of Imam al-Jawad", hijri_month: 11, hijri_day: 29 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-hadi",
    slug: "imam-al-hadi",
    order: 12,
    name_ar: "الإمام علي الهادي عليه السلام",
    name_en: "Imam Ali al-Hadi",
    title_ar: "الهادي، النقي",
    title_en: "Al-Hadi, al-Naqi",
    kunya_ar: "أبو الحسن",
    kunya_en: "Abu al-Hasan",
    birth_ar: "٢ رجب، ٢١٢ هـ (المدينة)",
    birth_en: "2 Rajab, 212 AH (Medina)",
    martyrdom_ar: "٣ رجب، ٢٥٤ هـ (سامراء، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "3 Rajab, 254 AH (Samarra; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام محمد الجواد، الإمام العاشر",
    relation_en: "Son of Imam Muhammad al-Jawad; the tenth Imam",
    bio_ar:
      "استدعاه الخليفة العباسي المتوكل من المدينة إلى سامراء ليبقيه تحت الرقابة المباشرة، فأمضى معظم إمامته هناك في ظروف مراقبة مشددة، وتُنسب إليه الزيارة الجامعة الكبيرة.",
    bio_en:
      "Summoned by the Abbasid caliph al-Mutawakkil from Medina to Samarra to remain under direct surveillance, he spent most of his Imamate there under close watch. Ziyarat al-Jami'a al-Kabira is attributed to him.",
    teachings: [
      {
        text_ar: "منهجه في تعريف مقام أهل البيت كما ورد في الزيارة الجامعة الكبيرة المنسوبة إليه.",
        text_en: "His articulation of the station of Ahl al-Bayt, as reflected in the Ziyarat al-Jami'a al-Kabira attributed to him.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام الهادي", label_en: "Shahadat of Imam al-Hadi", hijri_month: 3, hijri_day: 3 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-askari",
    slug: "imam-al-askari",
    order: 13,
    name_ar: "الإمام الحسن العسكري عليه السلام",
    name_en: "Imam Hasan al-Askari",
    title_ar: "العسكري",
    title_en: "Al-Askari",
    kunya_ar: "أبو محمد",
    kunya_en: "Abu Muhammad",
    birth_ar: "٤ ربيع الآخر، ٢٣٢ هـ (المدينة)",
    birth_en: "4 Rabi al-Thani, 232 AH (Medina)",
    martyrdom_ar: "٨ ربيع الأول، ٢٦٠ هـ (سامراء، بالسم بحسب الرواية الشيعية)",
    martyrdom_en: "8 Rabi al-Awwal, 260 AH (Samarra; by poisoning, per Shia narration)",
    relation_ar: "ابن الإمام علي الهادي، الإمام الحادي عشر، والد الإمام المهدي",
    relation_en: "Son of Imam Ali al-Hadi; the eleventh Imam; father of Imam al-Mahdi",
    bio_ar:
      "عاش معظم حياته تحت إقامة جبرية في سامراء (المعروفة بالعسكر)، ووُلد له ابنه محمد الذي أخفت الشيعة هويته حفاظًا عليه، ويُعتقد أنه الإمام المهدي المنتظر.",
    bio_en:
      "He spent most of his life under close confinement in Samarra (known as al-'Askar). His son Muhammad - whose identity was concealed by the Shia community for protection - is believed to be the awaited Imam al-Mahdi.",
    teachings: [
      {
        text_ar: "تمهيده السري لبدء غيبة ابنه صونًا له من الخطر السياسي المحدق.",
        text_en: "His careful, discreet preparation for his son's concealment amid an acute political threat.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "استشهاد الإمام العسكري", label_en: "Shahadat of Imam al-Askari", hijri_month: 3, hijri_day: 8 }],
    verification_status: "needs_verification",
  },
  {
    id: "imam-al-mahdi",
    slug: "imam-al-mahdi",
    order: 14,
    name_ar: "الإمام محمد المهدي عجل الله تعالى فرجه الشريف",
    name_en: "Imam Muhammad al-Mahdi (may God hasten his reappearance)",
    title_ar: "المهدي المنتظر، صاحب الزمان، بقية الله",
    title_en: "The Awaited Mahdi, Sahib al-Zaman, Baqiyyat Allah",
    kunya_ar: "أبو القاسم",
    kunya_en: "Abu al-Qasim",
    birth_ar: "١٥ شعبان، ٢٥٥ هـ (سامراء)",
    birth_en: "15 Sha'ban, 255 AH (Samarra)",
    martyrdom_ar: "حي غائب بحسب العقيدة الشيعية، لم تُذكر له وفاة",
    martyrdom_en: "Believed by Shia doctrine to be alive in occultation; no date of death",
    relation_ar: "ابن الإمام الحسن العسكري، الإمام الثاني عشر والأخير",
    relation_en: "Son of Imam Hasan al-Askari; the twelfth and final Imam",
    bio_ar:
      "بحسب العقيدة الشيعية الإثني عشرية، دخل الغيبة الصغرى بعد وفاة أبيه ثم الغيبة الكبرى عام 329هـ، وهو حيّ غائب بأمر الله إلى أن يأذن الله بظهوره ليملأ الأرض قسطًا وعدلاً بعد أن مُلئت ظلمًا وجورًا. ترتبط به دعوات وزيارات مخصوصة أبرزها دعاء الندبة.",
    bio_en:
      "According to Twelver Shia doctrine, he entered a minor occultation after his father's death, followed by the major occultation in 329 AH. He is believed to be alive, concealed by divine will, until God permits his reappearance to fill the earth with justice after it has been filled with oppression. Dua al-Nudba is among the supplications especially associated with him.",
    teachings: [
      {
        text_ar: "استمرار انتظاره كعبادة ورجاء يوجّه السلوك، وارتباطه بالفرج ودعاء التعجيل بظهوره.",
        text_en: "Ongoing anticipation of his return as an act of worship and hope shaping conduct, tied to supplications for relief and for hastening his reappearance.",
      },
    ],
    related_content: [],
    occasions: [{ label_ar: "ولادة الإمام المهدي", label_en: "Wiladat of Imam al-Mahdi", hijri_month: 8, hijri_day: 15 }],
    verification_status: "needs_verification",
  },
];


export function getMasumBySlug(slug: string) {
  return masumeen.find((m) => m.slug === slug);
}

/** Address of the editable record behind a Masum page. Prefixed so it cannot
 *  collide with a dua or ziyara that happens to share the person's name. */
export const masumItemSlug = (slug: string) => `masum-${slug}`;

const factLabels = {
  birth: { label_ar: "الولادة", label_en: "Birth" },
  martyrdom: { label_ar: "الاستشهاد", label_en: "Martyrdom" },
  kunya: { label_ar: "الكنية", label_en: "Kunya" },
  relation: { label_ar: "النسب", label_en: "Relation" },
};

/**
 * The fourteen pages expressed as ordinary editable records.
 *
 * The page itself is laid out from the Masum shape, which the dashboard editor
 * knows nothing about, so the biography, the teachings and the dates panel were
 * all unreachable from the dashboard. Each one is mirrored here as a normal
 * content item: a facts block for the dates, then the biography, then one
 * section per teaching. The pages read these back after mount, so an edit
 * appears without a rebuild.
 *
 * The order is fixed: facts first, biography second, teachings after. The page
 * reads them back by that convention, and any extra section the owner adds is
 * shown as a further teaching.
 */
export const masumeenPages: ContentItem[] = masumeen.map((m) => ({
  id: masumItemSlug(m.slug),
  slug: masumItemSlug(m.slug),
  type: "person",
  title_ar: m.name_ar,
  title_en: m.name_en,
  summary_ar: m.title_ar,
  summary_en: m.title_en,
  verification_status: m.verification_status,
  published: true,
  body: [
    {
      kind: "facts",
      facts: [
        { ...factLabels.birth, value_ar: m.birth_ar ?? "", value_en: m.birth_en ?? "" },
        { ...factLabels.martyrdom, value_ar: m.martyrdom_ar ?? "", value_en: m.martyrdom_en ?? "" },
        { ...factLabels.kunya, value_ar: m.kunya_ar ?? "", value_en: m.kunya_en ?? "" },
        { ...factLabels.relation, value_ar: m.relation_ar, value_en: m.relation_en },
      ].filter((f) => f.value_ar || f.value_en),
    },
    { kind: "text", heading_ar: "نبذة", heading_en: "Biography", text_ar: m.bio_ar, text_en: m.bio_en },
    ...m.teachings.map((teach) => ({
      kind: "text" as const,
      heading_ar: "من تعاليمه",
      heading_en: "Teachings",
      text_ar: teach.text_ar,
      text_en: teach.text_en,
    })),
  ],
}));
