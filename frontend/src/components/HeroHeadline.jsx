import { motion, useReducedMotion } from "framer-motion";

// The hero's two-line headline gets its own staggered entrance (setup line,
// then the bold payoff line) plus a thin drawn-in underline beneath the
// second line, rather than a single flat block of same-weight text.
export default function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = { duration: 0 };

  return (
    <h1 className="text-5xl sm:text-6xl leading-[1.05] tracking-[-0.03em]">
      <motion.span
        className="block font-semibold text-ink"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? noMotion : { duration: 0.5, ease: "easeOut" }}
      >
        Apply for your visa yourself.
      </motion.span>
      <motion.span
        className="relative mt-1 inline-block font-extrabold text-burgundy"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? noMotion : { duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        We'll guide every step.
        <motion.span
          className="absolute -bottom-1.5 left-0 h-[3px] w-full origin-left bg-burgundy/35 sm:h-1"
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={prefersReducedMotion ? noMotion : { duration: 0.6, ease: "easeOut", delay: 0.55 }}
        />
      </motion.span>
    </h1>
  );
}
