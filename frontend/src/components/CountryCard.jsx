import { Link } from "react-router-dom";

import Flag from "./Flag.jsx";

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/countries/${country.slug}`}
      className="group flex flex-col border border-hairline bg-ivory p-6 transition-colors hover:border-ink"
    >
      <Flag code={country.code} className="text-4xl" />
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{country.name}</h3>
      <p className="mt-1 text-sm text-warm-gray">{country.summary}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-warm-gray group-hover:text-burgundy transition-colors">
        {country._count?.visaTypes ?? 0} visa type{country._count?.visaTypes === 1 ? "" : "s"} →
      </p>
    </Link>
  );
}
