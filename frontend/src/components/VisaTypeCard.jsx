import { Link } from "react-router-dom";

export default function VisaTypeCard({ countrySlug, visaType }) {
  return (
    <Link
      to={`/countries/${countrySlug}/${visaType.slug}`}
      className="group flex items-center justify-between border border-hairline bg-ivory p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-card-hover"
    >
      <div>
        <h3 className="font-display font-semibold tracking-tight text-ink">{visaType.name}</h3>
        <p className="mt-1 text-sm text-stone">{visaType.description}</p>
      </div>
      <span className="text-ink text-lg shrink-0 ml-4 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brass">
        →
      </span>
    </Link>
  );
}
