import { motion, useReducedMotion } from "framer-motion";

// The hero's two-line headline: a quiet ink setup line, then a large
// extrabold brass payoff line carrying a soft ambient glow and a short
// drawn-in editorial rule - a magazine-headline accent rather than a plain
// underline. Entrance blurs/slides in as two staggered beats.
export default function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = { duration: 0 };

  return (
    <h1 className="relative font-display text-6xl sm:text-7xl leading-[1.05] tracking-[-0.015em]">
      <motion.span
        className="block font-normal text-ink/90"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={prefersReducedMotion ? noMotion : { duration: 0.6, ease: "easeOut" }}
      >
        Apply for your visa yourself.
      </motion.span>

      <motion.span
        className="relative mt-1 block font-semibold italic text-brass"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={prefersReducedMotion ? noMotion : { duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/10 blur-3xl sm:h-56 sm:w-96 md:left-1/3 md:w-[36rem]"
          aria-hidden="true"
        />
        <motion.span
          className="mx-auto mb-3 block h-[3px] w-14 bg-brass sm:w-20 md:mx-0"
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          transition={prefersReducedMotion ? noMotion : { duration: 0.5, ease: "easeOut", delay: 0.15 }}
        />
        We'll guide every step.
      </motion.span>
    </h1>
  );
}
