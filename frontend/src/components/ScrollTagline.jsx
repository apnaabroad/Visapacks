import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TAGLINE = "Simplifying travel, one visa at a time.";

// Plain clamped linear interpolation, used via useTransform's
// value => number function-transformer overload rather than its
// array-range overload. Framer Motion opts array-range transforms into a
// native scroll-timeline "acceleration" fast path, which - at least in the
// installed version - mishandles several sibling elements each reading a
// different sub-range off one shared scroll value inside a `position:
// sticky` container (each word held its peak briefly, then eased back
// toward 0 as if the range had no clamp). The function form always runs on
// the main thread and isn't eligible for that fast path, which is a
// perfectly cheap trade-off for a handful of word spans.
function clampedInterpolate(value, [inMin, inMax], [outMin, outMax]) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

function FlightIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,13.5V19L7.5,20.5V22L11.5,21L15.5,22V20.5L13,19V13.5L21,16Z" />
    </svg>
  );
}

// A single word of the tagline, fading and sliding in as the shared scroll
// progress value crosses this word's slice of the range - the "progressive
// reveal synced to scroll" the design calls for, without a separate
// IntersectionObserver per word.
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, (p) => clampedInterpolate(p, range, [0, 1]));
  const y = useTransform(progress, (p) => clampedInterpolate(p, range, [18, 0]));
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
      &nbsp;
    </motion.span>
  );
}

function AnimatedTagline({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Plane crosses the section from left to right, fading in/out at the very
  // ends so it never appears to clip mid-flight.
  const planeLeft = useTransform(scrollYProgress, [0, 1], ["-8%", "104%"]);
  const planeOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const planeY = useTransform(scrollYProgress, [0, 0.5, 1], [10, -18, 10]);
  const planeRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 6, -4]);

  const words = TAGLINE.split(" ");
  const wordCount = words.length;

  return (
    <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="relative w-full max-w-4xl">
        <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-hairline" aria-hidden="true" />
        <motion.div
          className="absolute top-1/2"
          style={{ left: planeLeft, y: planeY, opacity: planeOpacity, rotate: planeRotate }}
        >
          <FlightIcon className="h-7 w-7 -translate-y-1/2 text-burgundy" />
        </motion.div>

        <p className="relative text-center text-3xl sm:text-5xl font-bold tracking-tight text-ink">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[
                (i / wordCount) * 0.6,
                (i / wordCount) * 0.6 + 0.9 / wordCount,
              ]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </div>
  );
}

function StaticTagline() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-28">
      <FlightIcon className="h-7 w-7 text-burgundy mb-6" />
      <p className="text-center text-3xl sm:text-5xl font-bold tracking-tight text-ink max-w-4xl">{TAGLINE}</p>
    </div>
  );
}

export default function ScrollTagline() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Reduced motion: skip the scroll-jacked pin entirely and just show the
  // finished state in normal document flow - there's no animated payoff
  // worth making someone scroll through a tall pinned section for.
  if (prefersReducedMotion) {
    return <StaticTagline />;
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <AnimatedTagline sectionRef={sectionRef} />
    </section>
  );
}
