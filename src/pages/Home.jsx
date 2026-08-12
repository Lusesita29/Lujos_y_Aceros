import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import ProductGrid from "../components/products/ProductGrid";
import Features from "../components/home/Features";
import Gallery from "../components/home/Gallery";
import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import Contact from "../components/home/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <ProductGrid categoriaActiva="todos" />
      <Features />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}