import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { getVisaType } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function VisaTypeDetail() {
  const { countrySlug, visaTypeSlug } = useParams();
  const [visaType, setVisaType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setVisaType(null);
    setError(null);
    getVisaType(countrySlug, visaTypeSlug)
      .then(setVisaType)
      .catch((err) => setError(getErrorMessage(err)));
  }, [countrySlug, visaTypeSlug]);

  if (error) return <ErrorMessage message={error} />;
  if (!visaType) return <Loading label="Loading packages..." />;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <Link
        to={`/countries/${countrySlug}`}
        className="text-sm text-brand-600 hover:text-brand-700 font-medium"
      >
        ← {visaType.country.name}
      </Link>

      <div className="mt-4">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {visaType.country.flagEmoji} {visaType.name}
        </h1>
        <p className="mt-1 text-slate-500 max-w-2xl">{visaType.description}</p>
      </div>

      {visaType.packages.length === 0 ? (
        <p className="mt-10 text-slate-500 text-sm">No packages are available for this visa type yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {visaType.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
