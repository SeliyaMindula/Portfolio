import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__title container">
        {/* <h1 className="footer__title">Seliya</h1> */}
        <br></br>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#qualifications" className="footer__link">
              Qualifications
            </a>
          </li>

          <li>
            <a href="#skills" className="footer__link">
              Skills
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/seliya-kumanayaka-9610911b9/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://github.com/SeliyaMindula"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>

          <a
            href="mailto:Seliyakumanayaka18@gmail.com"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bx-mail-send"></i>
          </a>
        </div>
        <span className="footer__copy">
          &#169; {new Date().getFullYear()} Seliya Kumanayaka. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
