import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const floatProps = (duration, delay = 0) => ({
  animate: { y: [0, -16, 0], rotate: [0, 10, 0] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
});

/**
 * Decorative geometric shapes (ring, dot, square) that float slowly in a
 * section's background. Two position variants keep alternating sections
 * from looking repetitive. Hidden for reduced-motion visitors.
 */
const FloatingShapes = ({ flip = false }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        {...floatProps(9)}
        className={`absolute h-16 w-16 rounded-full border-2 border-indigo-500/15 dark:border-indigo-400/20 ${
          flip ? "right-[8%] top-16" : "left-[6%] top-20"
        }`}
      />
      <motion.span
        {...floatProps(7, 1.2)}
        className={`absolute h-3 w-3 rounded-full bg-indigo-500/25 dark:bg-indigo-400/30 ${
          flip ? "left-[10%] bottom-24" : "right-[12%] top-1/3"
        }`}
      />
      <motion.span
        {...floatProps(11, 0.6)}
        className={`absolute h-10 w-10 rotate-12 rounded-lg border-2 border-violet-500/15 dark:border-violet-400/20 ${
          flip ? "left-[15%] top-28" : "right-[7%] bottom-20"
        }`}
      />
      <motion.span
        {...floatProps(8, 2)}
        className={`absolute h-2 w-2 rounded-full bg-violet-500/25 dark:bg-violet-400/30 ${
          flip ? "right-[20%] bottom-16" : "left-[18%] bottom-28"
        }`}
      />
    </div>
  );
};

export default FloatingShapes;
