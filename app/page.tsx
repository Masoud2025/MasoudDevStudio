import ConsoleBanner from "../components/ConsoleBanner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Project from "../components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Navbar />
      <Hero/>
      <Project/>
      <Contact/>
      <Footer/>
      <ConsoleBanner />
    </div>
  );
}
