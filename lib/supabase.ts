import { NavItem } from "./nav";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-only Supabase client.
 *
 * Both values are public by design. The publishable key is meant to be visible
 * in a browser; what actually protects the data is Row Level Security, which is
 * enabled on every table (see supabase/schema.sql). The secret key is never
 * used here and must never be added: a static export has no server to hide it
 * on, so anything shipped to the browser is readable by anyone.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let cached: SupabaseClient | null = null;

/** Returns null when the keys are absent, so the site still builds and runs
 *  without Supabase configured. Only the admin dashboard depends on this. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return cached;
}

export const supabaseConfigured = Boolean(url && key);

export interface SiteSettingsRow {
  id: number;
  hijri_adjustment_days: number;
  featured_dua_slug: string | null;
  featured_ziyara_slug: string | null;
  occasion_ar: string | null;
  occasion_en: string | null;
  /** The top menu as arranged in the dashboard. Null means the menu that ships
   *  with the build is used. */
  nav: NavItem[] | null;
}
