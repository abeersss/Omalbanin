/**
 * The site mark: the eight-pointed star that is also the browser-tab icon.
 *
 * `spinning` turns it into the loading indicator. It rotates 45 degrees at a
 * time rather than sweeping continuously, so each step lands the star back on
 * its own symmetry and it reads as the mark throughout rather than as a blur.
 *
 * Kept in step with app/icon.svg by hand: that file has to stay a standalone
 * SVG for the browser, so the two cannot share a source.
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
      <g transform="translate(32 32)">
        <g fill="var(--accent-bright)">
          <rect x="-17" y="-17" width="34" height="34" rx="3" />
          <rect x="-17" y="-17" width="34" height="34" rx="3" transform="rotate(45)" />
        </g>
        <circle r="7.5" fill="var(--primary)" />
      </g>
    </svg>
  );
}
