// import BackToTopTopBar from "../components/BackToTopTopBar";
import AboutMe from "../components/AboutMe";
import FunCursor from "../components/catMouse";
import ConsoleBanner from "../components/ConsoleBanner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import PortfolioExtras from "../components/PortfolioExtras";
import Project from "../components/Projects";
import ScrollingGrid from "../components/ProjectSlider";

import ScrollProgressBar from "../components/ScrollToTopWithProgress";
import Skills from "../components/Skills";
import FeaturedProjects from "../components/SpecialProject";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen   ">
      <Navbar />
      <Hero />
      {/* <FunCursor/> */}
      <ScrollingGrid/>
      <Project />
      <AboutMe/>
      <Skills/>
      <FeaturedProjects/>
      <PortfolioExtras/>
      <Contact />
      <Footer />
      <ConsoleBanner />
      <ScrollProgressBar />
      {/* <ScrollProgressBar /> */}
      {/* <BackToTopTopBar /> */}
    </div>
  );
}
