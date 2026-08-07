import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href: string;
  cta: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{eyebrow}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <h3 className="mb-2 text-lg font-bold text-[var(--ink)]">{title}</h3>
      {description && <p className="mb-4 text-sm text-[var(--ink-soft)] line-clamp-2">{description}</p>}
      <span className="mt-auto text-sm font-semibold text-[var(--primary)] group-hover:underline">{cta}</span>
    </Link>
  );
}
