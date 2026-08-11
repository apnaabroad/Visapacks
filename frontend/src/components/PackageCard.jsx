import { Link } from "react-router-dom";

import { formatCurrency } from "../lib/currency.js";

export default function PackageCard({ pkg }) {
  const isPremium = pkg.tier === "PREMIUM";
  const mutedText = isPremium ? "text-dusty-rose" : "text-warm-gray";

  return (
    <div
      className={`flex h-full flex-col border p-8 ${
        isPremium ? "bg-ink border-ink text-ivory" : "bg-ivory border-hairline text-ink"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide">
        <span className={mutedText}>{pkg.tier}</span>
        {pkg.popular && !isPremium && <span className="text-burgundy"> · Most Chosen</span>}
      </p>

      <h3 className="mt-3 text-xl font-bold tracking-tight">{pkg.name}</h3>
      <p className={`mt-1 text-sm ${mutedText}`}>{pkg.tagline}</p>

      <p className="mt-8 text-4xl font-bold tracking-tight">{formatCurrency(pkg.price, pkg.currency)}</p>
      <p className={`mt-1 text-xs font-medium uppercase tracking-wide ${mutedText}`}>
        One-time{pkg.turnaround && ` · ${pkg.turnaround}`}
      </p>

      <ul className="mt-8 flex-1 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className={mutedText}>—</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/checkout/${pkg.id}`}
        className={`mt-10 block px-4 py-3 text-center text-sm font-semibold transition-colors ${
          isPremium
            ? "bg-ivory text-ink hover:bg-burgundy hover:text-ivory"
            : "bg-ink text-ivory hover:bg-burgundy"
        }`}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}
