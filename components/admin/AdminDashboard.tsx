"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, SiteSettingsRow } from "@/lib/supabase";
import { Locale } from "@/lib/i18n";
import { editableContent, BodyBlock, ContentItem } from "@/content";
import { slugify } from "@/lib/slug";
import SectionEditor from "./SectionEditor";

const copy = {
  ar: {
    title: "لوحة الإدارة",
    signOut: "تسجيل الخروج",
    tabOverview: "نظرة عامة",
    tabContent: "المحتوى",
    tabSettings: "الإعدادات",
    published: "منشور",
    drafts: "غير منشور",
    emptySections: "أقسام فارغة",
    totalItems: "إجمالي النصوص",
    edit: "تحرير",
    back: "رجوع إلى القائمة",
    save: "حفظ",
    saving: "جارٍ الحفظ...",
    saved: "تم الحفظ",
    savedLive: "تم الحفظ ونُشر للزوار. افتح الصفحة للتأكد.",
    savedDraft: "تم الحفظ كمسودة. لن يظهر للزوار حتى تفعّل النشر.",
    viewPage: "فتح الصفحة",
    dismiss: "إغلاق",
    saveFailed: "لم يتم الحفظ. تأكد من اتصالك ثم حاول مرة أخرى.",
    publish: "نشر هذا النص للزوار",
    publishHint: "لا تنشر إلا بعد مراجعة النص كاملاً.",
    addSection: "إضافة قسم جديد",
    newSection: "قسم جديد",
    titleAr: "العنوان (عربي)",
    titleEn: "العنوان (إنجليزي)",
    summaryAr: "الوصف المختصر (عربي)",
    summaryEn: "الوصف المختصر (إنجليزي)",
    newPage: "+ صفحة جديدة",
    newPageTitle: "إنشاء صفحة جديدة",
    pageAddress: "رابط الصفحة",
    pageAddressHint: "يُكتب تلقائياً من العنوان. عدّله إن أردت، بحروف إنجليزية صغيرة وشرطات فقط.",
    pageType: "النوع",
    typeDua: "دعاء",
    typeZiyara: "زيارة",
    typeArticle: "صفحة / مقال",
    create: "إنشاء",
    cancel: "إلغاء",
    slugTaken: "هذا العنوان مستخدم بالفعل.",
    slugInvalid: "استخدم حروفاً إنجليزية صغيرة وأرقاماً وشرطات فقط.",
    titleRequired: "أدخل العنوان العربي.",
    deletePage: "حذف",
    confirmDeletePage: "حذف هذه الصفحة نهائياً؟ لا يمكن التراجع.",
    hidePage: "إخفاء عن الزوار",
    builtInNote: "صفحة أساسية - يمكن إخفاؤها لكن لا يمكن حذفها.",
    deleted: "تم الحذف.",
    hidden: "تم الإخفاء عن الزوار.",
    liveAt: "الرابط",
    hijri: "تعديل التاريخ الهجري (بالأيام)",
    hijriHint: "استخدم +1 أو -1 حسب رؤية الهلال.",
    featuredDua: "دعاء اليوم المختار",
    featuredZiyara: "زيارة اليوم المختارة",
    auto: "تلقائي",
    notAdmin: "هذا الحساب ليس لديه صلاحية الإدارة.",
    loading: "جارٍ التحميل...",
    progress: "مكتمل",
    error: "تعذر الحفظ. حاول مرة أخرى.",
  },
  en: {
    title: "Admin dashboard",
    signOut: "Sign out",
    tabOverview: "Overview",
    tabContent: "Content",
    tabSettings: "Settings",
    published: "Published",
    drafts: "Unpublished",
    emptySections: "Empty sections",
    totalItems: "Total texts",
    edit: "Edit",
    back: "Back to list",
    save: "Save",
    saving: "Saving...",
    saved: "Saved",
    savedLive: "Saved and published. Open the page to confirm.",
    savedDraft: "Saved as a draft. Visitors will not see it until you publish.",
    viewPage: "Open the page",
    dismiss: "Dismiss",
    saveFailed: "Not saved. Check your connection and try again.",
    publish: "Publish this text to visitors",
    publishHint: "Only publish once the text has been fully reviewed.",
    addSection: "Add a new section",
    newSection: "New section",
    titleAr: "Title (Arabic)",
    titleEn: "Title (English)",
    summaryAr: "Short summary (Arabic)",
    summaryEn: "Short summary (English)",
    newPage: "+ New page",
    newPageTitle: "Create a new page",
    pageAddress: "Page link",
    pageAddressHint: "Written for you from the title. Edit it if you like, using lowercase letters and hyphens only.",
    pageType: "Type",
    typeDua: "Dua",
    typeZiyara: "Ziyara",
    typeArticle: "Page / article",
    create: "Create",
    cancel: "Cancel",
    slugTaken: "That address is already in use.",
    slugInvalid: "Use lowercase letters, numbers and hyphens only.",
    titleRequired: "Enter the Arabic title.",
    deletePage: "Delete",
    confirmDeletePage: "Delete this page permanently? This cannot be undone.",
    hidePage: "Hide from visitors",
    builtInNote: "Built-in page - can be hidden but not deleted.",
    deleted: "Deleted.",
    hidden: "Hidden from visitors.",
    liveAt: "Address",
    hijri: "Hijri date adjustment (days)",
    hijriHint: "Use +1 or -1 according to the moon sighting.",
    featuredDua: "Featured dua of the day",
    featuredZiyara: "Featured ziyara of the day",
    auto: "Automatic",
    notAdmin: "This account does not have admin access.",
    loading: "Loading...",
    progress: "complete",
    error: "Could not save. Please try again.",
  },
};

