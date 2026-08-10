import { Link } from "react-router-dom";

export default function VisaTypeCard({ countrySlug, visaType }) {
  return (
    <Link
      to={`/countries/${countrySlug}/${visaType.slug}`}
      className="group flex items-center justify-between border border-hairline bg-ivory p-5 transition-colors hover:border-ink"
    >
      <div>
        <h3 className="font-semibold tracking-tight text-ink">{visaType.name}</h3>
        <p className="mt-1 text-sm text-warm-gray">{visaType.description}</p>
      </div>
      <span className="text-ink text-lg shrink-0 ml-4 group-hover:text-burgundy transition-colors">→</span>
    </Link>
  );
}
