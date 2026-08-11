/**
 * Turns a page title into the address used in its URL.
 *
 * The address has to be plain Latin letters: it appears in the link, in search
 * results and in anything the owner pastes into a message, and Arabic there
 * would arrive percent-encoded and unreadable. So an Arabic title is written
 * out in Latin letters rather than being dropped.
 *
 * This is a practical transliteration for readable addresses, not a scholarly
 * one: it carries no diacritics and does not distinguish letters that share a
 * Latin spelling. The owner can always overwrite the suggestion.
 */
const AR_TO_LATIN: Record<string, string> = {
  ا: "a", أ: "a", إ: "i", آ: "a", ٱ: "a",
  ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh",
  د: "d", ذ: "dh", ر: "r", ز: "z", س: "s", ش: "sh",
  ص: "s", ض: "d", ط: "t", ظ: "z", ع: "a", غ: "gh",
  ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n",
  ه: "h", و: "w", ي: "y", ى: "a", ة: "a", ء: "", ئ: "y", ؤ: "w",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

/** Arabic vowel marks and the tatweel carry no sound of their own here. */
const AR_MARKS = /[ً-ْٰـ]/g;

export function slugify(input: string): string {
  const latin = input
    .replace(AR_MARKS, "")
    .split("")
    .map((ch) => (ch in AR_TO_LATIN ? AR_TO_LATIN[ch] : ch))
    .join("");

  return latin
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents left by Latin input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}
