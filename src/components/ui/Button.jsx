import React from "react";

const variants = {
  primary:
    "bg-zinc-800 text-white hover:bg-black shadow-none hover:shadow-md dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:hover:-translate-y-0.5 dark:hover:shadow-lg dark:hover:shadow-indigo-500/30",
  ghost:
    "bg-transparent border border-zinc-300 text-zinc-800 hover:border-zinc-800 dark:border-indigo-500/40 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:shadow-indigo-500/20",
};

const Button = ({
  variant = "primary",
  href,
  download,
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const classes = `inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} download={download} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
