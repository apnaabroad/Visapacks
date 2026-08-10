import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { getVisaType } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Flag from "../components/Flag.jsx";
import Loading from "../components/Loading.jsx";
import PackageCard from "../components/PackageCard.jsx";
import Reveal from "../components/Reveal.jsx";

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
        className="text-sm text-ink hover:text-burgundy font-medium transition-colors"
      >
        ← {visaType.country.name}
      </Link>

      <Reveal className="mt-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-ink">
          <Flag code={visaType.country.code} className="text-3xl" />
          {visaType.name}
        </h1>
        <p className="mt-1 text-warm-gray max-w-2xl">{visaType.description}</p>
      </Reveal>

      {visaType.packages.length === 0 ? (
        <p className="mt-10 text-warm-gray text-sm">No packages are available for this visa type yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {visaType.packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
