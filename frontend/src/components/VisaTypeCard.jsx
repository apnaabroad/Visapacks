import { Link } from "react-router-dom";

export default function VisaTypeCard({ countrySlug, visaType }) {
  return (
    <Link
      to={`/countries/${countrySlug}/${visaType.slug}`}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-md"
    >
      <div>
        <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
          {visaType.name}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{visaType.description}</p>
      </div>
      <span className="text-brand-600 text-lg shrink-0 ml-4">→</span>
    </Link>
  );
}
