"use client";

import { useEffect, useState } from "react";
import { Locale, t } from "@/lib/i18n";

export default function Counter({
  storageKey,
  locale,
  target,
}: {
  storageKey: string;
  locale: Locale;
  target?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reading localStorage must happen post-mount (it does not exist during
    // static prerendering); this intentionally causes one extra client render
    // rather than a server/client hydration mismatch.
    const saved = Number(localStorage.getItem(storageKey) || 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(saved);
  }, [storageKey]);

  function inc() {
    const next = count + 1;
    setCount(next);
    localStorage.setItem(storageKey, String(next));
    if (navigator.vibrate) navigator.vibrate(8);
  }
  function reset() {
    setCount(0);
    localStorage.setItem(storageKey, "0");
  }

  const pct = target ? Math.min(100, (count / target) * 100) : undefined;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={inc}
        className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--primary)] text-white text-2xl font-bold shadow-lg shadow-[var(--primary)]/20 active:scale-95 transition"
        aria-label={t(locale, "counter_tap")}
      >
        {count}
        {target ? <span className="text-xs font-normal opacity-80">/ {target}</span> : null}
      </button>
      {pct !== undefined && (
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-[var(--border)]">
          <div className="h-full bg-[var(--primary)] transition-all" style={{ width: `${pct}%` }} />
        </div>
      )}
      <button onClick={reset} className="text-xs text-[var(--ink-soft)] underline underline-offset-2">
        {t(locale, "counter_reset")}
      </button>
      <p className="text-xs text-[var(--ink-soft)]">{locale === "ar" ? "محفوظ محليًا على جهازك فقط" : "Saved locally on this device only"}</p>
    </div>
  );
}
