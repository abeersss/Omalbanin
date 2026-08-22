import { Locale, t } from "./i18n";

export interface NavItem {
  label_ar: string;
  label_en: string;
  /** Address without the language prefix, e.g. "duas" or "collections/dua-ahad".
   *  Empty means the home page. */
  path: string;
}

/**
 * The menu as it ships. Used until the owner saves their own arrangement, and
 * as the target of "restore the original menu" in the dashboard.
 *
 * Labels are resolved from the translation table rather than written twice, so
 * the built-in menu keeps following the site's own wording.
 */
export function defaultNav(): NavItem[] {
  const item = (path: string, key: string): NavItem => ({
    path,
    label_ar: t("ar", key),
    label_en: t("en", key),
  });

  return [
    item("", "nav_home"),
    item("duas", "nav_duas"),
    item("ziyarat", "nav_ziyarat"),
    item("ahl-al-bayt", "nav_masumeen"),
    item("mafatih-al-jinan", "nav_mafatih"),
    item("friday", "nav_friday"),
    item("umm-al-banin", "nav_umm_al_banin"),
  ];
}

/** Full address of a menu entry for a given language. */
export function navHref(item: NavItem, locale: Locale) {
  const path = item.path.replace(/^\/+|\/+$/g, "");
  return path ? `/${locale}/${path}` : `/${locale}`;
}

export function navLabel(item: NavItem, locale: Locale) {
  return (locale === "ar" ? item.label_ar : item.label_en || item.label_ar) || item.path;
}
