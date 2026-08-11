import { motion, useReducedMotion } from "framer-motion";

import Flag from "./Flag.jsx";

// The 8 launch countries (see backend/prisma/seed.js) - this is a purely
// decorative badge scatter around the hero headline, not data-driven, so a
// static list is fine and keeps the hero from waiting on an API round-trip.
const CODES = ["US", "UK", "CA", "SCHENGEN", "AU", "AE", "DE", "NZ"];

// Hand-placed scatter positions (percent of the hero container) - loose and
// asymmetric on purpose, not a grid, so it reads as "orbiting" rather than
// laid out. Kept clear of the centered headline column.
const POSITIONS = [
  { top: "8%", left: "9%", size: 44 },
  { top: "18%", left: "85%", size: 36 },
  { top: "46%", left: "5%", size: 38 },
  { top: "60%", left: "88%", size: 44 },
  { top: "5%", left: "46%", size: 32 },
  { top: "78%", left: "20%", size: 36 },
  { top: "74%", left: "72%", size: 32 },
  { top: "36%", left: "90%", size: 28 },
];

export default function OrbitingFlags() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {CODES.map((code, i) => {
        const pos = POSITIONS[i];
        return (
          <motion.div
            key={code}
            className="absolute"
            style={{ top: pos.top, left: pos.left }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }
            }
          >
            <motion.div
              className="flex items-center justify-center rounded-full border border-hairline bg-ivory shadow-card"
              style={{ width: pos.size, height: pos.size }}
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 3 + (i % 4) * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.35,
                    }
              }
            >
              <Flag code={code} className="text-lg" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
