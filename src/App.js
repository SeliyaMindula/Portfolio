import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/common/CustomCursor";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Qualification from "./components/qualification/Qualification";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Header />
      <main className="pb-14 md:pb-0">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Qualification />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
