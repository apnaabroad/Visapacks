import { Link } from "react-router-dom";

import CountryImage from "./CountryImage.jsx";
import Flag from "./Flag.jsx";

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/countries/${country.slug}`}
      className="group flex flex-col border border-hairline bg-ivory shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/50 hover:shadow-card-hover"
    >
      <CountryImage country={country} variant="card" />
      <div className="flex flex-col p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-2xl">
          <Flag code={country.code} />
        </span>
        <h3 className="font-display mt-4 text-lg font-semibold tracking-tight text-ink">{country.name}</h3>
        <p className="mt-1 text-sm text-stone">{country.summary}</p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-stone group-hover:text-brass transition-colors duration-200">
          {country._count?.visaTypes ?? 0} visa type{country._count?.visaTypes === 1 ? "" : "s"} →
        </p>
      </div>
    </Link>
  );
}
