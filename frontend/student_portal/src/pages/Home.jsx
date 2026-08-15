import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />

        <div id="features" className="scroll-mt-24">
          <Features />
        </div>

        <div id="about" className="scroll-mt-24">
          <About />
        </div>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default Home;