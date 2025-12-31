import ConsoleBanner from "../components/ConsoleBanner";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Navbar />
      <ConsoleBanner />
    </div>
  );
}
