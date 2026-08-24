import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
};

/**
 * Scroll-triggered entrance animation. Replaces the old CSS-transition
 * AnimatedSection/useInView pair with a Framer Motion whileInView reveal.
 */
const SectionReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as = "div",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, ...offsets[direction] };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};

export default SectionReveal;
