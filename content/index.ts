import { legacyContent } from "./legacy";
import { duas } from "./duas";
import { ziyaratPlaceholders } from "./ziyarat";
import { pageContent } from "./pages";
import { ContentItem } from "./types";

export * from "./types";
export { masumeen, getMasumBySlug } from "./masumeen";
export { occasions, getOccasionsForDate } from "./occasions";
export { weekdayPrograms } from "./weekday";
export { legacyContent, getLegacyBySlug } from "./legacy";
export { duas, getDuaBySlug } from "./duas";
export { ziyaratPlaceholders } from "./ziyarat";
export { pageContent, getPageContent } from "./pages";

/** Every piece of content in the project, published or not - used for search & sitemaps. */
export const allContent: ContentItem[] = [...legacyContent, ...duas, ...ziyaratPlaceholders];

/** Everything the admin dashboard can edit, including the prose on pages such
 *  as Mafatih al-Jinan that would otherwise only be changeable in code. Page
 *  entries are kept out of allContent so they do not appear in search results
 *  or the sitemap as if they were separate documents. */
export const editableContent: ContentItem[] = [...allContent, ...pageContent];

export const publishedContent = allContent.filter((c) => c.published);

export function getContentBySlug(slug: string): ContentItem | undefined {
  return allContent.find((c) => c.slug === slug);
}

export function getContentByType(type: ContentItem["type"]): ContentItem[] {
  return publishedContent.filter((c) => c.type === type);
}

/** The "existing Omalbnin collections" - legacy site material that doesn't
 * cleanly fit the dua/ziyara taxonomy (the safra/table traditions, the
 * Imam Ali booklet, etc). Shown in its own homepage section per the brief's
 * "Keep Omalbnin Identity" requirement. */
export const legacyCollections = legacyContent.filter((c) => c.type === "collection");

/** Ziyarat drawn from the legacy migration, EXCLUDING Hadith al-Kisa - it has
 * its own dedicated top-level reading experience (brief section 8) and must
 * not also appear as a duplicate entry/URL under /ziyarat. */
export const legacyZiyarat = legacyContent.filter((c) => c.type === "ziyara" && c.slug !== "hadith-al-kisa");
