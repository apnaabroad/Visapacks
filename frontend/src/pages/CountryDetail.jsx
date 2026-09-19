import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { getCountry } from "../api/visaPacks.js";
import CountryImage from "../components/CountryImage.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Flag from "../components/Flag.jsx";
import Loading from "../components/Loading.jsx";
import Reveal from "../components/Reveal.jsx";
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
      <Link to="/" className="text-sm text-ink hover:opacity-60 font-medium transition-colors duration-200">
        ← All countries
      </Link>

      <Reveal className="mt-4">
        <CountryImage country={country} variant="banner" />
      </Reveal>

      <Reveal className="mt-6 flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hairline bg-ivory text-3xl shadow-card">
          <Flag code={country.code} />
        </span>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">{country.name}</h1>
          <p className="text-stone">{country.summary}</p>
        </div>
      </Reveal>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">Select a visa type</h2>
      <div className="mt-5 space-y-3">
        {country.visaTypes.length === 0 && (
          <p className="text-stone text-sm">No visa types are available for this country yet.</p>
        )}
        {country.visaTypes.map((visaType, index) => (
          <Reveal key={visaType.id} delay={index * 70}>
            <VisaTypeCard countrySlug={country.slug} visaType={visaType} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
