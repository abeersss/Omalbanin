import type { Metadata } from "next";
import { Locale, locales } from "@/lib/i18n";
import AdminApp from "@/components/admin/AdminApp";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/admin">): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === "ar" ? "لوحة الإدارة" : "Admin dashboard",
    // The dashboard holds nothing secret (RLS does the protecting) but there is
    // no reason for it to appear in search results.
    robots: { index: false, follow: false },
  };
}

export default async function AdminPage(props: PageProps<"/[locale]/admin">) {
  const { locale } = await props.params;
  return <AdminApp locale={locale as Locale} />;
}
