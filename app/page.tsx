import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import FeaturedListings from "./_components/FeaturedListings";
import Agents from "./_components/Agents";
import Testimonials from "./_components/Testimonials";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedListings />
        <Agents />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
