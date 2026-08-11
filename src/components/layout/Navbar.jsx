import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { categorias } from '../../data/products';

const mobileNavLink = {
  display: 'block',
  padding: '13px 20px',
  fontSize: 14, fontWeight: 700,
  color: '#fff',
  textDecoration: 'none',
  letterSpacing: '0.05em', textTransform: 'uppercase',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

export default function Navbar({ categoriaActiva, onSeleccionarCategoria }) {
  const { totalProductos, setCarritoAbierto } = useCart();
  const [categoriaDropdown, setCategoriaDropdown] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [menuCatMovilAbierto, setMenuCatMovilAbierto] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setCategoriaDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuMovilAbierto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuMovilAbierto]);

  const seleccionar = (catId) => {
    onSeleccionarCategoria(catId);
    setCategoriaDropdown(false);
    setMenuMovilAbierto(false);
    setMenuCatMovilAbierto(false);
    setTimeout(() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#000',
      borderBottom: '1px solid rgba(8,255,8,0.25)',
      boxShadow: '0 2px 20px rgba(8,255,8,0.12)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 16px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      }}>
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="Aceros y Lujos" style={{ height: 44, width: 'auto', borderRadius: 6, objectFit: 'cover' }} />
        </a>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          <a href="#inicio" className="nav-link">Inicio</a>

          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setCategoriaDropdown(v => !v)}
              className="nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Categorías
              <FaChevronDown style={{
                fontSize: 11, color: 'rgb(8,255,8)', transition: 'transform .2s',
                transform: categoriaDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />
            </button>

            <AnimatePresence>
              {categoriaDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: 6, width: 230,
                    background: '#0a0a0a', border: '1px solid rgba(8,255,8,0.3)', borderRadius: 12,
                    boxShadow: '0 8px 30px rgba(8,255,8,0.15)', overflow: 'hidden',
                  }}
                >
                  {categorias.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => seleccionar(cat.id)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '11px 20px',
                        fontSize: 13, fontWeight: categoriaActiva === cat.id ? 700 : 500,
                        color: categoriaActiva === cat.id ? 'rgb(8,255,8)' : '#ccc',
                        background: categoriaActiva === cat.id ? 'rgba(8,255,8,0.1)' : 'transparent',
                        border: 'none',
                        borderLeft: categoriaActiva === cat.id ? '3px solid rgb(8,255,8)' : '3px solid transparent',
                        cursor: 'pointer', transition: 'all .15s',
                      }}
                      onMouseEnter={e => { if (categoriaActiva !== cat.id) e.currentTarget.style.background = 'rgba(8,255,8,0.06)'; }}
                      onMouseLeave={e => { if (categoriaActiva !== cat.id) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {cat.nombre}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#nosotros" className="nav-link">Nosotros</a>
          <a href="#contacto" className="nav-link">Contáctanos</a>
        </div>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CartIconButton totalProductos={totalProductos} onClick={() => setCarritoAbierto(true)} size={20} />
        </div>

        <div className="nav-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CartIconButton totalProductos={totalProductos} onClick={() => setCarritoAbierto(true)} size={22} />
          <button className="nav-icon-btn" onClick={() => setMenuMovilAbierto(v => !v)}>
            {menuMovilAbierto ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuMovilAbierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ background: '#0a0a0a', borderTop: '1px solid rgba(8,255,8,0.15)', overflow: 'hidden' }}
          >
            <div style={{ padding: '8px 0 12px' }}>
              <a href="#inicio" onClick={() => setMenuMovilAbierto(false)} style={mobileNavLink}>Inicio</a>

              <div>
                <button
                  onClick={() => setMenuCatMovilAbierto(v => !v)}
                  style={{ ...mobileNavLink, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span>Categorías</span>
                  <FaChevronDown style={{
                    fontSize: 12, color: 'rgb(8,255,8)', transition: 'transform .2s',
                    transform: menuCatMovilAbierto ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </button>

                <AnimatePresence>
                  {menuCatMovilAbierto && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      style={{ overflow: 'hidden', background: '#000' }}
                    >
                      {categorias.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => seleccionar(cat.id)}
                          style={{
                            display: 'block', width: '100%', textAlign: 'left', padding: '10px 32px',
                            fontSize: 13, fontWeight: categoriaActiva === cat.id ? 700 : 400,
                            color: categoriaActiva === cat.id ? 'rgb(8,255,8)' : '#888',
                            background: 'none', border: 'none', cursor: 'pointer',
                          }}
                        >
                          {cat.nombre}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#nosotros" onClick={() => setMenuMovilAbierto(false)} style={mobileNavLink}>Nosotros</a>
              <a href="#contacto" onClick={() => setMenuMovilAbierto(false)} style={mobileNavLink}>Contáctanos</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function CartIconButton({ totalProductos, onClick, size }) {
  return (
    <button className="nav-icon-btn" onClick={onClick} style={{ position: 'relative' }}>
      <FaShoppingCart size={size} />
      {totalProductos > 0 && (
        <span style={{
          position: 'absolute', top: -4, right: -4,
          background: 'rgb(8,255,8)', color: '#000', borderRadius: '50%', width: 20, height: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900,
          boxShadow: '0 0 10px rgba(8,255,8,0.8)',
        }}>
          {totalProductos}
        </span>
      )}
    </button>
  );
}
