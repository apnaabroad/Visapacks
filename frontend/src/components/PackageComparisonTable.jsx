import { FEATURE_MATRIX, TIER_LABELS, TIER_ORDER } from "../data/packageFeatures.js";

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mx-auto h-4 w-4 text-burgundy" aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mx-auto h-4 w-4 text-hairline" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Renders the static feature-comparison grid beneath the pricing cards on a
// visa-type page. `packages` (from the API) supplies tier names/labels in
// case a country's package set ever diverges from the default lineup; the
// row data itself comes from the shared packageFeatures matrix.
export default function PackageComparisonTable({ packages }) {
  const tiers = TIER_ORDER.filter((tier) => packages.some((pkg) => pkg.tier === tier));
  if (tiers.length === 0) return null;

  return (
    <div className="mt-16 overflow-x-auto">
      <h2 className="text-lg font-bold tracking-tight text-ink">Compare packages</h2>
      <table className="mt-6 w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-hairline pb-3 pr-4 text-left font-medium text-warm-gray">Feature</th>
            {tiers.map((tier) => {
              const pkg = packages.find((p) => p.tier === tier);
              return (
                <th key={tier} className="border-b border-hairline pb-3 px-4 text-center font-semibold text-ink">
                  {pkg?.name ?? TIER_LABELS[tier]}
                  {pkg?.popular && (
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-burgundy">
                      Most Chosen
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FEATURE_MATRIX.map((row) => (
            <tr key={row.label} className="border-b border-hairline last:border-0">
              <td className="py-3 pr-4 text-ink">{row.label}</td>
              {tiers.map((tier) => (
                <td key={tier} className="py-3 px-4 text-center">
                  {row.tiers.includes(tier) ? <Check /> : <Cross />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
