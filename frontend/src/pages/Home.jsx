import { useEffect, useState } from "react";

import { getCountries } from "../api/visaPacks.js";
import ArcPathSection from "../components/ArcPathSection.jsx";
import CountryCard from "../components/CountryCard.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import OrbitingFlags from "../components/OrbitingFlags.jsx";
import Reveal from "../components/Reveal.jsx";
import ScrollTagline from "../components/ScrollTagline.jsx";
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
      <section className="hero-glow relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-28 pb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <Reveal>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] text-ink">
                  Apply for your visa yourself.
                  <br />
                  <span className="text-burgundy">We'll guide every step.</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-warm-gray">
                  Pick your destination and visa type, choose a package that matches how much
                  help you want, and get everything from a form walkthrough to a full toolkit
                  of templates and checklists - all without an agent filing on your behalf.
                </p>
              </Reveal>

              <Reveal
                delay={100}
                className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-warm-gray"
              >
                <span>8 countries supported</span>
                <span aria-hidden="true">·</span>
                <span>Not a government agency</span>
                <span aria-hidden="true">·</span>
                <span>You file, we guide</span>
              </Reveal>
            </div>

            <div className="hidden md:flex justify-center">
              <OrbitingFlags />
            </div>
          </div>
        </div>
      </section>

      <ScrollTagline />

      <section id="choose-destination" className="mx-auto max-w-6xl px-4 sm:px-6 pb-28">
        <Reveal as="h2" className="text-2xl font-bold tracking-tight text-ink mb-8">
          Choose a destination
        </Reveal>

        {error && <ErrorMessage message={error} />}
        {!error && !countries && <Loading label="Loading countries..." />}
        {!error && countries && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {countries.map((country, index) => (
              <Reveal key={country.id} delay={index * 70} className="h-full">
                <CountryCard country={country} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section id="how-it-works" className="border-t border-hairline bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
          <Reveal as="h2" className="text-2xl font-bold tracking-tight text-ink mb-10">
            How it works
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick country & visa type",
                body: "Browse popular destinations and select the visa category that matches your trip.",
              },
              {
                step: "02",
                title: "Choose your package",
                body: "Starter for the essentials, Essential for the master guide, Complete for every template, or Premium for the full toolkit.",
              },
              {
                step: "03",
                title: "Apply with confidence",
                body: "You submit your own application - we make sure it's complete, accurate, and on time.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.step}
                delay={index * 90}
                className="h-full border border-hairline bg-ivory p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <p className="text-sm font-semibold text-burgundy">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-warm-gray">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArcPathSection />
    </div>
  );
}
