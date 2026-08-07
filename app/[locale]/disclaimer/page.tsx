import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/disclaimer">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_disclaimer"), alternates: { canonical: `/${locale}/disclaimer` } };
}

export default async function DisclaimerPage(props: PageProps<"/[locale]/disclaimer">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 leading-8 text-[var(--ink)]">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_disclaimer")}</h1>
      {l === "ar" ? (
        <div className="space-y-4">
          <p>يبذل هذا الموقع جهدًا لتمييز المصدر الديني لكل نص، والتفريق بين مصدر أساسي موثّق وحسب المنقول ومحتوى بحاجة إلى تحقق. هذا التصنيف اجتهاد تنظيمي وليس فتوى شرعية.</p>
          <p>لا يغني محتوى هذا الموقع عن الرجوع إلى أهل العلم والمصادر المعتمدة (كطبعات مفاتيح الجنان الموثوقة) عند الحاجة إلى دقة فقهية أو حديثية عالية.</p>
          <p>التواريخ الهجرية المعروضة محسوبة حسابيًا وقد تختلف عن رؤية الهلال المحلية؛ يوجد إعداد إداري لتصحيحها يدويًا.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p>This site makes an effort to label the religious source of every text, distinguishing a verified primary source from a popular devotional tradition or content still awaiting verification. This classification is an editorial effort, not a religious ruling (fatwa).</p>
          <p>This site&apos;s content does not replace consulting qualified scholars and trusted primary references (such as reliable Mafatih al-Jinan editions) where precise jurisprudential or hadith accuracy is required.</p>
          <p>Displayed Hijri dates are calculated arithmetically and may differ from local moon-sighting; an administrator setting exists to manually correct them.</p>
        </div>
      )}
    </div>
  );
}
