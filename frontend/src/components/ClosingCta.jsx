import Reveal from "./Reveal.jsx";

// The page's closing call-to-action - replaces an SVG bezier "flight path"
// with planes looping along it. That kind of literal, decorative animation
// is exactly what makes a page read as generated rather than designed; a
// confident headline and one clear button do the actual job.
export default function ClosingCta() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 text-center">
        <Reveal
          as="span"
          className="stamp inline-flex h-16 w-16 flex-col items-center justify-center text-ink"
          style={{ "--stamp-rotate": "-4deg" }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-widest">Ready</span>
          <span className="text-[9px] font-semibold uppercase tracking-widest">to file</span>
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="font-display mt-6 text-3xl sm:text-5xl font-semibold tracking-tight text-ink"
        >
          Start your visa process today
        </Reveal>
        <Reveal as="p" delay={140} className="mt-3 text-stone max-w-md mx-auto">
          Every destination, one clear path from checklist to boarding pass.
        </Reveal>

        <Reveal delay={200}>
          <a
            href="#choose-destination"
            className="mt-8 inline-block bg-ink px-7 py-3.5 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-brass hover:scale-[1.02] hover:shadow-lg"
          >
            Choose a destination
          </a>
        </Reveal>
      </div>
    </section>
  );
}
