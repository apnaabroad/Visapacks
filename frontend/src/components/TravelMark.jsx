// A solid circular travel mark - a filled badge with a paper-plane glyph,
// replacing the thin radiating-lines starburst. Reads as an intentional
// icon rather than a decorative flourish, and works at any size via the
// wrapping element's width/height utility classes.
export default function TravelMark({ className = "" }) {
  return (
    <span className={`flex items-center justify-center rounded-full bg-brass text-ink ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[42%] w-[42%] -translate-x-[6%] translate-y-[6%] -rotate-45" fill="currentColor" aria-hidden="true">
        <path d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,13.5V19L7.5,20.5V22L11.5,21L15.5,22V20.5L13,19V13.5L21,16Z" />
      </svg>
    </span>
  );
}
