import React, { useState, useEffect } from "react";
import "./header.css";
import ThemeToggle from "./ThemeToggle";
import LogoLight from "../../assets/logo.png";
import LogoDark from "../../assets/logo-dark.png";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const [toggle, showMenu] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);

      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY + 120;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveNav(`#${sectionId}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    showMenu(false);
  };

  return (
    <header className={`header ${scrolled ? "scroll-header" : ""}`}>
      <nav className="nav container">
        <a href="#home" className="nav__logo" onClick={() => handleNavClick("#home")}>
          <img
            src={theme === "dark" ? LogoDark : LogoLight}
            alt="Seliya Kumanayaka"
            className="nav__logo-img"
          />
        </a>

        <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                onClick={() => handleNavClick("#home")}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-estate nav__icon"></i> Home
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#about"
                onClick={() => handleNavClick("#about")}
                className={
                  activeNav === "#about" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-user nav__icon"></i>About
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#skills"
                onClick={() => handleNavClick("#skills")}
                className={
                  activeNav === "#skills" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-file-alt nav__icon"></i>Skills
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#qualifications"
                onClick={() => handleNavClick("#qualifications")}
                className={
                  activeNav === "#qualifications"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                <i className="uil uil-scenery nav__icon"></i>Qualifications
              </a>
            </li>

            <li className="nav__item">
              <a
                href="#contact"
                onClick={() => handleNavClick("#contact")}
                className={
                  activeNav === "#contact" ? "nav__link active-link" : "nav__link"
                }
              >
                <i className="uil uil-message nav__icon"></i>Contact
              </a>
            </li>
          </ul>

          <i
            className="uil uil-times nav__close"
            onClick={() => showMenu(false)}
          ></i>
        </div>

        <div className="nav__actions">
          <ThemeToggle />

          <div className="nav__toggle" onClick={() => showMenu(!toggle)}>
            <i className="uil uil-apps"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
