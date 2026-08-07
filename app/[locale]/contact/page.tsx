import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_contact"), alternates: { canonical: `/${locale}/contact` } };
}

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_contact")}</h1>
      <p className="text-[var(--ink-soft)]">
        {l === "ar"
          ? "لأي تصحيح أو ملاحظة بخصوص دقة نص ديني أو مصدره، أو لاقتراح إضافة محتوى:"
          : "For any correction or note about a religious text's accuracy or source, or to suggest content:"}
      </p>
      <p className="mt-3 font-medium text-[var(--primary)]">{siteConfig.contactEmail}</p>
    </div>
  );
}
