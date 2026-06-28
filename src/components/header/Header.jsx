import React, { useState, useEffect } from "react";
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
    `text-sm font-medium transition-colors relative after:absolute after:-bottom-1.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded after:transition-transform after:scale-x-0 hover:after:scale-x-100 ${
      activeNav === href
        ? "text-brand-light after:scale-x-100 after:bg-brand-light dark:text-slate-100 dark:after:bg-gradient-to-r dark:after:from-indigo-500 dark:after:to-violet-500"
        : "text-zinc-500 hover:text-zinc-800 dark:text-slate-400 dark:hover:text-slate-100 dark:after:from-indigo-500 dark:after:to-violet-500"
    }`;

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 md:top-0 md:bottom-auto bottom-0 top-auto ${
        scrolled
          ? "border-black/10 bg-[#fafafa]/90 shadow-md backdrop-blur-md dark:border-slate-700/50 dark:bg-[#08080f]/90 md:border-b md:border-t-0 border-t"
          : "bg-transparent"
      }`}
    >
      <Container className="relative flex h-14 md:h-[4.5rem] items-center justify-end md:justify-center">
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => handleNavClick(href)} className={linkClass(href)}>
              {label}
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

      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-14 border-t border-black/10 bg-white/95 p-6 backdrop-blur-md dark:border-slate-700/50 dark:bg-[#161622]/95">
          <div className="grid grid-cols-3 gap-4 text-center">
            {NAV_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`flex flex-col items-center gap-1 text-xs ${
                  activeNav === href ? "text-brand-light dark:text-indigo-400" : "text-zinc-600 dark:text-slate-400"
                }`}
              >
                <i className={`uil ${icon} text-lg`} />
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
