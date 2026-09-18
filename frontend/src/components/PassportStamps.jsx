import { motion, useReducedMotion } from "framer-motion";

import Flag from "./Flag.jsx";

// A loose cluster of ink-stamp badges, like a well-traveled passport page -
// replaces a carousel of flags spinning in a perfect circle (which reads as
// a stock "AI built this" flourish) with something that actually looks
// hand-stamped: irregular positions, irregular rotation, no two alike.
// Entrance is a one-time staggered fade/settle, not a continuous loop -
// once it's landed, it just sits there, the way a real stamp would.
const STAMPS = [
  { code: "US", label: "US", top: "1%", left: "2%", size: 72, rotate: -8, ring: "ink" },
  { code: "UK", label: "UK", top: "0%", left: "42%", size: 58, rotate: 9, ring: "petrol" },
  { code: "CA", label: "CA", top: "8%", left: "76%", size: 66, rotate: -5, ring: "brass" },
  { code: "SCHENGEN", label: "EU", top: "36%", left: "0%", size: 58, rotate: 12, ring: "petrol" },
  { code: "DE", label: "DE", top: "28%", left: "33%", size: 100, rotate: -3, ring: "brass" },
  { code: "AU", label: "AU", top: "42%", left: "76%", size: 68, rotate: 6, ring: "ink" },
  { code: "AE", label: "AE", top: "68%", left: "8%", size: 64, rotate: -11, ring: "brass" },
  { code: "NZ", label: "NZ", top: "70%", left: "56%", size: 74, rotate: 8, ring: "petrol" },
];

const RING_CLASSES = {
  ink: "text-ink",
  petrol: "text-petrol",
  brass: "text-brass",
};

export default function PassportStamps() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      {STAMPS.map((stamp, i) => (
        <motion.div
          key={stamp.code}
          className={`stamp absolute flex flex-col items-center justify-center gap-0.5 bg-ivory/90 shadow-card ${RING_CLASSES[stamp.ring]}`}
          style={{
            top: stamp.top,
            left: stamp.left,
            width: stamp.size,
            height: stamp.size,
            "--stamp-rotate": `${stamp.rotate}deg`,
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6, rotate: stamp.rotate - 20 }}
          animate={{ opacity: 1, scale: 1, rotate: stamp.rotate }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.5, delay: 0.15 + i * 0.09, ease: "easeOut" }
          }
        >
          <Flag code={stamp.code} className="text-xl" />
          <span className="text-[9px] font-semibold uppercase tracking-widest">{stamp.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
