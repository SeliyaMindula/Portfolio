import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Animates a numeric value counting up from 0 once it scrolls into view.
 * Non-numeric text (e.g. "AWS & Azure") is rendered as-is with no counting.
 */
const CountUp = ({ value, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? "0" + match[2] : value);

  useEffect(() => {
    if (!match || !isInView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
    });

    return () => controls.stop();
  }, [isInView, match, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
