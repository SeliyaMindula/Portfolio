import { useEffect, useState } from "react";

/**
 * True when the device has a precise pointer (mouse/trackpad), false for
 * touch-only devices. Used to gate pointer-follow effects (magnetic buttons,
 * tilt cards, custom cursor) that don't make sense on touch.
 */
export function usePointerFine() {
  const [isFine, setIsFine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const handleChange = (event) => setIsFine(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return isFine;
}
