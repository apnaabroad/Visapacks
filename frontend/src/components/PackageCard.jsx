import { Link } from "react-router-dom";

const currencyFormat = (amount, currency) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

// Per-tier badge colors: Basic = taupe, Standard = cognac, Premium = burgundy.
const TIER_BADGE_STYLES = {
  BASIC: "bg-taupe-500 text-ink",
  STANDARD: "bg-cognac-600 text-white",
  PREMIUM: "bg-primary-600 text-white",
};

export default function PackageCard({ pkg }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
        pkg.popular ? "border-accent-500 shadow-xl shadow-accent-100 sm:scale-105" : "border-line"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <span
        className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TIER_BADGE_STYLES[pkg.tier] ?? "bg-taupe-500 text-ink"}`}
      >
        {pkg.tier}
      </span>
      <h3 className="mt-3 text-lg font-bold text-ink">{pkg.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{pkg.tagline}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-ink">
          {currencyFormat(pkg.price, pkg.currency)}
        </span>
        <span className="text-sm text-ink-faint">/ application</span>
      </p>
      {pkg.turnaround && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cognac-600">
          {pkg.turnaround}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-muted">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-0.5 text-cognac-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/checkout/${pkg.id}`}
        className="mt-8 block rounded-lg bg-accent-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}
