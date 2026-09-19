import Reveal from "./Reveal.jsx";
import Starburst from "./Starburst.jsx";

// The page's closing call-to-action - one bold headline, one pill button,
// the starburst mark for punctuation. No illustration, no animated path -
// the same restraint the rest of the page uses.
export default function ClosingCta() {
  return (
    <section className="border-t border-hairline bg-ink text-ivory">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-28 text-center overflow-hidden">
        <Starburst className="pointer-events-none absolute -top-6 right-4 h-28 w-28 text-brass/70 sm:right-10" />

        <Reveal
          as="h2"
          className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-ivory"
        >
          Start your visa
          <br />
          process today
        </Reveal>
        <Reveal as="p" delay={80} className="mt-4 text-ivory/60 max-w-md mx-auto">
          Every destination, one clear path from checklist to boarding pass.
        </Reveal>

        <Reveal delay={140}>
          <a
            href="#choose-destination"
            className="mt-9 inline-block rounded-full bg-brass px-8 py-4 text-sm font-bold text-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            Choose a destination
          </a>
        </Reveal>
      </div>
    </section>
  );
}
