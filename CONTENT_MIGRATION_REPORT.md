# Content Migration Report - omalbnin.com

Generated 2026-08-07. Source: live crawl of the WordPress site at omalbnin.com
(no CMS/database/FTP access was available - see PRODUCTION_REPORT.md). Full
crawl notes: `audit/AUDIT_NOTES.md`.

| Old URL | New URL (ar) | Category | Migrated | Text preserved | Source identified | Needs religious verification | Redirect created |
|---|---|---|---|---|---|---|---|
| `/` | `/ar/` | homepage | Yes | n/a | n/a | No | Yes (public/index.html + .htaccess) |
| `/زيارة-عاشوراء/` | `/ar/ziyarat/ziyarat-ashura/` | ziyara | Yes (as images) | Images only - text was never selectable on the source | Original site | **Yes - full text not yet transcribed** | Yes |
| `/قصيدة-في-حب-الامام-الحسين-عليه-السلام/` | `/ar/collections/poem-imam-husayn/` | poetry | Yes (as image) | Image only | Original site | No (nothing to mis-transcribe) | Yes |
| `/الامام-محمد-الجواد-عليه-السلام/` | `/ar/duas/imam-al-jawad-qunut/` | dua | Yes | Yes - full verbatim text | Original site | No | Yes |
| `/الايمان-كله/` | `/ar/collections/al-iman-kulluh/` | collection | Yes (embed preserved) | External AnyFlip flipbook, content unread | Unknown (external) | **Yes** | Yes |
| `/abdullah-alhattab/` | `/ar/collections/abdullah-alhattab/` | collection | Yes (embed preserved) | External AnyFlip flipbook, content unread | Unknown - needs site-owner clarification | **Yes** | Yes |
| `/حديث-الكساء/` | `/ar/hadith-al-kisa/` | hadith | Yes | Yes - full verbatim text | Original site | No | Yes |
| `/سفرة-السيدة-نفيسة-عليها-السلام-2` | `/ar/collections/sofra-sayyida-nafisa/` | collection | Yes | Yes - full verbatim text | Original site (popular tradition) | No (classified as traditional practice) | Yes |
| `/سفرة-السيدة-أم-البنين-عليها-السلام/` | `/ar/collections/sofra-umm-al-banin/` | collection | Yes | Yes - full verbatim text | Original site (popular tradition) | No (classified as traditional practice) | Yes |
| `/sample-page/` (= سفرة الخضر) | `/ar/collections/sofra-al-khidr/` | collection | Partial | Intro paragraph only - long ritual sections could not be extracted verbatim in this session | Original site | **Yes - see below** | Yes |
| `/زيارة-العباس-عليه-السلام/` | `/ar/ziyarat/ziyarat-abbas/` | ziyara | Yes (image) | Video/image only, no text existed on source | Original site | No (nothing to mis-transcribe) | Yes |

## Media library
18 images cataloged in `audit/AUDIT_NOTES.md`. Images are currently referenced
by their **original omalbnin.com URLs** (hotlinked) rather than re-uploaded,
because this session has no way to download binary files from the live site.
Before decommissioning the old WordPress hosting, these images must be
downloaded and re-uploaded under the new site's own `/public/images/legacy/`
folder and the URLs in `content/legacy.ts` updated - otherwise those images
will break the day the old hosting is turned off.

## What was intentionally NOT migrated
- Nothing was deleted. Every discovered URL above has a 1:1 mapping and a
  redirect.
- Two AnyFlip flipbook embeds (`sfbay/pqhx`, `sfbay/gecy` on the homepage)
  are preserved as external links on the homepage/Ziyarat Ashura page but
  their content was never read into this project (no reliable way to extract
  verbatim text from a third-party flipbook viewer in this session).

## Redirects
All mappings above are implemented as Apache 301 redirects in
`public/.htaccess`, matched against the raw percent-encoded request URI
(robust regardless of server locale settings). Verify after deploy with
`curl -I` against a few of the old URLs.
