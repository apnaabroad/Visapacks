import { Link } from "react-router-dom";

export default function VisaTypeCard({ countrySlug, visaType }) {
  return (
    <Link
      to={`/countries/${countrySlug}/${visaType.slug}`}
      className="group flex items-center justify-between rounded-3xl border border-hairline bg-ivory p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div>
        <h3 className="font-display font-bold tracking-tight text-ink">{visaType.name}</h3>
        <p className="mt-1 text-sm text-stone">{visaType.description}</p>
      </div>
      <span className="flex h-9 w-9 shrink-0 ml-4 items-center justify-center rounded-full bg-ink text-ivory text-base transition-all duration-200 group-hover:bg-brass group-hover:text-ink group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
