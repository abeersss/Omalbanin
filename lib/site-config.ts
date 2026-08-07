/**
 * Site configuration that an administrator needs to change without touching
 * application code. In this first production release (static, no database yet)
 * this file IS the "admin panel" — a maintainer edits the values below and
 * redeploys. See PRODUCTION_REPORT.md for the plan to move this into a real
 * settings table once a CMS/database is connected.
 */
export const siteConfig = {
  /**
   * Manual correction for the calculated Hijri date, in days.
   * Use +1 if local moon-sighting confirms the new month started a day
   * later than the tabular calculation; -1 if a day earlier. Range -2..2.
   */
  hijriAdjustmentDays: 0,

  /** Region label shown next to the Hijri date so visitors know which
   *  moon-sighting convention is being followed. */
  hijriRegionLabel: {
    ar: "وفق التقويم الحسابي (قابل للتعديل يدويًا)",
    en: "Calculated calendar (manually adjustable)",
  },

  /** Today's manually-featured content overrides. Leave null to fall back
   *  to the automatic weekday/occasion selection logic in lib/today.ts */
  featuredDuaSlugOverride: null as string | null,
  featuredZiyaraSlugOverride: null as string | null,

  siteNameAr: "أم البنين",
  siteNameEn: "Omalbnin",
  domain: "omalbnin.com",
  contactEmail: "contact@omalbnin.com",
};