type Row = {
  slug: string;
  body: BodyBlock[];
  published: boolean;
  title_ar?: string;
  title_en?: string;
  summary_ar?: string;
  summary_en?: string;
};

export default function AdminDashboard({ session, locale }: { session: Session; locale: Locale }) {
  const c = copy[locale] ?? copy.ar;
  const sb = getSupabase();

  const [tab, setTab] = useState<"overview" | "content" | "settings">("overview");
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettingsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  /** Sticks around until dismissed. The previous confirmation was a small label
   *  that cleared itself after under two seconds, which read as "nothing
   *  happened" and left the owner unsure whether the save had worked. */
  const [savedNotice, setSavedNotice] = useState<{ slug: string; published: boolean } | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newTitleAr, setNewTitleAr] = useState("");
  const [newTitleEn, setNewTitleEn] = useState("");
  /** The address is written for you from the title. Once it is edited by hand
   *  it stops following the title, so a deliberate choice is never overwritten. */
  const [slugEdited, setSlugEdited] = useState(false);
  const [newType, setNewType] = useState<ContentItem["type"]>("article");
  const [newErr, setNewErr] = useState<string | null>(null);

  // `loading` already starts true, so this does not set it synchronously; the
  // first state update happens after the awaited round trip resolves.
  const load = useCallback(async () => {
    if (!sb) return;
    const [{ data: content }, { data: s }, { data: adminOk }] = await Promise.all([
      sb.from("content_items").select("slug, body, published, title_ar, title_en, summary_ar, summary_en"),
      sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      sb.rpc("is_admin"),
    ]);
    const map: Record<string, Row> = {};
    for (const r of content ?? []) map[r.slug] = r as Row;
    setRows(map);
    setSettings((s as SiteSettingsRow) ?? null);
    setIsAdmin(adminOk === true);
    setLoading(false);
  }, [sb]);

  useEffect(() => {
    // False positive: load() is async and awaits Supabase before touching
    // state, so nothing is set synchronously during this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  /** Bundled content is the starting point; a saved row overrides it. This
   *  avoids a separate seeding step, so the dashboard is usable immediately. */
  const items = useMemo(() => {
    const merged = editableContent.map((item: ContentItem) => {
      const row = rows[item.slug];
      return {
        ...item,
        body: row?.body ?? item.body,
        published: row?.published ?? item.published,
        title_ar: row?.title_ar || item.title_ar,
        title_en: row?.title_en || item.title_en,
        summary_ar: row?.summary_ar ?? item.summary_ar,
        summary_en: row?.summary_en ?? item.summary_en,
      };
    });

    // Pages created in the dashboard exist only in the database, so they would
    // otherwise never appear in this list.
    const known = new Set(merged.map((i) => i.slug));
    const createdHere: ContentItem[] = Object.values(rows)
      .filter((r) => !known.has(r.slug))
      .map((r) => ({
        id: r.slug,
        slug: r.slug,
        type: "article" as ContentItem["type"],
        title_ar: r.title_ar ?? r.slug,
        title_en: r.title_en ?? r.slug,
        summary_ar: r.summary_ar ?? "",
        summary_en: r.summary_en ?? "",
        body: r.body ?? [],
        verification_status: "needs_verification" as ContentItem["verification_status"],
        published: r.published,
      }));

    return [...merged, ...createdHere];
  }, [rows]);

  const current = items.find((i) => i.slug === editing) ?? null;

  const stats = useMemo(() => {
    const isEmpty = (b: BodyBlock) =>
      b.kind === "image"
        ? !b.imageUrl
        : b.kind === "pdf"
          ? !b.pdfUrl && !b.pdfUrl_en
          : b.kind === "embed"
            ? !b.embedUrl
            : !b.text_ar?.trim();
    const emptySections = items.reduce((n, i) => n + i.body.filter(isEmpty).length, 0);
    const filled = items.reduce((n, i) => n + i.body.filter((b) => !isEmpty(b)).length, 0);
    return {
      published: items.filter((i) => i.published).length,
      drafts: items.filter((i) => !i.published).length,
      total: items.length,
      emptySections,
      percent: filled + emptySections === 0 ? 100 : Math.round((filled / (filled + emptySections)) * 100),
    };
  }, [items]);

  /** Slugs defined in code. These render as real files at build time, so the
   *  row can be hidden but the page itself cannot be removed from the server
   *  by deleting a database row. */
  const builtInSlugs = useMemo(() => new Set(editableContent.map((i) => i.slug)), []);

  async function createPage(slug: string, type: ContentItem["type"], titleAr: string, titleEn: string) {
    if (!sb) return;
    setStatus("saving");
    const { error } = await sb.from("content_items").insert({
      slug,
      type,
      title_ar: titleAr,
      title_en: titleEn || titleAr,
      summary_ar: "",
      summary_en: "",
      body: [],
      published: false,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("idle");
    setNewOpen(false);
    setNewSlug("");
    setNewTitleAr("");
    setNewTitleEn("");
    setSlugEdited(false);
    await load();
    setEditing(slug);
  }

  async function removePage(slug: string) {
    if (!sb) return;
    const builtIn = builtInSlugs.has(slug);
    if (!window.confirm(builtIn ? c.hidePage + "?" : c.confirmDeletePage)) return;
    setStatus("saving");

    if (builtIn) {
      // Hide rather than delete: the page exists as a file on the server, so
      // only its published flag can be controlled from here.
      const item = items.find((i) => i.slug === slug);
      const { error } = await sb.from("content_items").upsert(
        {
          slug,
          type: item?.type ?? "article",
          title_ar: item?.title_ar ?? "",
          title_en: item?.title_en ?? "",
          body: item?.body ?? [],
          published: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" },
      );
      if (error) {
        setStatus("error");
        return;
      }
    } else {
      const { error } = await sb.from("content_items").delete().eq("slug", slug);
      if (error) {
        setStatus("error");
        return;
      }
    }

    setStatus("idle");
    setEditing(null);
    setSavedNotice(null);
    await load();
  }

  function patchCurrent(patch: Partial<Row>) {
    if (!current) return;
    setRows((r) => {
      // Seed from the merged view the first time this item is touched, so an
      // edit to one field does not blank the others.
      const existing: Row = r[current.slug] ?? {
        slug: current.slug,
        body: current.body,
        published: current.published,
        title_ar: current.title_ar,
        title_en: current.title_en,
        summary_ar: current.summary_ar,
        summary_en: current.summary_en,
      };
      return { ...r, [current.slug]: { ...existing, ...patch } };
    });
  }

  async function saveItem(slug: string, body: BodyBlock[], published: boolean) {
    if (!sb || !current) return;
    setStatus("saving");
    const { error } = await sb.from("content_items").upsert(
      {
        slug,
        type: current.type,
        title_ar: current.title_ar,
        title_en: current.title_en,
        summary_ar: current.summary_ar ?? "",
        summary_en: current.summary_en ?? "",
        body,
        published,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (error) {
      setStatus("error");
      setSavedNotice(null);
      return;
    }
    setRows((r) => ({
      ...r,
      [slug]: {
        slug,
        body,
        published,
        title_ar: current.title_ar,
        title_en: current.title_en,
        summary_ar: current.summary_ar,
        summary_en: current.summary_en,
      },
    }));
    setStatus("idle");
    setSavedNotice({ slug, published });
  }

  async function saveSettings(patch: Partial<SiteSettingsRow>) {
    if (!sb) return;
    setStatus("saving");
    const next = { ...(settings ?? { id: 1, hijri_adjustment_days: 0, featured_dua_slug: null, featured_ziyara_slug: null }), ...patch };
    const { error } = await sb.from("site_settings").upsert({ ...next, id: 1 }, { onConflict: "id" });
    if (error) {
      setStatus("error");
      return;
    }
    setSettings(next as SiteSettingsRow);
    setStatus("saved");
    window.setTimeout(() => setStatus("idle"), 1800);
  }

  if (loading) return <p className="px-4 py-16 text-center text-[var(--ink-soft)]">{c.loading}</p>;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="mb-4 text-[var(--ink-soft)]">{c.notAdmin}</p>
        <button onClick={() => sb?.auth.signOut()} className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm">
          {c.signOut}
        </button>
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">{c.title}</h1>
          <p className="text-xs text-[var(--ink-soft)]">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saving" && <span className="text-xs text-[var(--ink-soft)]">{c.saving}</span>}
          {status === "saved" && <span className="text-xs text-[var(--primary)]">{c.saved}</span>}
          {status === "error" && <span className="text-xs text-red-600">{c.error}</span>}
          <button onClick={() => sb?.auth.signOut()} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs">
            {c.signOut}
          </button>
        </div>
      </header>

      {!editing && (
        <nav className="mb-6 flex gap-1 rounded-full border border-[var(--border)] p-1">
          {([["overview", c.tabOverview], ["content", c.tabContent], ["settings", c.tabSettings]] as const).map(
            ([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 rounded-full px-3 py-1.5 text-sm ${
                  tab === k ? "bg-[var(--primary)] text-white" : "text-[var(--ink-soft)]"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </nav>
      )}

      {!editing && tab === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [c.totalItems, stats.total],
            [c.published, stats.published],
            [c.drafts, stats.drafts],
            [c.emptySections, stats.emptySections],
          ].map(([label, value]) => (
            <div key={String(label)} className="illuminated px-5 py-6">
              <p className="text-3xl font-bold text-[var(--primary)]">{value}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{label}</p>
            </div>
          ))}
          <div className="illuminated px-5 py-6 sm:col-span-2">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[var(--ink-soft)]">{c.progress}</span>
              <span className="font-bold text-[var(--primary)]">{stats.percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div className="h-full bg-[var(--primary)] transition-all" style={{ width: `${stats.percent}%` }} />
            </div>
          </div>
        </div>
      )}

      {!editing && tab === "content" && (
        <div className="mb-4">
          {!newOpen ? (
            <button
              onClick={() => {
                setNewOpen(true);
                setNewErr(null);
                setSlugEdited(false);
              }}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white"
            >
              {c.newPage}
            </button>
          ) : (
            <div className="illuminated space-y-3 px-5 py-5">
              <p className="font-semibold text-[var(--primary)]">{c.newPageTitle}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.titleAr}</span>
                  <input
                    dir="rtl"
                    value={newTitleAr}
                    onChange={(e) => {
                      setNewTitleAr(e.target.value);
                      if (!slugEdited && !newTitleEn.trim()) setNewSlug(slugify(e.target.value));
                    }}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.titleEn}</span>
                  <input
                    dir="ltr"
                    value={newTitleEn}
                    onChange={(e) => {
                      setNewTitleEn(e.target.value);
                      if (!slugEdited) setNewSlug(slugify(e.target.value) || slugify(newTitleAr));
                    }}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.pageAddress}</span>
                <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
                  <span dir="ltr" className="shrink-0 text-sm text-[var(--ink-soft)]">
                    omalbnin.com/{locale}/{newType === "dua" ? "duas" : newType === "ziyara" ? "ziyarat" : "collections"}/
                  </span>
                  <input
                    dir="ltr"
                    value={newSlug}
                    onChange={(e) => {
                      setNewSlug(e.target.value);
                      setSlugEdited(true);
                    }}
                    placeholder="dua-ahad"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
                <span className="mt-1 block text-[11px] text-[var(--ink-soft)]">{c.pageAddressHint}</span>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.pageType}</span>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ContentItem["type"])}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                >
                  <option value="article">{c.typeArticle}</option>
                  <option value="dua">{c.typeDua}</option>
                  <option value="ziyara">{c.typeZiyara}</option>
                </select>
              </label>

              {newErr && <p className="text-sm text-red-600 dark:text-red-400">{newErr}</p>}

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const slug = newSlug.trim().toLowerCase();
                    if (!/^[a-z0-9-]+$/.test(slug)) return setNewErr(c.slugInvalid);
                    if (items.some((i) => i.slug === slug)) return setNewErr(c.slugTaken);
                    if (!newTitleAr.trim()) return setNewErr(c.titleRequired);
                    setNewErr(null);
                    createPage(slug, newType, newTitleAr.trim(), newTitleEn.trim());
                  }}
                  disabled={status === "saving"}
                  className="rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {status === "saving" ? c.saving : c.create}
                </button>
                <button
                  onClick={() => setNewOpen(false)}
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm"
                >
                  {c.cancel}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!editing && tab === "content" && (
        <ul className="space-y-2">
          {items.map((i) => {
            const empty = i.body.filter((b) => b.kind === "text" && !b.text_ar?.trim()).length;
            return (
              <li
                key={i.slug}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{locale === "ar" ? i.title_ar : i.title_en}</p>
                  <p className="text-xs text-[var(--ink-soft)]">
                    {i.published ? c.published : c.drafts}
                    {empty > 0 ? ` · ${empty} ${c.emptySections}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing(i.slug)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
                  >
                    {c.edit}
                  </button>
                  <button
                    onClick={() => removePage(i.slug)}
                    title={builtInSlugs.has(i.slug) ? c.builtInNote : undefined}
                    className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 dark:border-red-800 dark:text-red-400"
                  >
                    {builtInSlugs.has(i.slug) ? c.hidePage : c.deletePage}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {!editing && tab === "settings" && (
        <div className="illuminated space-y-5 px-5 py-6">
          <label className="block">
            <span className="mb-1 block text-sm">{c.hijri}</span>
            <input
              type="number"
              min={-2}
              max={2}
              value={settings?.hijri_adjustment_days ?? 0}
              onChange={(e) => saveSettings({ hijri_adjustment_days: Number(e.target.value) })}
              className="w-28 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            />
            <span className="mt-1 block text-xs text-[var(--ink-soft)]">{c.hijriHint}</span>
          </label>

          {(
            [
              ["featured_dua_slug", c.featuredDua, "dua"],
              ["featured_ziyara_slug", c.featuredZiyara, "ziyara"],
            ] as const
          ).map(([field, label, type]) => (
            <label key={field} className="block">
              <span className="mb-1 block text-sm">{label}</span>
              <select
                value={settings?.[field] ?? ""}
                onChange={(e) => saveSettings({ [field]: e.target.value || null } as Partial<SiteSettingsRow>)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
              >
                <option value="">{c.auto}</option>
                {items
                  .filter((i) => i.type === type)
                  .map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {locale === "ar" ? i.title_ar : i.title_en}
                    </option>
                  ))}
              </select>
            </label>
          ))}
        </div>
      )}

      {editing && current && (
        <div>
          <button
            onClick={() => setEditing(null)}
            className="mb-4 text-sm text-[var(--ink-soft)] hover:text-[var(--primary)]"
          >
            {locale === "ar" ? "→" : "←"} {c.back}
          </button>
          <h2 className="mb-4 text-xl font-bold">{locale === "ar" ? current.title_ar : current.title_en}</h2>

          {/* Titles and summaries were previously fixed in code, so the English
              title in particular could not be changed at all. */}
          <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.titleAr}</span>
                <input
                  dir="rtl"
                  value={current.title_ar ?? ""}
                  onChange={(e) => patchCurrent({ title_ar: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.titleEn}</span>
                <input
                  dir="ltr"
                  value={current.title_en ?? ""}
                  onChange={(e) => patchCurrent({ title_en: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.summaryAr}</span>
                <textarea
                  dir="rtl"
                  rows={2}
                  value={current.summary_ar ?? ""}
                  onChange={(e) => patchCurrent({ summary_ar: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--ink-soft)]">{c.summaryEn}</span>
                <textarea
                  dir="ltr"
                  rows={2}
                  value={current.summary_en ?? ""}
                  onChange={(e) => patchCurrent({ summary_en: e.target.value })}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                />
              </label>
            </div>
          </div>

          <SectionEditor
            blocks={current.body}
            locale={locale}
            onChange={(next) => setRows((r) => ({ ...r, [current.slug]: { slug: current.slug, body: next, published: current.published } }))}
          />

          <button
            onClick={() =>
              setRows((r) => ({
                ...r,
                [current.slug]: {
                  slug: current.slug,
                  published: current.published,
                  body: [
                    ...current.body,
                    { kind: "text", heading_ar: c.newSection, heading_en: c.newSection, text_ar: "", text_en: "", awaitingText: true },
                  ],
                },
              }))
            }
            className="mt-5 w-full rounded-lg border border-dashed border-[var(--border)] px-4 py-3 text-sm text-[var(--ink-soft)] hover:border-[var(--accent)]"
          >
            + {c.addSection}
          </button>

          {savedNotice && savedNotice.slug === current.slug && (
            <div className="mt-6 rounded-xl border-2 border-[var(--primary)] bg-[var(--accent-soft)]/40 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--primary)]">
                  ✓ {savedNotice.published ? c.savedLive : c.savedDraft}
                </p>
                <div className="flex items-center gap-2">
                  {savedNotice.published && (
                    <a
                      href={`/${locale}/${current.type === "dua" ? "duas" : current.type === "ziyara" ? "ziyarat" : "collections"}/${current.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white"
                    >
                      {c.viewPage}
                    </a>
                  )}
                  <button
                    onClick={() => setSavedNotice(null)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs"
                  >
                    {c.dismiss}
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-6 rounded-xl border-2 border-red-500 px-4 py-4">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">{c.saveFailed}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={current.published}
                onChange={(e) =>
                  setRows((r) => ({ ...r, [current.slug]: { slug: current.slug, body: current.body, published: e.target.checked } }))
                }
              />
              <span>
                {c.publish}
                <span className="block text-xs text-[var(--ink-soft)]">{c.publishHint}</span>
              </span>
            </label>
            <button
              onClick={() => saveItem(current.slug, current.body, current.published)}
              disabled={status === "saving"}
              className="rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {status === "saving" ? c.saving : c.save}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
