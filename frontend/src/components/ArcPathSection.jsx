import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import Flag from "./Flag.jsx";

// A shallow quadratic bezier (P0 60,150 -> P1 400,20 -> P2 740,150) sampled
// by hand so the flag badges and the plane's flight keyframes both sit
// exactly on the same curve without any runtime SVG path measurement.
const ARC_PATH_D = "M60,150 Q400,20 740,150";

const FLAG_POINTS = [
  { code: "US", x: 60, y: 150 },
  { code: "CA", x: 230, y: 101.3 },
  { code: "DE", x: 400, y: 85 },
  { code: "AU", x: 570, y: 101.3 },
  { code: "NZ", x: 740, y: 150 },
];

const PLANE_X = [60, 145, 230, 315, 400, 485, 570, 655, 740];
const PLANE_Y = [150, 121.6, 101.3, 89.1, 85, 89.1, 101.3, 121.6, 150];
const PLANE_ROTATE = [-25, -15, -8, -3, 0, 3, 8, 15, 25];

function Plane({ delay = 0, duration = 7, className = "", scale = 1, active }) {
  return (
    <motion.g
      className={className}
      animate={active ? { x: PLANE_X, y: PLANE_Y, rotate: PLANE_ROTATE } : undefined}
      initial={{ x: PLANE_X[0], y: PLANE_Y[0], rotate: PLANE_ROTATE[0] }}
      transition={
        active
          ? { duration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay }
          : undefined
      }
    >
      <path
        d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,13.5V19L7.5,20.5V22L11.5,21L15.5,22V20.5L13,19V13.5L21,16Z"
        transform={`translate(-11,-12) scale(${scale})`}
        fill="var(--color-burgundy)"
      />
    </motion.g>
  );
}

export default function ArcPathSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const planesActive = isInView && !prefersReducedMotion;

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <section ref={sectionRef} className="border-t border-hairline bg-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <motion.div
          className="mx-auto max-w-xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block rounded-full bg-burgundy/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-burgundy"
          >
            Plan Ahead
          </motion.span>
          <motion.h2 variants={itemVariants} className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Start your visa process today
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-warm-gray">
            Every destination, one clear path from checklist to boarding pass.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="#choose-destination"
            className="mt-8 inline-block bg-ink px-6 py-3 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-burgundy hover:scale-[1.02] hover:shadow-lg"
          >
            Start your visa process today
          </motion.a>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-3xl" style={{ aspectRatio: "800 / 200" }}>
          <svg viewBox="0 0 800 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <motion.path
              d={ARC_PATH_D}
              fill="none"
              stroke="var(--color-hairline)"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.4, ease: "easeInOut" }}
            />
            <Plane active={planesActive} duration={7} scale={0.85} />
            <Plane
              active={planesActive}
              duration={9}
              delay={2.4}
              scale={0.55}
              className="hidden opacity-50 sm:block"
            />
          </svg>

          {FLAG_POINTS.map((point, i) => (
            <motion.div
              key={point.code}
              className="absolute flex h-9 w-9 sm:h-11 sm:w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-ivory shadow-card"
              style={{ left: `${(point.x / 800) * 100}%`, top: `${(point.y / 200) * 100}%` }}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }
              }
            >
              <Flag code={point.code} className="text-base sm:text-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
