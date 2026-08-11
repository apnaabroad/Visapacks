import { motion, useReducedMotion } from "framer-motion";

import Flag from "./Flag.jsx";

// The 8 launch countries (see backend/prisma/seed.js) - purely decorative,
// not data-driven, so a static list is fine and keeps the hero from waiting
// on an API round-trip.
const CODES = ["US", "UK", "CA", "SCHENGEN", "AU", "AE", "DE", "NZ"];

const RADIUS = 150; // px from center to each badge
const REVOLUTION_SECONDS = 46; // one full lap - slow and steady, not distracting

// Each badge sits at a fixed angle around the ring via a static CSS
// transform (rotate -> push out by RADIUS -> rotate back so the badge itself
// isn't tilted). The ring wrapping all of them animates `rotate` to sweep
// them around the circle, and each badge counter-rotates at the same speed
// to cancel that spin back out - the classic technique for "things orbit,
// nothing tumbles".
export default function OrbitingFlags() {
  const prefersReducedMotion = useReducedMotion();
  const angleStep = 360 / CODES.length;

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[360px]"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-hairline" aria-hidden="true" />

      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={prefersReducedMotion ? undefined : { duration: REVOLUTION_SECONDS, repeat: Infinity, ease: "linear" }}
      >
        {CODES.map((code, i) => {
          const angle = i * angleStep;
          return (
            <div
              key={code}
              className="absolute left-1/2 top-1/2 h-10 w-10"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${RADIUS}px) rotate(${-angle}deg)`,
              }}
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-ivory shadow-card"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: REVOLUTION_SECONDS, repeat: Infinity, ease: "linear" }
                }
              >
                <Flag code={code} className="text-lg" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
