import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import './index.css';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar categoriaActiva={categoriaActiva} onSeleccionarCategoria={setCategoriaActiva} />
        <div style={{ height: 64 }} /> {/* espaciador del navbar fijo */}

        <Routes>
          <Route path="/" element={<Home categoriaActiva={categoriaActiva} />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>

        <CartDrawer />
        <WhatsAppButton />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
