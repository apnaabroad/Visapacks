import { Link } from "react-router-dom";

import { formatCurrency } from "../lib/currency.js";

// Tiers are told apart by solid color blocking - the same device the
// reference layout uses for its content cards - rather than by a subtle
// border/shadow difference. Starter stays a quiet outline; each tier above
// it gets a bolder fill.
const TIER_STYLE = {
  STARTER: {
    card: "bg-ivory border border-hairline text-ink",
    muted: "text-stone",
    button: "bg-ink text-ivory hover:bg-brass hover:text-ink",
  },
  ESSENTIAL: {
    card: "bg-petrol border border-petrol text-ink",
    muted: "text-stone",
    button: "bg-ink text-ivory hover:bg-brass hover:text-ink",
  },
  COMPLETE: {
    card: "bg-brass border border-brass text-ink",
    muted: "text-ink/60",
    button: "bg-ink text-ivory hover:bg-ivory hover:text-ink",
  },
  PREMIUM: {
    card: "bg-ink border border-ink text-ivory",
    muted: "text-sand",
    button: "bg-ivory text-ink hover:bg-brass",
  },
};

export default function PackageCard({ pkg }) {
  const style = TIER_STYLE[pkg.tier] ?? TIER_STYLE.STARTER;
  const isPopular = pkg.popular && pkg.tier !== "PREMIUM";

  return (
    <div
      className={`relative flex h-full flex-col rounded-[28px] p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${style.card}`}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ivory shadow-card-hover">
          Most Chosen
        </span>
      )}

      <p className="text-xs font-bold uppercase tracking-wide">
        <span className={style.muted}>{pkg.tier}</span>
      </p>

      <h3 className="font-display mt-3 text-xl font-bold tracking-tight">{pkg.name}</h3>
      <p className={`mt-1 text-sm ${style.muted}`}>{pkg.tagline}</p>

      <p className="font-display mt-8 text-4xl font-extrabold tracking-tight">
        {formatCurrency(pkg.price, pkg.currency)}
      </p>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${style.muted}`}>
        One-time{pkg.turnaround && ` · ${pkg.turnaround}`}
      </p>

      <ul className="mt-8 flex-1 space-y-3 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className={style.muted}>—</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/checkout/${pkg.id}`}
        className={`mt-10 block rounded-full px-4 py-3.5 text-center text-sm font-bold transition-all duration-200 hover:scale-[1.02] ${style.button}`}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}
