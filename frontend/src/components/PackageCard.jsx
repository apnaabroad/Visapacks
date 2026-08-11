import { Link } from "react-router-dom";

import { formatCurrency } from "../lib/currency.js";

export default function PackageCard({ pkg }) {
  const isPremium = pkg.tier === "PREMIUM";
  const isPopular = pkg.popular && !isPremium;
  const mutedText = isPremium ? "text-dusty-rose" : "text-warm-gray";

  return (
    <div
      className={`relative flex h-full flex-col border p-8 transition-all duration-200 ${
        isPremium
          ? "bg-ink border-ink text-ivory shadow-elevated hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(22,22,22,0.22)]"
          : isPopular
            ? "bg-ivory border-burgundy/30 text-ink shadow-elevated lg:scale-105 z-10 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(122,31,43,0.16)]"
            : "bg-ivory border-hairline text-ink shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-burgundy px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ivory shadow-card-hover">
          Most Chosen
        </span>
      )}

      <p className="text-xs font-semibold uppercase tracking-wide">
        <span className={mutedText}>{pkg.tier}</span>
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
        className={`mt-10 block px-4 py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
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
