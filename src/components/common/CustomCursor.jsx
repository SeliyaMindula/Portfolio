import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePointerFine } from "../../hooks/usePointerFine";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";

/**
 * Glowing dot + trailing ring that follows the pointer and scales up over
 * interactive elements. Mounted only on fine-pointer devices with no
 * reduced-motion preference; otherwise renders nothing and the native
 * cursor stays visible.
 */
const CustomCursor = () => {
  const isFinePointer = usePointerFine();
  const prefersReducedMotion = useReducedMotion();
  const enabled = isFinePointer && !prefersReducedMotion;

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 22 });
  const ringY = useSpring(y, { stiffness: 200, damping: 22 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-none-fine");

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };

    const handleOver = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) setIsHovering(true);
    };

    const handleOut = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) setIsHovering(false);
    };

    const handleLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    window.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      document.body.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-indigo-400"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-indigo-400/60"
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isVisible ? (isHovering ? 0.9 : 0.5) : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};

export default CustomCursor;
