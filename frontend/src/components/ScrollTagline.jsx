import Reveal from "./Reveal.jsx";

const TAGLINE = "Simplifying travel, one visa at a time.";
const SUPPORTING_COPY =
  "No agents, no guesswork - just the exact documents, checklists, and templates your " +
  "application needs, built for your destination's own rules.";

// A quiet pull-quote band between the hero and the destination grid, using
// the same lightweight fade-and-rise-on-scroll as every other section (see
// <Reveal>) rather than a bespoke scroll-jacked animation.
export default function ScrollTagline() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-28 text-center">
        <Reveal
          as="p"
          className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink text-balance"
        >
          {TAGLINE}
        </Reveal>
        <Reveal as="p" delay={100} className="mt-5 text-base sm:text-lg text-stone max-w-xl mx-auto text-balance">
          {SUPPORTING_COPY}
        </Reveal>
      </div>
    </section>
  );
}
