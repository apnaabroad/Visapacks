import { useEffect, useState } from "react";

import { getCountries } from "../api/visaPacks.js";
import ClosingCta from "../components/ClosingCta.jsx";
import CountryCard from "../components/CountryCard.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import HeroHeadline from "../components/HeroHeadline.jsx";
import Loading from "../components/Loading.jsx";
import Reveal from "../components/Reveal.jsx";
import ScrollTagline from "../components/ScrollTagline.jsx";
import Starburst from "../components/Starburst.jsx";
import { getErrorMessage } from "../api/client.js";

const HIGHLIGHT_CARDS = [
  {
    title: "Do it yourself",
    body: "File your own application with confidence - no agent fees, no middleman.",
    cta: "See how it works",
    href: "#how-it-works",
    className: "bg-brass text-ink",
    button: "border-ink text-ink",
  },
  {
    title: "Every document",
    body: "Templates, checklists, and calculators built for your route.",
    cta: "Browse destinations",
    href: "#choose-destination",
    className: "bg-petrol text-ink",
    button: "border-ink text-ink",
  },
  {
    title: "Built for your visa",
    body: "Country- and visa-type-specific guidance, not generic advice.",
    cta: "Compare packages",
    href: "#choose-destination",
    className: "bg-ink text-ivory",
    button: "border-ivory text-ivory",
  },
];

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
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24">
          <div className="relative">
            <Starburst className="pointer-events-none absolute -top-4 right-0 h-20 w-20 text-brass sm:h-28 sm:w-28" />

            <HeroHeadline />

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg text-stone">
                Pick your destination and visa type, choose a package that matches how much
                help you want, and get everything from a form walkthrough to a full toolkit
                of templates and checklists - all without an agent filing on your behalf.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wide text-stone"
            >
              <span>8 countries supported</span>
              <span aria-hidden="true">·</span>
              <span>Not a government agency</span>
              <span aria-hidden="true">·</span>
              <span>You file, we guide</span>
            </Reveal>
          </div>

          <div className="relative mt-16 sm:h-[130px] sm:overflow-hidden">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {HIGHLIGHT_CARDS.map((card, index) => (
                <Reveal key={card.title} delay={index * 90} className="rounded-[28px] sm:h-[280px] sm:rounded-t-[28px] sm:rounded-b-none">
                  <div className={`flex h-full flex-col p-7 ${card.className}`}>
                    <h3 className="font-display text-xl font-bold tracking-tight">{card.title}</h3>
                    <p className="mt-2 text-sm opacity-80">{card.body}</p>
                    <a
                      href={card.href}
                      className={`mt-5 inline-block w-fit rounded-full border px-4 py-2 text-xs font-bold ${card.button}`}
                    >
                      {card.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScrollTagline />

      <section id="choose-destination" className="mx-auto max-w-6xl px-4 sm:px-6 pb-28">
        <Reveal as="h2" className="font-display text-3xl font-bold tracking-tight text-ink mb-8">
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
          <Reveal as="h2" className="font-display text-3xl font-bold tracking-tight text-ink mb-10">
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
                className="h-full rounded-[28px] border border-hairline bg-ivory p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-brass">
                  {item.step}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-stone">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
