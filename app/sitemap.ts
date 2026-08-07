import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";
import { masumeen } from "@/content/masumeen";
import { duas } from "@/content/duas";
import { legacyContent, legacyZiyarat } from "@/content";
import { ziyaratPlaceholders } from "@/content/ziyarat";

const domain = "https://omalbnin.com";

const staticPaths = [
  "",
  "duas",
  "ziyarat",
  "ahl-al-bayt",
  "hadith-al-kisa",
  "mafatih-al-jinan",
  "friday",
  "umm-al-banin",
  "collections",
  "occasions",
  "search",
  "about",
  "sources",
  "contact",
  "privacy",
  "disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${domain}/${locale}${p ? "/" + p : ""}/`,
        lastModified: new Date("2026-08-07"),
        alternates: {
          languages: { ar: `${domain}/ar${p ? "/" + p : ""}/`, en: `${domain}/en${p ? "/" + p : ""}/` },
        },
      });
    }
    for (const m of masumeen) {
      entries.push({ url: `${domain}/${locale}/ahl-al-bayt/${m.slug}/`, lastModified: new Date("2026-08-07") });
    }
    for (const d of duas.filter((d) => d.published)) {
      entries.push({ url: `${domain}/${locale}/duas/${d.slug}/`, lastModified: new Date("2026-08-07") });
    }
    for (const z of [...legacyZiyarat, ...ziyaratPlaceholders].filter((z) => z.published)) {
      entries.push({ url: `${domain}/${locale}/ziyarat/${z.slug}/`, lastModified: new Date("2026-08-07") });
    }
    for (const c of legacyContent.filter((c) => c.type === "collection" && c.published)) {
      entries.push({ url: `${domain}/${locale}/collections/${c.slug}/`, lastModified: new Date("2026-08-07") });
    }
  }

  return entries;
}
