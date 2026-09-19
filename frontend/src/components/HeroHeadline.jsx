import { motion, useReducedMotion } from "framer-motion";

// One big, bold, single-weight headline - no serif/italic mixing, no soft
// ambient glow. The reference design's whole personality comes from scale
// and confidence, not decoration, so the entrance is just a quick
// slide-up-and-settle.
export default function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.h1
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-[-0.02em] text-ink"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
    >
      Apply for your visa yourself.
    </motion.h1>
  );
}
