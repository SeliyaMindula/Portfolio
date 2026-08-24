import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePointerFine } from "../../hooks/usePointerFine";

const variants = {
  primary:
    "bg-accent-gradient text-white hover:shadow-md hover:shadow-indigo-500/25 dark:hover:shadow-glow",
  ghost:
    "bg-transparent border border-zinc-300 text-zinc-800 hover:border-indigo-600 dark:border-indigo-400/40 dark:text-slate-100 dark:hover:border-indigo-400 dark:hover:shadow-glow-sm",
};

const MAX_PULL = 10;

/**
 * Button/link with a magnetic cursor-follow pull on fine-pointer devices.
 * Replaces the old static Button component; same public API.
 */
const MagneticButton = ({
  variant = "primary",
  href,
  download,
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const ref = useRef(null);
  const isFinePointer = usePointerFine();
  const prefersReducedMotion = useReducedMotion();
  const magneticEnabled = isFinePointer && !prefersReducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  const handlePointerMove = (event) => {
    if (!magneticEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    rawX.set((relX / (rect.width / 2)) * MAX_PULL);
    rawY.set((relY / (rect.height / 2)) * MAX_PULL);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const classes = `relative inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-semibold transition-colors duration-300 ${variants[variant]} ${className}`;

  const sharedProps = {
    ref,
    style: { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    whileTap: { scale: 0.96 },
    className: classes,
    ...props,
  };

  if (href) {
    return (
      <motion.a href={href} download={download} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      {children}
    </motion.button>
  );
};

export default MagneticButton;
