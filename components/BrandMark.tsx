/**
 * The site mark: the crescent that is also the browser-tab icon.
 *
 * `spinning` turns it into the loading indicator. It steps round an eighth of a
 * turn at a time rather than sweeping continuously, which reads as a moon
 * moving through its places rather than as a smeared ring.
 *
 * Kept in step with app/icon.svg by hand: that file has to stay a standalone
 * SVG for the browser, so the two cannot share a source. The path is identical
 * in both; only the fills differ, since this one follows the page theme.
 */
export default function BrandMark({
  size = 48,
  spinning = false,
  className = "",
}: {
  size?: number;
  spinning?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`${spinning ? "brand-mark-spin" : ""} ${className}`}
      role={spinning ? "status" : "presentation"}
      aria-hidden={spinning ? undefined : true}
    >
      <rect width="64" height="64" rx="14" fill="var(--primary)" />
      <path
        transform="translate(47.5 32)"
        d="M 10.462 -17.046 A 20 20 0 1 0 10.462 17.046 A 17.5 17.5 0 1 1 10.462 -17.046 Z"
        fill="var(--accent-bright)"
      />
    </svg>
  );
}
