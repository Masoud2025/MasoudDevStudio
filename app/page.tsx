import ContactMe from "../components/ContacMe";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <Navbar/>
      <Hero />
      <Projects/>
      <ContactMe/>
      <Footer/>
    </div>
  );
}
