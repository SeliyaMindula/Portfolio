import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Layered gradient-mesh blobs that drift continuously and parallax slightly
 * on scroll. Dark-mode only (light mode stays flat, per the design spec).
 * Renders fewer blobs on small screens for performance.
 */
const AnimatedBackground = ({ className = "" }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -90]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden overflow-hidden dark:block ${className}`}
    >
      <motion.div
        style={{ y: parallaxSlow }}
        className={`absolute -right-20 -top-20 h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-[90px] ${
          prefersReducedMotion ? "" : "animate-drift"
        }`}
      />
      <motion.div
        style={{ y: parallaxFast }}
        className={`absolute -left-16 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/12 blur-[90px] ${
          prefersReducedMotion ? "" : "animate-drift-slow"
        }`}
      />
      <motion.div
        style={{ y: parallaxSlow }}
        className={`hidden md:block absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-indigo-400/10 blur-[80px] ${
          prefersReducedMotion ? "" : "animate-drift"
        }`}
      />
      <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
    </div>
  );
};

export default AnimatedBackground;
