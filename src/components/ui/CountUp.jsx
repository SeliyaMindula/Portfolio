import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Animates a numeric prefix counting up from 0 once it scrolls into view.
 * Non-numeric text (e.g. "AWS & Azure") is rendered as-is with no counting.
 */
const CountUp = ({ value, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const { target, suffix, hasNumber } = useMemo(() => {
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) {
      return { target: null, suffix: "", hasNumber: false };
    }
    return {
      target: parseInt(match[1], 10),
      suffix: match[2],
      hasNumber: true,
    };
  }, [value]);

  const [display, setDisplay] = useState(() =>
    hasNumber ? `0${suffix}` : value
  );

  useEffect(() => {
    if (!hasNumber) {
      setDisplay(value);
      return;
    }

    if (prefersReducedMotion || !isInView) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
    });

    return () => controls.stop();
  }, [hasNumber, isInView, prefersReducedMotion, suffix, target, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
