import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_about"), alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 leading-8">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_about")}</h1>
      {l === "ar" ? (
        <div className="space-y-4 text-[var(--ink)]">
          <p>أم البنين (Omalbnin.com) موقع بدأ كتكريم للسيدة أم البنين عليها السلام، ثم توسّع ليصبح مكتبة روحية يومية تجمع الأدعية والزيارات وسير المعصومين الأربعة عشر عليهم السلام ومحتوى مفاتيح الجنان.</p>
          <p>هذه النسخة من الموقع أعادت تنظيم المحتوى القديم مع الحفاظ عليه، وأضافت لوحة يومية ثنائية اللغة (عربي/إنجليزي) مع دعم كامل للاتجاهين RTL وLTR.</p>
          <p>نحرص على تمييز المصدر لكل نص: مصدر أساسي موثّق، أو ممارسة شعبية متداولة، أو محتوى محفوظ كما هو من الموقع الأصلي، أو محتوى بحاجة إلى تحقق. راجع صفحة المصادر لمزيد من التفاصيل.</p>
        </div>
      ) : (
        <div className="space-y-4 text-[var(--ink)]">
          <p>Omalbnin.com began as a tribute to Lady Umm al-Banin, and has grown into a daily spiritual library bringing together duas, ziyarat, the biographies of the Fourteen Ma&apos;sumeen, and Mafatih al-Jinan content.</p>
          <p>This version of the site reorganized the previous content while preserving it, and added a bilingual (Arabic/English) daily dashboard with full RTL/LTR support.</p>
          <p>We label the source of every text: a verified primary source, a traditional devotional practice, content preserved as-is from the original site, or content still awaiting verification. See the Sources page for details.</p>
        </div>
      )}
    </div>
  );
}
