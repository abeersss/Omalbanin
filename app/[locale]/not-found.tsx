import DynamicPage from "@/components/DynamicPage";

/**
 * Doubles as the 404 page and the resolver for pages created after the build.
 * See components/DynamicPage.tsx: it looks the address up in the database and
 * falls back to a normal 404 when nothing matches.
 */
export default function LocaleNotFound() {
  return <DynamicPage />;
}
