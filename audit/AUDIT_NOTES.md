# Omalbnin.com — Source Audit (2026-08-07)

Platform: WordPress (Site Kit by Google). Very small site — 3 REST "pages" exposed,
rest are Elementor-built pages linked only via the primary nav menu. No posts via
wp-json. No categories/tags in use. No sitemap.xml reachable (blocked/absent).

## Inventory of discovered URLs

| # | Old URL (slug, URL-decoded) | Title | Content type found |
|---|---|---|---|
| 1 | / | الرئيسية | Homepage, links to all below |
| 2 | /زيارة-عاشوراء/ | زيارة عاشوراء | 3 images (text embedded in image files, not selectable) |
| 3 | /قصيدة-في-حب-الامام-الحسين-عليه-السلام/ | قصيدة في حب الامام الحسين | Poem — IMAGE ONLY (WhatsApp screenshot) |
| 4 | /الامام-محمد-الجواد-عليه-السلام/ | الامام محمد الجواد عليه السلام | Real text: 2 Qunut duas of Imam al-Jawad (verbatim extracted) + YouTube embed |
| 5 | /الايمان-كله/ | الايمان كله | Heading "هو الامام علي بن أبي طالب ع" + AnyFlip flipbook embed (sfbay/oxli) |
| 6 | /abdullah-alhattab/ | حلال المشاكل / عبد الله الحطاب | Minimal — name heading + AnyFlip flipbook embed (sfbay/tjlw) |
| 7 | /حديث-الكساء/ | حديث الكساء | Real text: FULL Hadith al-Kisa verbatim (extracted) + image + 2 YouTube embeds |
| 8 | /سفرة-السيدة-نفيسة-عليها-السلام-2 | سفرة السيدة نفيسة عليها السلام | Real text: full biography, madih poem, tawassul, dua qada al-haja, ziyara (verbatim extracted) |
| 9 | /سفرة-السيدة-أم-البنين-عليها-السلام/ | سفرة السيدة أم البنين عليها السلام | Real text: reading list, Dua al-Faraj, Ziyarat Umm al-Banin, tawassul method (verbatim extracted) |
| 10 | /sample-page/ | سفرة الخضر عليه السلام | Real text: Majlis al-Khidr ritual instructions — PARTIALLY extracted (some sections condensed by extraction tool; flagged for re-verification) |
| 11 | /زيارة-العباس-عليه-السلام/ | زيارة العباس عليه السلام | Video/image only, no ziyara text on page |
| — | https://online.anyflip.com/sfbay/pqhx/ | (homepage embed 1) | External flipbook, not owned by site — content unknown, treat as external ziyarat/dua document |
| — | https://online.anyflip.com/sfbay/gecy/ | (homepage embed 2) | External flipbook, content unknown |

## Media library (18 items) — all under wp-content/uploads/2023 & 2026, mostly
logo crops (ur-*.png), one mosque photo (Sayyida Nafisa shrine), WhatsApp screenshots,
and text-as-image graphics (السلام عليك... png series — likely Ziyarat Ashura panels).

## Key findings affecting migration strategy
1. Most devotional TEXT on the live site is stored as **images**, not selectable text
   (Ziyarat Ashura, the Hussain poem). These must be preserved as images in the new
   site (never re-typed from memory) until someone transcribes them from a verified
   Mafatih al-Jinan edition.
2. Two pages embed third-party AnyFlip flipbooks whose content this project cannot
   read/verify. They are preserved as external links/embeds, not copied.
3. Four content pieces have genuine extractable, verbatim Arabic text: Hadith al-Kisa,
   Sofra al-Sayyida Nafisa, Sofra Umm al-Banin, and the two Imam al-Jawad qunut duas.
   These are migrated as real text content.
4. Sofra al-Khidr (found live at /sample-page/) is long; the extraction tool condensed
   some middle sections. Flagged in RELIGIOUS_CONTENT_REVIEW.md for full re-transcription.
5. No existing sitemap/robots.txt/canonical redirect infrastructure to preserve beyond
   individual page canonicals (captured above for 301 mapping).
6. No WordPress admin/hosting/FTP/DB credentials are available in this environment —
   migration is via authenticated public crawl only (WebFetch), not a database export.
