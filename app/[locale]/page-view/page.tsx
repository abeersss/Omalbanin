import type { Metadata } from "next";
import { locales } from "@/lib/i18n";
import DynamicPage from "@/components/DynamicPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  // This file is served for addresses that have no page of their own, so it
  // must never be indexed under its own URL.
  robots: { index: false, follow: false },
};

/**
 * Fallback renderer for pages created in the admin dashboard after the build.
 *
 * A static export contains only the files generated at build time, so a page
 * added later has no HTML of its own. public/.htaccess serves this file for any
 * unmatched address under /ar/ or /en/ without changing the URL, and
 * DynamicPage reads that address and looks it up in the database.
 */
export default function PageView() {
  return <DynamicPage />;
}
