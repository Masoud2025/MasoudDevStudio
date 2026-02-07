// import BackToTopTopBar from "../components/BackToTopTopBar";
import ConsoleBanner from "../components/ConsoleBanner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Project from "../components/Projects";

import ScrollProgressBar from "../components/ScrollToTopWithProgress";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen   ">
      <Navbar />
      <Hero />
      <Project />
      <Contact />
      <Footer />
      <ConsoleBanner />
      <ScrollProgressBar />
      {/* <ScrollProgressBar /> */}
      {/* <BackToTopTopBar /> */}
    </div>
  );
}
