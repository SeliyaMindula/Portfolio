import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: (staggerDelay) => ({
    transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
  }),
};

/**
 * Orchestrates a staggered entrance for a group of StaggerItem children,
 * triggered once when the group scrolls into view.
 */
export const StaggerGroup = ({ children, className = "", staggerDelay = 0.12 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={containerVariants}
    custom={staggerDelay}
  >
    {children}
  </motion.div>
);

const itemOffsets = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -28 },
  right: { x: 28 },
};

export const StaggerItem = ({ children, className = "", direction = "up" }) => {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? {} : itemOffsets[direction];

  const itemVariants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
