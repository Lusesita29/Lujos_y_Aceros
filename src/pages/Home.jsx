import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/products/ProductGrid';
import Testimonials from '../components/home/Testimonials';
import About from '../components/home/About';
import Contact from '../components/home/Contact';

// categoriaActiva se recibe desde App.jsx porque el Navbar (que vive fuera de esta
// página, para que sea persistente entre rutas) también necesita saber cuál está activa.
export default function Home({ categoriaActiva }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Si llegamos aquí desde otra página con un destino de scroll pendiente
  // (ej. el usuario hizo clic en "Nosotros" estando en la ficha de un producto),
  // esperamos a que el DOM esté listo y bajamos a esa sección.
  useEffect(() => {
    const seccionId = location.state?.scrollTo;
    if (seccionId) {
      const timer = setTimeout(() => {
        if (seccionId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(seccionId)?.scrollIntoView({ behavior: 'smooth' });
        }
        // Limpiamos el state para que un refresh de la página no vuelva a hacer scroll
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <ProductGrid categoriaActiva={categoriaActiva} />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}
