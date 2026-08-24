import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "../../data/portfolio";
import { Container } from "../ui/Section";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);

      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY + 120;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
          setActiveNav(`#${id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveNav(href);
    setMenuOpen(false);
  };

  const linkClass = (href) =>
    `relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
      activeNav === href
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-100"
    }`;

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 md:top-0 md:bottom-auto bottom-0 top-auto ${
        scrolled
          ? "border-black/10 bg-[#fafafa]/90 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-ink-900/95 dark:shadow-lg dark:shadow-black/40 md:border-b md:border-t-0 border-t"
          : "bg-transparent"
      }`}
    >
      <Container className="relative flex h-14 md:h-[4.5rem] items-center justify-end md:justify-center">
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-transparent px-2 py-1.5 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => handleNavClick(href)} className={linkClass(href)}>
              {activeNav === href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-indigo-600/10 border border-indigo-400/30 dark:bg-white/10 dark:border-indigo-400/40 dark:shadow-glow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={activeNav === href ? "dark:font-semibold relative z-10" : "relative z-10"}>
                {label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:absolute md:right-0">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden text-xl text-zinc-800 dark:text-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`uil ${menuOpen ? "uil-times" : "uil-apps"}`} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 bottom-14 border-t border-black/10 bg-white/95 p-6 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/95"
          >
            <motion.div
              className="grid grid-cols-3 gap-4 text-center"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {NAV_LINKS.map(({ href, label, icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => handleNavClick(href)}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className={`flex flex-col items-center gap-1 text-xs ${
                    activeNav === href ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-600 dark:text-slate-400"
                  }`}
                >
                  <i className={`uil ${icon} text-lg`} />
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
