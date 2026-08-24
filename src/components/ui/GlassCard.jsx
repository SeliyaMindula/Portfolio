import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { usePointerFine } from "../../hooks/usePointerFine";

/**
 * Glass-surface card (dark mode) / clean card (light mode). Replaces the old
 * static Card component with an optional cursor-follow tilt + glow border.
 */
const GlassCard = ({ children, className = "", tilt = true, glow = true, ...props }) => {
  const ref = useRef(null);
  const isFinePointer = usePointerFine();
  const prefersReducedMotion = useReducedMotion();
  const tiltEnabled = tilt && isFinePointer && !prefersReducedMotion;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);

  const handlePointerMove = (event) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={`group relative rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-black/30 dark:hover:border-indigo-400/40 dark:hover:shadow-glow-sm ${className}`}
      {...props}
    >
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden dark:block"
          style={{
            background: `radial-gradient(180px circle at ${glowX} ${glowY}, rgba(34,211,238,0.18), transparent 70%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
