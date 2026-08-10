import { Link } from "react-router-dom";

export default function VisaTypeCard({ countrySlug, visaType }) {
  return (
    <Link
      to={`/countries/${countrySlug}/${visaType.slug}`}
      className="group flex items-center justify-between rounded-xl border border-line bg-white p-5 transition-all hover:border-cognac-200 hover:shadow-md"
    >
      <div>
        <h3 className="font-semibold text-ink group-hover:text-cognac-700 transition-colors">
          {visaType.name}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{visaType.description}</p>
      </div>
      <span className="text-cognac-600 text-lg shrink-0 ml-4">→</span>
    </Link>
  );
}
