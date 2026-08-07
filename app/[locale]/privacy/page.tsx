import type { Metadata } from "next";
import { Locale, t, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: t(locale as Locale, "footer_privacy"), alternates: { canonical: `/${locale}/privacy` } };
}

export default async function PrivacyPage(props: PageProps<"/[locale]/privacy">) {
  const { locale } = await props.params;
  const l = locale as Locale;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 leading-8 text-[var(--ink)]">
      <h1 className="mb-6 text-3xl font-extrabold text-[var(--primary)]">{t(l, "footer_privacy")}</h1>
      {l === "ar" ? (
        <div className="space-y-4">
          <p>لا يتطلب هذا الموقع تسجيل حساب لقراءة المحتوى. عدّادات الأذكار (الصلاة على محمد وآل محمد، الاستغفار) وحفظ العناصر المفضلة والمحفوظة تُخزَّن محليًا فقط داخل متصفحك (localStorage) ولا تُرسَل إلى أي خادم.</p>
          <p>عند تفعيله لاحقًا، قد يُستخدم تحليل استخدام مجهول لتحسين الموقع دون جمع بيانات تعريف شخصية.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p>This site does not require an account to read its content. Dhikr counters (Salawat, Istighfar) and bookmarked/favorited items are stored locally in your browser only (localStorage) and are never sent to a server.</p>
          <p>If enabled later, anonymous usage analytics may be used to improve the site without collecting personally identifying data.</p>
        </div>
      )}
    </div>
  );
}
