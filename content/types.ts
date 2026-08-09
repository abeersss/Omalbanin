/** Verification status - never mark something "verified" without a real source check. */
export type VerificationStatus =
  | "primary_source" // wording confirmed against a named primary reference (e.g. Mafatih al-Jinan)
  | "traditional_practice" // widely-practiced devotional tradition, not directly sourced to a primary text
  | "needs_verification" // attribution/wording not yet confirmed - flagged for scholarly review
  | "site_original_media"; // preserved as-is from the legacy site (image/video), not re-typed

export type ContentType =
  | "dua"
  | "ziyara"
  | "amal"
  | "person"
  | "article"
  | "occasion"
  | "collection";

export interface SourceInfo {
  name_ar: string;
  name_en: string;
  reference?: string;
  url?: string;
}

export interface BodyBlock {
  /** "text" = real migrated/authored Arabic-English text. "image" = legacy image,
   * preserved verbatim rather than re-typed. "embed" = external viewer (e.g. AnyFlip / YouTube).
   * "pdf" = an uploaded booklet, rendered in the page-turning reader. */
  kind: "text" | "image" | "embed" | "pdf";
  /** Uploaded PDF, shown as a flipping book rather than a download link. */
  pdfUrl?: string;
  heading_ar?: string;
  heading_en?: string;
  text_ar?: string;
  text_en?: string;
  /** Recitation count for sections repeated a fixed number of times. Shown as a
   * badge on the section; it is display metadata, not part of the text. */
  repeat?: number;
  /** Instruction shown above a section (etiquette, posture, when to recite).
   * Deliberately separate from text_ar so guidance is never mistaken for the
   * devotional text itself. */
  note_ar?: string;
  note_en?: string;
  /** True while this section is an empty division awaiting the site owner's
   * text. The reader renders a visible placeholder instead of a blank gap, and
   * nothing is ever auto-filled. */
  awaitingText?: boolean;
  imageUrl?: string;
  /** Optional English-language variant of the image, for pages whose artwork
   *  carries Arabic text baked in. Falls back to imageUrl when unset, so a
   *  single shared image stays the common case. */
  imageUrl_en?: string;
  imageAlt_ar?: string;
  imageAlt_en?: string;
  embedUrl?: string;
  embedLabel_ar?: string;
  embedLabel_en?: string;
}

export interface ContentItem {
  id: string;
  slug: string;
  type: ContentType;
  category?: string[];
  title_ar: string;
  title_en: string;
  summary_ar?: string;
  summary_en?: string;
  intro_ar?: string;
  intro_en?: string;
  body: BodyBlock[];
  source?: SourceInfo;
  verification_status: VerificationStatus;
  occasion?: string;
  weekday?: string; // "friday" etc
  hijri_month?: number;
  hijri_day?: number;
  related_person?: string[];
  related_content?: string[];
  reading_time_minutes?: number;
  featured?: boolean;
  tags_ar?: string[];
  tags_en?: string[];
  published: boolean;
  legacyUrl?: string; // old WordPress URL, for redirect mapping
}

export interface Masum {
  id: string;
  slug: string;
  order: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  kunya_ar?: string;
  kunya_en?: string;
  birth_ar?: string;
  birth_en?: string;
  martyrdom_ar?: string;
  martyrdom_en?: string;
  relation_ar: string;
  relation_en: string;
  bio_ar: string;
  bio_en: string;
  teachings: { text_ar: string; text_en: string; source?: SourceInfo }[];
  related_content: string[]; // slugs into duas/ziyarat
  occasions: { label_ar: string; label_en: string; hijri_month: number; hijri_day: number }[];
  verification_status: VerificationStatus;
}

export interface Occasion {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  hijri_month: number;
  hijri_day: number;
  kind: "wiladat" | "shahadat" | "eid" | "other";
  related_person?: string;
  related_content?: string[];
  verification_status: VerificationStatus;
}
