import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Splits text into words and reveals them with a staggered rise-and-fade.
 * Used sparingly for hero name/tagline and section headings.
 *
 * `wordClassName` is applied to each individual word span rather than the
 * outer wrapper. This matters for effects like gradient-clipped text
 * (`bg-clip-text` + `text-transparent`): those CSS properties don't
 * inherit from a parent with no direct text, so they must be applied to
 * the elements that actually contain the visible glyphs.
 */
const RevealText = ({
  text,
  className = "",
  wordClassName = "",
  as: Component = "span",
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className={`inline-block ${wordClassName}`}>
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      viewport={once ? { once: true } : undefined}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className={`inline-block overflow-visible will-change-transform ${wordClassName}`}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default RevealText;
