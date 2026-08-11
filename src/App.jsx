import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Contact from './components/home/Contact';
import ProductGrid from './components/products/ProductGrid';
import CartDrawer from './components/cart/CartDrawer';
import './index.css';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  return (
    <CartProvider>
      <Navbar categoriaActiva={categoriaActiva} onSeleccionarCategoria={setCategoriaActiva} />
      <div style={{ height: 64 }} /> {/* espaciador del navbar fijo */}

      <Hero />
      <ProductGrid categoriaActiva={categoriaActiva} />
      <About />
      <Contact />

      <CartDrawer />
      <WhatsAppButton />
      <Footer />
    </CartProvider>
  );
}

export default App;
