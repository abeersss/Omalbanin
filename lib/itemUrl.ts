import { ContentItem } from "@/content/types";

/**
 * Where a record is actually read on the site.
 *
 * Most records have a page of their own under /duas/, /ziyarat/ or
 * /collections/, but several are parts of a page that already exists: the
 * fourteen biographies, the weekday cards on Mafatih al-Jinan, and the prose
 * blocks on the Mafatih, Friday, Umm al-Banin and Sources pages. Sending the
 * owner to /collections/<that address> would 404, so those are mapped to the
 * page they appear on instead.
 */
export function itemUrl(item: Pick<ContentItem, "slug" | "type">, locale: string): string {
  const { slug, type } = item;

  if (slug.startsWith("masum-")) return `/${locale}/ahl-al-bayt/${slug.slice("masum-".length)}/`;
  if (slug.startsWith("weekday-")) return `/${locale}/mafatih-al-jinan/`;

  const pageOf: Record<string, string> = {
    "page-mafatih": "mafatih-al-jinan",
    "page-friday": "friday",
    "page-umm-al-banin": "umm-al-banin",
    "page-sources": "sources",
  };
  if (pageOf[slug]) return `/${locale}/${pageOf[slug]}/`;

  const section = type === "dua" ? "duas" : type === "ziyara" ? "ziyarat" : "collections";
  return `/${locale}/${section}/${slug}/`;
}
