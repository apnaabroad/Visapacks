import { useEffect, useState } from "react";

import { getCountries } from "../api/visaPacks.js";
import CountryCard from "../components/CountryCard.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import { getErrorMessage } from "../api/client.js";

export default function Home() {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink">
          Apply for your visa yourself.
          <br />
          <span className="text-burgundy">We'll guide every step.</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-warm-gray">
          Pick your destination and visa type, choose a package that matches how much
          help you want, and get a clear checklist, expert review, or full 1-on-1
          support - all without an agent filing on your behalf.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-warm-gray">
          <span>8 countries supported</span>
          <span aria-hidden="true">·</span>
          <span>Not a government agency</span>
          <span aria-hidden="true">·</span>
          <span>You file, we guide</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <h2 className="text-xl font-bold tracking-tight text-ink mb-6">Choose a destination</h2>

        {error && <ErrorMessage message={error} />}
        {!error && !countries && <Loading label="Loading countries..." />}
        {!error && countries && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        )}
      </section>

      <section id="how-it-works" className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 grid gap-10 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick country & visa type",
              body: "Browse popular destinations and select the visa category that matches your trip.",
            },
            {
              step: "02",
              title: "Choose your package",
              body: "Basic for a DIY checklist, Standard for expert review, or Premium for full 1-on-1 guidance.",
            },
            {
              step: "03",
              title: "Apply with confidence",
              body: "You submit your own application - we make sure it's complete, accurate, and on time.",
            },
          ].map((item) => (
            <div key={item.step} className="border-t border-hairline pt-6">
              <p className="text-sm font-semibold text-burgundy">{item.step}</p>
              <h3 className="mt-3 font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-warm-gray">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
