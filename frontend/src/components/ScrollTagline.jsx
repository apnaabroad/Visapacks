import Reveal from "./Reveal.jsx";

const TAGLINE = "Simplifying travel, one visa at a time.";
const SUPPORTING_COPY =
  "No agents, no guesswork - just the exact documents, checklists, and templates your " +
  "application needs, built for your destination's own rules.";

// A quiet, editorial pull-quote band between the hero and the destination
// grid. Replaces an earlier scroll-jacked, plane-crossing-a-dashed-line
// animation - this uses the same lightweight fade-and-rise-on-scroll as
// every other section on the page (see <Reveal>), so it's consistent with
// the rest of the site instead of being its own special effect.
export default function ScrollTagline() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-32 text-center">
        <Reveal className="mx-auto h-px w-12 bg-burgundy" />
        <Reveal
          as="p"
          delay={80}
          className="mt-8 text-3xl sm:text-5xl font-bold tracking-tight text-ink text-balance"
        >
          {TAGLINE}
        </Reveal>
        <Reveal
          as="p"
          delay={160}
          className="mt-6 text-base sm:text-lg text-warm-gray max-w-xl mx-auto text-balance"
        >
          {SUPPORTING_COPY}
        </Reveal>
      </div>
    </section>
  );
}
