// A thin radiating starburst mark - one SVG, colored via `className` (uses
// currentColor), matching the reference layout's single recurring
// decorative graphic instead of a stock icon set or a photo.
export default function Starburst({ className = "", rayCount = 24 }) {
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (360 / rayCount) * i;
    return (
      <line
        key={i}
        x1="50"
        y1="6"
        x2="50"
        y2="22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${angle} 50 50)`}
      />
    );
  });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {rays}
    </svg>
  );
}
