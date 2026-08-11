import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp, FaShoppingCart, FaPlus, FaMinus,
  FaTrash, FaChevronDown, FaBars, FaTimes, FaUser
} from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [categoriaDropdown, setCategoriaDropdown] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [menuCatMovilAbierto, setMenuCatMovilAbierto] = useState(false);
  const dropdownRef = useRef(null);

  const productos = [
    { id: 1, nombre: "Retrovisores Cromados", precio: 850000, img: "/retro.jpg", categoria: "retrovisores y regletas" },
    { id: 2, nombre: "Retrovisor 60 cm", precio: 380000, img: "/retro2.jpg", categoria: "retrovisores y regletas" },
    { id: 3, nombre: "Regleta LED azul", precio: 450000, img: "/retro3.jpg", categoria: "retrovisores y regletas" },
    { id: 4, nombre: "Defensa Delantera LED", precio: 1950000, img: "/defensa.jpg", categoria: "defensas" },
    { id: 5, nombre: "Defensa Trasera con Luces", precio: 1780000, img: "/defensa2.jpg", categoria: "defensas" },
    { id: 6, nombre: "Guardabarros Inox", precio: 680000, img: "/guarda.jpg", categoria: "guardabarros" },
    { id: 7, nombre: "Babero Inox Personalizado", precio: 720000, img: "/babero.jpg", categoria: "baberos" },
    { id: 8, nombre: "Mofle Escape Cromado 5 pulgadas", precio: 1350000, img: "/mofle.jpg", categoria: "mofles" },
    { id: 9, nombre: "Estribos Laterales Tubulares", precio: 1680000, img: "/estribo.jpg", categoria: "estribos" },
    { id: 10, nombre: "Tanque de Agua 100 Litros Inox", precio: 980000, img: "/tanque.jpg", categoria: "tanques" },
    { id: 11, nombre: "Porta Licuadora Inox c/ Cerradura", precio: 890000, img: "/portalic.jpg", categoria: "portalicuadora" },
  ];

  const categorias = [
    { id: "todos", nombre: "Todos los Productos" },
    { id: "retrovisores y regletas", nombre: "Retrovisores y Regletas" },
    { id: "defensas", nombre: "Defensas" },
    { id: "guardabarros", nombre: "Guardabarros" },
    { id: "baberos", nombre: "Baberos" },
    { id: "mofles", nombre: "Mofles" },
    { id: "estribos", nombre: "Estribos" },
    { id: "tanques", nombre: "Tanques de Agua" },
    { id: "portalicuadora", nombre: "Porta Licuadoras" },
  ];

  const productosFiltrados = categoriaActiva === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setCategoriaDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Bloquear scroll del body cuando el menú móvil o carrito está abierto
  useEffect(() => {
    document.body.style.overflow = (menuMovilAbierto || carritoAbierto) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuMovilAbierto, carritoAbierto]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) return prev.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) =>
    setCarrito(prev =>
      prev.map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i)
    );

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(i => i.id !== id));

  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const totalProductos = carrito.reduce((s, i) => s + i.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (!carrito.length) return;
    let msg = `*¡Hola Aceros y Lujos!*\n\nQuiero cotizar:\n\n`;
    carrito.forEach(i => {
      msg += `• ${i.nombre}\n  Cantidad: ${i.cantidad} → $${(i.precio * i.cantidad).toLocaleString()} COP\n\n`;
    });
    msg += `─────────────────\n*TOTAL: $${total.toLocaleString()} COP*\n\n¡Gracias!`;
    window.open(`https://wa.me/573005968323?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const seleccionarCategoria = (catId) => {
    setCategoriaActiva(catId);
    setCategoriaDropdown(false);
    setMenuMovilAbierto(false);
    setMenuCatMovilAbierto(false);
    setTimeout(() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: '#000',
        borderBottom: '1px solid rgba(8,255,8,0.25)',
        boxShadow: '0 2px 20px rgba(8,255,8,0.12)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 16px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>

          {/* Logo */}
          <a href="#inicio" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <img src="/logo.jpg" alt="Aceros y Lujos"
              style={{ height: 44, width: 'auto', borderRadius: 6, objectFit: 'cover' }} />
          </a>

          {/* Links — desktop (≥768px) */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>

            <a href="#inicio" className="nav-link">Inicio</a>

            {/* Dropdown Categorías */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setCategoriaDropdown(v => !v)}
                className="nav-link"
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Categorías
                <FaChevronDown style={{
                  fontSize: 11, color: 'rgb(8,255,8)',
                  transition: 'transform .2s',
                  transform: categoriaDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                }} />
              </button>

              <AnimatePresence>
                {categoriaDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0, marginTop: 6,
                      width: 230,
                      background: '#0a0a0a',
                      border: '1px solid rgba(8,255,8,0.3)',
                      borderRadius: 12,
                      boxShadow: '0 8px 30px rgba(8,255,8,0.15)',
                      overflow: 'hidden',
                    }}
                  >
                    {categorias.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => seleccionarCategoria(cat.id)}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '11px 20px',
                          fontSize: 13, fontWeight: categoriaActiva === cat.id ? 700 : 500,
                          color: categoriaActiva === cat.id ? 'rgb(8,255,8)' : '#ccc',
                          background: categoriaActiva === cat.id ? 'rgba(8,255,8,0.1)' : 'transparent',
                          borderLeft: categoriaActiva === cat.id ? '3px solid rgb(8,255,8)' : '3px solid transparent',
                          border: 'none',
                          borderLeft: categoriaActiva === cat.id ? '3px solid rgb(8,255,8)' : '3px solid transparent',
                          cursor: 'pointer',
                          transition: 'all .15s',
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

          {/* Iconos derecha — desktop */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className="nav-icon-btn" onClick={() => setCarritoAbierto(true)} style={{ position: 'relative' }}>
              <FaShoppingCart size={20} />
              {totalProductos > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: 'rgb(8,255,8)', color: '#000',
                  borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900,
                  boxShadow: '0 0 10px rgba(8,255,8,0.8)',
                }}>
                  {totalProductos}
                </span>
              )}
            </button>
          </div>

          {/* Móvil: carrito + hamburguesa */}
          <div className="nav-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className="nav-icon-btn" onClick={() => setCarritoAbierto(true)} style={{ position: 'relative' }}>
              <FaShoppingCart size={22} />
              {totalProductos > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: 'rgb(8,255,8)', color: '#000',
                  borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900,
                }}>
                  {totalProductos}
                </span>
              )}
            </button>
            <button className="nav-icon-btn" onClick={() => setMenuMovilAbierto(v => !v)}>
              {menuMovilAbierto ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Menú desplegable */}
        <AnimatePresence>
          {menuMovilAbierto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                background: '#0a0a0a',
                borderTop: '1px solid rgba(8,255,8,0.15)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '8px 0 12px' }}>
                {/* Inicio */}
                <a href="#inicio"
                  onClick={() => setMenuMovilAbierto(false)}
                  style={mobileNavLink}>
                  Inicio
                </a>

                {/* Categorías acordeón */}
                <div>
                  <button
                    onClick={() => setMenuCatMovilAbierto(v => !v)}
                    style={{ ...mobileNavLink, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span>Categorías</span>
                    <FaChevronDown style={{
                      fontSize: 12, color: 'rgb(8,255,8)',
                      transition: 'transform .2s',
                      transform: menuCatMovilAbierto ? 'rotate(180deg)' : 'rotate(0)',
                    }} />
                  </button>

                  <AnimatePresence>
                    {menuCatMovilAbierto && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        style={{ overflow: 'hidden', background: '#000' }}
                      >
                        {categorias.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => seleccionarCategoria(cat.id)}
                            style={{
                              display: 'block', width: '100%', textAlign: 'left',
                              padding: '10px 32px',
                              fontSize: 13,
                              fontWeight: categoriaActiva === cat.id ? 700 : 400,
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

      {/* Espaciador navbar */}
      <div style={{ height: 64 }} />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section id="inicio" style={{
        minHeight: 'calc(100vh - 64px)',
        background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/logo.jpg" alt="Aceros y Lujos"
            style={{ width: 'min(280px, 60vw)', marginBottom: 24, borderRadius: 12, objectFit: 'cover', display: 'block', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)', fontWeight: 900, color: '#000', marginBottom: 12, lineHeight: 1.1 }}>
            INOXIDABLES
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#555', marginBottom: 28 }}>
            Accesorios Premium para Camiones
          </p>
          <a href="#productos" className="glow-button" style={{
            display: 'inline-block',
            background: 'rgb(8,255,8)', color: '#000', fontWeight: 800,
            padding: '16px 40px', borderRadius: 50, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            textDecoration: 'none', transition: 'background .2s, transform .2s',
          }}>
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCTOS
      ════════════════════════════════════════ */}
      <section id="productos" style={{ padding: '48px 0', background: '#f3f4f6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 36, fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#111' }}>
            {categoriaActiva === "todos" ? "Todos los Productos" : categorias.find(c => c.id === categoriaActiva)?.nombre}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 45vw), 1fr))',
            gap: 16,
          }}>
            {productosFiltrados.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                style={{
                  background: '#fff', borderRadius: 14,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform .2s, box-shadow .2s',
                  /* ✅ flex column para que el botón siempre quede al fondo */
                  display: 'flex', flexDirection: 'column',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.16)' }}
              >
                <img src={prod.img} alt={prod.nombre}
                  style={{ width: '100%', height: 'clamp(120px, 28vw, 170px)', objectFit: 'cover', display: 'block', flexShrink: 0 }} />

                {/* Área de texto + botón — ocupa el espacio restante */}
                <div style={{
                  padding: '12px',
                  display: 'flex', flexDirection: 'column',
                  flex: 1,           /* ← crece para llenar la tarjeta */
                }}>
                  {/* Nombre: altura fija de 2 líneas */}
                  <h3 style={{
                    fontSize: 'clamp(0.78rem, 2.6vw, 0.9rem)',
                    fontWeight: 700, color: '#111',
                    marginBottom: 6,
                    /* altura fija equivalente a 2 líneas */
                    minHeight: '2.6em',
                    lineHeight: '1.3em',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {prod.nombre}
                  </h3>

                  {/* Precio: altura fija de 1 línea */}
                  <p style={{
                    fontSize: 'clamp(0.92rem, 3vw, 1.05rem)',
                    fontWeight: 900, color: '#000',
                    marginBottom: 10,
                    whiteSpace: 'nowrap',   /* ← evita que el precio salte de línea */
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    ${prod.precio.toLocaleString()} COP
                  </p>

                  {/* Botón empujado al fondo con marginTop: auto */}
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="glow-button"
                    style={{
                      marginTop: 'auto',   /* ← siempre al fondo sin importar el texto */
                      width: '100%',
                      background: 'rgb(8,255,8)', color: '#000',
                      fontWeight: 700,
                      padding: '11px 0',
                      borderRadius: 8, border: 'none',
                      fontSize: 'clamp(0.78rem, 2.2vw, 0.88rem)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'background .15s',
                      flexShrink: 0,
                    }}
                  >
                    <FaShoppingCart /> Añadir
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOBRE NOSOTROS
      ════════════════════════════════════════ */}
      <section id="nosotros" style={{ padding: '64px 24px', background: '#000', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 20 }}>
            Sobre <span style={{ color: 'rgb(8,255,8)' }}>Nosotros</span>
          </h2>
          <p style={{ color: '#ccc', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: 16 }}>
            Somos <strong style={{ color: '#fff' }}>Aceros y Lujos</strong>, especializados en accesorios inoxidables premium para camiones.
            Con años de experiencia en el mercado colombiano, fabricamos y distribuimos productos de la más alta calidad.
          </p>
          <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7 }}>
            Ubicados en Soledad, Atlántico. Cada pieza está diseñada para durar y darle a tu vehículo el estilo que merece.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTÁCTANOS
      ════════════════════════════════════════ */}
      <section id="contacto" style={{ padding: '64px 24px', background: '#111', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 16 }}>
            <span style={{ color: 'rgb(8,255,8)' }}>Contáctanos</span>
          </h2>
          <p style={{ color: '#aaa', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: 32 }}>
            ¿Tienes alguna pregunta? Escríbenos por WhatsApp y con gusto te atendemos.
          </p>
          <a
            href="https://wa.me/573005968323"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgb(8,255,8)', color: '#000',
              fontWeight: 800, padding: '16px 36px', borderRadius: 50,
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', textDecoration: 'none',
            }}
          >
            <FaWhatsapp size={24} /> Escribir al WhatsApp
          </a>
          <p style={{ color: '#555', marginTop: 24, fontSize: 13 }}>📍 Soledad, Atlántico, Colombia</p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MODAL CARRITO
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {carritoAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCarritoAbierto(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.75)',
              zIndex: 2000,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                width: '100%', maxWidth: 520,
                borderRadius: '24px 24px 0 0',
                padding: '24px 20px',
                maxHeight: '82vh',
                overflowY: 'auto',
              }}
            >
              {/* Drag handle */}
              <div style={{ width: 40, height: 4, background: '#ddd', borderRadius: 4, margin: '0 auto 20px' }} />

              <h3 style={{
                textAlign: 'center', fontWeight: 900,
                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                color: 'rgb(8,255,8)', marginBottom: 20,
                textShadow: '0 0 15px rgba(8,255,8,0.7)',
              }}>
                Mi Pedido ({totalProductos})
              </h3>

              {carrito.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '40px 0', fontSize: 15 }}>
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  {carrito.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', gap: 12, marginBottom: 20,
                      paddingBottom: 20, borderBottom: '1px solid #eee', alignItems: 'flex-start',
                    }}>
                      <img src={item.img} alt={item.nombre}
                        style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontWeight: 600, fontSize: 13, color: '#222', marginBottom: 4,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                          {item.nombre}
                        </p>
                        <p style={{ fontWeight: 900, fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', color: '#000' }}>
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button onClick={() => cambiarCantidad(item.id, -1)}
                            style={{ background: '#f0f0f0', border: 'none', borderRadius: 6, padding: '6px 8px', cursor: 'pointer' }}>
                            <FaMinus size={12} />
                          </button>
                          <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: 14 }}>
                            {item.cantidad}
                          </span>
                          <button onClick={() => cambiarCantidad(item.id, 1)}
                            style={{ background: 'rgb(8,255,8)', border: 'none', borderRadius: 6, padding: '6px 8px', cursor: 'pointer' }}>
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e' }}>
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 0', borderTop: '2px solid #eee',
                    fontWeight: 900, fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#000',
                  }}>
                    <span>Total:</span>
                    <span>${total.toLocaleString()} COP</span>
                  </div>

                  <button
                    onClick={enviarAWhatsApp}
                    className="glow-button"
                    style={{
                      width: '100%', background: 'rgb(8,255,8)', color: '#000',
                      fontWeight: 800, padding: '16px', borderRadius: 50, border: 'none',
                      fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      marginTop: 16,
                    }}
                  >
                    <FaWhatsapp size={24} /> Enviar Pedido por WhatsApp
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{
        padding: '28px 16px', background: '#000', color: '#555',
        textAlign: 'center', fontSize: 13,
        borderTop: '1px solid rgba(8,255,8,0.12)',
      }}>
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>

      {/* ════════════════════════════════════════
          ESTILOS GLOBALES
      ════════════════════════════════════════ */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-text-size-adjust: 100%;
          overflow-x: hidden;
        }

        /* Viewport fix para móviles con notch / barra del sistema */
        @supports (padding: max(0px)) {
          nav { padding-left: max(0px, env(safe-area-inset-left)); padding-right: max(0px, env(safe-area-inset-right)); }
          footer { padding-bottom: max(28px, env(safe-area-inset-bottom)); }
        }

        /* Clases responsive del navbar */
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none !important; }

        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }

        .nav-link {
          padding: 8px 14px;
          font-size: 13px; font-weight: 700;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.06em; text-transform: uppercase;
          transition: color .15s;
          white-space: nowrap;
        }
        .nav-link:hover { color: rgb(8,255,8); }

        .nav-icon-btn {
          background: none; border: none; cursor: pointer;
          color: #888;
          padding: 8px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: color .15s, background .15s;
          position: relative;
        }
        .nav-icon-btn:hover { color: rgb(8,255,8); background: rgba(8,255,8,0.08); }

        .glow-button {
          box-shadow: 0 0 24px rgba(8,255,8,0.7);
          animation: neon-pulse 1.8s infinite alternate;
        }
        .glow-button:hover { background: rgb(0,220,0) !important; }

        @keyframes neon-pulse {
          from { box-shadow: 0 0 18px rgba(8,255,8,0.65); }
          to   { box-shadow: 0 0 36px rgba(8,255,8,1), 0 0 55px rgba(8,255,8,0.5); }
        }

        /* Touch tap highlight */
        button, a { -webkit-tap-highlight-color: transparent; }

        /* Scrollbar dentro del carrito */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(8,255,8,0.4); border-radius: 4px; }
      `}</style>
    </>
  );
}

/* Estilo base para links de nav móvil */
const mobileNavLink = {
  display: 'block',
  padding: '13px 20px',
  fontSize: 14, fontWeight: 700,
  color: '#fff',
  textDecoration: 'none',
  letterSpacing: '0.05em', textTransform: 'uppercase',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

export default App;