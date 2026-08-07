"use client";

import { useEffect, useState } from "react";
import { Locale, t } from "@/lib/i18n";

type Theme = "light" | "dark" | "reading";

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Post-mount localStorage read — see Counter.tsx for why this can't be a
    // useState lazy initializer (localStorage is unavailable during static export).
    const saved = (localStorage.getItem("omalbnin-theme") as Theme) || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(saved);
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    localStorage.setItem("omalbnin-theme", next);
    const root = document.documentElement;
    root.classList.remove("dark", "reading");
    if (next !== "light") root.classList.add(next);
  }

  const options: { key: Theme; icon: string; label: string }[] = [
    { key: "light", icon: "☀️", label: t(locale, "light_mode") },
    { key: "dark", icon: "🌙", label: t(locale, "dark_mode") },
    { key: "reading", icon: "📖", label: locale === "ar" ? "وضع القراءة" : "Reading mode" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] p-1">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => apply(o.key)}
          title={o.label}
          aria-pressed={theme === o.key}
          className={`h-8 w-8 rounded-full text-sm transition ${
            theme === o.key ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--accent-soft)]"
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}
