// Country flag emoji (e.g. 🇺🇸) render inconsistently across platforms -
// many systems, especially Linux and some Windows/browser combinations,
// lack a font capable of drawing the flag glyph and fall back to showing
// the raw two-letter code instead ("US", "GB"). This renders an actual SVG
// flag via the flag-icons package instead, which looks the same everywhere.
//
// Our Country.code values are mostly real ISO 3166-1 alpha-2 codes, which
// flag-icons supports directly by lowercasing - new countries added via
// prisma/seed.js need no changes here as long as they use a standard code.
// A couple of our codes aren't real country codes (UK is conventionally
// "GB", and SCHENGEN isn't a country at all), so those get an explicit
// override to the closest sensible flag.
const CODE_OVERRIDES = {
  UK: "gb",
  SCHENGEN: "eu",
};

export default function Flag({ code, className = "" }) {
  const iso = CODE_OVERRIDES[code] ?? code?.toLowerCase();
  return (
    <span
      className={`fi fi-${iso} rounded-sm align-middle ${className}`}
      role="img"
      aria-label={`${code} flag`}
    />
  );
}
