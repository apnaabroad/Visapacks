import { Link } from "react-router-dom";

const currencyFormat = (amount, currency) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export default function PackageCard({ pkg }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
        pkg.popular ? "border-brand-500 shadow-xl shadow-brand-100 sm:scale-105" : "border-slate-200"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{pkg.tagline}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-slate-900">
          {currencyFormat(pkg.price, pkg.currency)}
        </span>
        <span className="text-sm text-slate-400">/ application</span>
      </p>
      {pkg.turnaround && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
          {pkg.turnaround}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-0.5 text-brand-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/checkout/${pkg.id}`}
        className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
          pkg.popular
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "bg-slate-900 text-white hover:bg-slate-700"
        }`}
      >
        Choose {pkg.name}
      </Link>
    </div>
  );
}
