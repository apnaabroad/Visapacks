import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/countries/${country.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-cognac-200"
    >
      <span className="text-4xl">{country.flagEmoji}</span>
      <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-cognac-700 transition-colors">
        {country.name}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{country.summary}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-cognac-600">
        {country._count?.visaTypes ?? 0} visa type{country._count?.visaTypes === 1 ? "" : "s"} →
      </p>
    </Link>
  );
}
