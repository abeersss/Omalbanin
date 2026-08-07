import type { Metadata, Viewport } from "next";
import "../globals.css";
import { locales, Locale, dir } from "@/lib/i18n";
import ThemeScript from "@/components/ThemeScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  const isAr = locale === "ar";
  const title = isAr
    ? "أم البنين | Omalbnin - كتاب الأدعية والزيارات اليومية"
    : "Omalbnin | أم البنين - Your Daily Spiritual Companion";
  const description = isAr
    ? "لوحة يومية للأدعية والزيارات والمعصومين الأربعة عشر ومفاتيح الجنان، بالعربية والإنجليزية."
    : "A daily dashboard for duas, ziyarat, the Fourteen Ma'sumeen, and Mafatih al-Jinan, in Arabic and English.";

  return {
    metadataBase: new URL(`https://${siteConfig.domain}`),
    title: { default: title, template: `%s | ${siteConfig.siteNameEn}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en" },
    },
    openGraph: {
      title,
      description,
      url: `https://${siteConfig.domain}/${locale}`,
      siteName: siteConfig.siteNameEn,
      locale: isAr ? "ar_AR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f5f52",
};

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  const l = locale as Locale;

  return (
    <html lang={l} dir={dir(l)}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col motif-bg">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">
          {l === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>
        <Header locale={l} />
        <main id="main" className="flex-1">
          {props.children}
        </main>
        <Footer locale={l} />
        <MobileNav locale={l} />
      </body>
    </html>
  );
}
