import React, { useEffect, useState } from "react";

const ScrollUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= 560);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed right-6 z-40 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-300 bg-zinc-800 hover:bg-black dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:hover:-translate-y-1 dark:hover:shadow-lg dark:hover:shadow-indigo-500/30 ${
        visible ? "bottom-20 md:bottom-8 opacity-90" : "-bottom-10 opacity-0"
      }`}
    >
      <i className="uil uil-arrow-up text-xl" />
    </button>
  );
};

export default ScrollUp;
