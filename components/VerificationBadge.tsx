import { Locale, t } from "@/lib/i18n";
import { VerificationStatus } from "@/content/types";

const styles: Record<VerificationStatus, string> = {
  primary_source: "bg-[var(--primary)]/10 text-[var(--primary)]",
  traditional_practice: "bg-[var(--accent)]/15 text-[var(--accent)]",
  needs_verification: "bg-red-500/10 text-red-700 dark:text-red-400",
  site_original_media: "bg-[var(--ink-soft)]/10 text-[var(--ink-soft)]",
};

const keys: Record<VerificationStatus, string> = {
  primary_source: "verification_primary",
  traditional_practice: "verification_traditional",
  needs_verification: "verification_needs",
  site_original_media: "verification_site",
};

export default function VerificationBadge({ status, locale }: { status: VerificationStatus; locale: Locale }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {t(locale, keys[status])}
    </span>
  );
}
