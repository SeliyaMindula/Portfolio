import React from "react";
import "./home.css";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home__bg">
        <div className="home__blob home__blob--1"></div>
        <div className="home__blob home__blob--2"></div>
        <div className="home__blob home__blob--3"></div>
      </div>

      <div className="home__container container grid">
        <div className="home__content grid">
          <div className="home-load home-load--1">
            <Social />
          </div>

          <div className="home__img-wrapper home-load home-load--2">
            <div className="home__img"></div>
          </div>

          <Data />
        </div>

        <div className="home-load home-load--5">
          <ScrollDown />
        </div>
      </div>
    </section>
  );
};

export default Home;
