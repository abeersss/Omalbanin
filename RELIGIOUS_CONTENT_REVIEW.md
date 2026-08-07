# Religious Content Review — items requiring attention before final publish

This file tracks every place this project could not (or should not) assert
full confidence in a religious text or attribution. Nothing below was
fabricated; each item is either preserved as original media, labeled a
popular tradition, or left unpublished pending a verified source.

## 1. Needs full re-transcription (highest priority)
- **Sofra al-Khidr** (`/collections/sofra-al-khidr`) — the original page is
  considerably longer than what could be captured verbatim in this session:
  the full gathering etiquette, "closing prayers" litany, an invocation to
  al-Khidr, a visitation of Imam al-Zaman, a relief supplication, and
  detailed sofra-preparation instructions. The extraction tool available in
  this session summarized/condensed those sections rather than guaranteeing
  word-for-word text, so they were **deliberately left out** rather than risk
  publishing a paraphrase as if it were the original wording. Action: open
  the original page (or the pre-migration WordPress export) and copy these
  sections character-for-character.

## 2. Attribution/wording not yet verified — published as "coming soon"
These library entries exist in the information architecture (so the site's
navigation and search are complete) but carry **no body text**, because no
verified source was available in this session:
- Dua Kumayl (`/duas/dua-kumayl`)
- Dua al-Tawassul (`/duas/dua-tawassul`)
- Dua al-Nudba (`/duas/dua-nudba`)
- Ziyarat Waritha (`/ziyarat/ziyarat-warith`)
- Ziyarat Amin Allah (`/ziyarat/ziyarat-amin-allah`)
- Ziyarat al-Jami'a al-Kabira (`/ziyarat/ziyarat-jamia-kabira`)

Action: source each from a specific, named, trusted Mafatih al-Jinan edition
(print or a vetted digital edition), enter the Arabic text into
`content/duas.ts` / `content/ziyarat.ts`, change `verification_status` to
`primary_source`, and set `published: true`.

## 3. Classified as "traditional devotional practice," not a primary source
- Sofra al-Sayyida Nafisa (full page)
- Sofra Umm al-Banin (full page, including the "Dua al-Faraj" and tawassul
  method as presented there)

These were on the original site and are **not deleted**, but per the
project's own sourcing rule they are labeled "ممارسة شعبية متداولة /
Traditional devotional practice" rather than attributed to Mafatih al-Jinan
or a named Imam, because that attribution was not present or verifiable on
the source page itself.

## 4. Biographical facts needing scholarly sign-off
- All 14 Ma'sumeen profiles (`content/masumeen.ts`) — birth/martyrdom dates
  and biographical summaries reflect the dates most commonly cited across
  general Shia sources. Every entry's `verification_status` is deliberately
  set to `needs_verification`. Recommend a single named reference work be
  chosen (e.g., a specific standard Shia biographical text) and every date
  checked against it before treating this as a final reference page.
- Occasion dates in `content/occasions.ts` carry the same caveat.

## 5. Unclear/ambiguous legacy content
- `/collections/abdullah-alhattab` ("حلال المشاكل") — the original page is
  just a name and an embedded external flipbook. It's unclear whether this
  refers to a person, a book, or a media series. **Needs the site owner's
  clarification** before it can be classified or captioned properly.
- `/collections/al-iman-kulluh` — embeds an external AnyFlip flipbook about
  Imam Ali whose content was never read/verified in this project.

## 6. External embeds never verified
Two AnyFlip flipbook viewers embedded on the original homepage
(`online.anyflip.com/sfbay/pqhx`, `.../gecy`) are preserved as external links
only. Their content is outside this project's control and was not read.

## 7. Translation gap
Hadith al-Kisa and the Imam al-Jawad qunuts currently have Arabic text only;
no English translation has been added, to avoid producing a translation of
sacred text without a qualified reviewer. The reader UI is already built to
show an English translation once one is supplied — see `text_en` fields in
`content/legacy.ts`.
