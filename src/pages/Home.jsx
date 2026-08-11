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
import WhatsAppButton from "../components/layout/WhatsAppButton";
import { productos } from "../data/products";

export default function Home() {
  const destacados = products.filter((p) => p.destacado).slice(0, 4);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />

      <section id="productos" className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          PRODUCTOS DESTACADOS
        </h2>
        <ProductGrid products={destacados} />
        <div className="text-center mt-8">
          <a
            href="/productos"
            className="inline-block border border-gray-800 px-6 py-2 rounded-full hover:bg-gray-800 hover:text-white transition"
          >
            VER TODO
          </a>
        </div>
      </section>

      <><Features /><Gallery /><About /><Testimonials /><Contact /><Footer /><WhatsAppButton /></>
    </>
  );
}