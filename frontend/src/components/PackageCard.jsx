import { Link } from "react-router-dom";

import { formatCurrency } from "../lib/currency.js";

// Styled like a boarding-pass / ticket stub - a dashed perforation between
// the price block and the feature list, with die-cut notches on the card's
// edges (see .ticket-notch in index.css) instead of a plain bordered box.
export default function PackageCard({ pkg }) {
  const isPremium = pkg.tier === "PREMIUM";
  const isPopular = pkg.popular && !isPremium;
  const mutedText = isPremium ? "text-sand" : "text-stone";

  return (
    <div
      className={`ticket-notch relative flex h-full flex-col border p-8 transition-all duration-200 ${
        isPremium
          ? "bg-ink border-ink text-ivory shadow-elevated hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(20,37,31,0.3)]"
          : isPopular
            ? "bg-ivory border-brass/40 text-ink shadow-elevated lg:scale-105 z-10 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(169,119,47,0.2)]"
            : "bg-ivory border-hairline text-ink shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brass px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ivory shadow-card-hover">
          Most Chosen
        </span>
      )}

      <p className="text-xs font-semibold uppercase tracking-wide">
        <span className={mutedText}>{pkg.tier}</span>
      </p>

      <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">{pkg.name}</h3>
      <p className={`mt-1 text-sm ${mutedText}`}>{pkg.tagline}</p>

      <p className="font-display mt-8 text-4xl font-semibold tracking-tight">
        {formatCurrency(pkg.price, pkg.currency)}
      </p>
      <p className={`mt-1 text-xs font-medium uppercase tracking-wide ${mutedText}`}>
        One-time{pkg.turnaround && ` · ${pkg.turnaround}`}
      </p>

      <div
        className={`mt-8 border-t border-dashed ${isPremium ? "border-ivory/25" : "border-hairline"}`}
        aria-hidden="true"
      />

      <ul className="mt-6 flex-1 space-y-3 text-sm">
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
            ? "bg-ivory text-ink hover:bg-brass hover:text-ivory"
            : "bg-ink text-ivory hover:bg-brass"
        }`}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}
