import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`relative rounded-xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/50 dark:bg-[#161622] dark:hover:border-indigo-500/40 dark:hover:shadow-black/30 ${className}`}
  >
    {children}
  </div>
);

export default Card;
