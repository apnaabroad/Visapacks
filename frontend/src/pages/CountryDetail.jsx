import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { getCountry } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Flag from "../components/Flag.jsx";
import Loading from "../components/Loading.jsx";
import VisaTypeCard from "../components/VisaTypeCard.jsx";

export default function CountryDetail() {
  const { countrySlug } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCountry(null);
    setError(null);
    getCountry(countrySlug)
      .then(setCountry)
      .catch((err) => setError(getErrorMessage(err)));
  }, [countrySlug]);

  if (error) return <ErrorMessage message={error} />;
  if (!country) return <Loading label="Loading visa types..." />;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Link to="/" className="text-sm text-ink hover:text-burgundy font-medium transition-colors">
        ← All countries
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <Flag code={country.code} className="text-5xl" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">{country.name}</h1>
          <p className="text-warm-gray">{country.summary}</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold tracking-tight text-ink">Select a visa type</h2>
      <div className="mt-4 space-y-3">
        {country.visaTypes.length === 0 && (
          <p className="text-warm-gray text-sm">No visa types are available for this country yet.</p>
        )}
        {country.visaTypes.map((visaType) => (
          <VisaTypeCard key={visaType.id} countrySlug={country.slug} visaType={visaType} />
        ))}
      </div>
    </div>
  );
}
