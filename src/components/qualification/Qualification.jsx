import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification__section" id="qualifications">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        {/* ====== Tabs ====== */}
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>{" "}
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        {/* ====== Content ====== */}
        <div className="qualification__sections">
          {/* ====== Education & Experience Combined ====== */}
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {/* Internship (Left) */}
            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">
                  Bluechip Technologies Asia (Pvt) Ltd
                </h3>
                <span className="qualification__subtitle">
                  React web developer - Internship
                </span>
                <div className="qualification__calender">
                  <i className="uli uli-calender-alt"></i>
                  Jul 2021 - Jan 2022
                </div>
              </div>
            </div>

            {/* SLIIT (Right) */}
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Sri Lanka Institute of Information Technology
                </h3>
                <span className="qualification__subtitle">
                  BSc. Special (Hons) – Information Technology
                </span>
                <div className="qualification__calender">
                  <i className="uli uli-calender-alt"></i>
                  2019 - 2023
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            {/* Yara Technologies (Left) */}
            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">
                  Yara Technologies (Pvt) Ltd
                </h3>
                <span className="qualification__subtitle">
                  Associate software engineer
                </span>
                <div className="qualification__calender">
                  <i className="uli uli-calender-alt"></i>
                  Oct 2022 - Oct 2023
                </div>
              </div>
            </div>

 <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">
                  EquityMatch.co (Pvt) Ltd
                </h3>
                <span className="qualification__subtitle">
                  Associate software engineer
                </span>
                <div className="qualification__calender">
                  <i className="uli uli-calender-alt"></i>
                  Jun 2024 - Jun 2025
                </div>
                <br />
                <span className="qualification__subtitle">
                  Software engineer
                </span>
                <div className="qualification__calender">
                  <i className="uli uli-calender-alt"></i>
                  Jun 2025 - present
                </div>
              </div>
            </div>
          </div>

          {/* ====== Second Tab (Experience) ====== */}
          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {/* You can add only work experience here if needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
