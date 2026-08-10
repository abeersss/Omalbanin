"use client";

import { useEffect, useState } from "react";
import { getSupabase, SiteSettingsRow } from "./supabase";
import { siteConfig } from "./site-config";

/**
 * Reads the settings the owner controls from the admin dashboard.
 *
 * The site is a static export, so the prerendered HTML necessarily carries the
 * values baked in at build time. Those are used for the first paint and remain
 * the answer if Supabase is unreachable; once the row arrives it takes over.
 * Without this the Hijri adjustment saved in the dashboard changed nothing on
 * the site, because the date was computed entirely at build time.
 *
 * site_settings is world-readable by policy, so this works for every visitor,
 * not just a signed-in admin.
 */
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsRow | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let cancelled = false;

    sb.from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data) setSettings(data as SiteSettingsRow);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    settings,
    hijriAdjustmentDays: settings?.hijri_adjustment_days ?? siteConfig.hijriAdjustmentDays,
    featuredDuaSlug: settings?.featured_dua_slug ?? siteConfig.featuredDuaSlugOverride,
    featuredZiyaraSlug: settings?.featured_ziyara_slug ?? siteConfig.featuredZiyaraSlugOverride,
  };
}
