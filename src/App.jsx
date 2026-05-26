import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaChevronDown, FaBars, FaTimes, FaUser } from 'react-icons/fa';

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
    { id: 11, nombre: "Porta Licuadora Inox con Cerradura", precio: 890000, img: "/portalic.jpg", categoria: "portalicuadora" },
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

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoriaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) return prev.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev.map((item) => item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item)
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => setCarrito((prev) => prev.filter((item) => item.id !== id));

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let mensaje = `*¡Hola Aceros y Lujos!* \n\nQuiero cotizar lo siguiente:\n\n`;
    carrito.forEach((item) => {
      mensaje += `• ${item.nombre}\n Cantidad: ${item.cantidad} → $${(item.precio * item.cantidad).toLocaleString()} COP\n\n`;
    });
    mensaje += `─────────────────\n*TOTAL: $${total.toLocaleString()} COP*\n\n¡Gracias, quedo pendiente de su respuesta!`;
    window.open(`https://wa.me/573005968323?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const seleccionarCategoria = (catId) => {
    setCategoriaActiva(catId);
    setCategoriaDropdown(false);
    setMenuMovilAbierto(false);
    setMenuCatMovilAbierto(false);
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ===== NAVBAR SUPERIOR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[rgba(8,255,8,0.25)] shadow-[0_2px_20px_rgba(8,255,8,0.15)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logo.jpg" alt="Aceros y Lujos" className="h-10 w-auto rounded" />
          </a>

          {/* NAV LINKS — Desktop */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Inicio */}
            <a
              href="#inicio"
              className="px-4 py-2 text-sm font-bold text-white hover:text-[rgb(8,255,8)] transition-colors tracking-wide uppercase"
            >
              Inicio
            </a>

            {/* Categorías con Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriaDropdown(!categoriaDropdown)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white hover:text-[rgb(8,255,8)] transition-colors tracking-wide uppercase"
              >
                Categorías
                <FaChevronDown className={`text-xs text-[rgb(8,255,8)] transition-transform duration-200 ${categoriaDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {categoriaDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-gray-950 border border-[rgba(8,255,8,0.3)] rounded-xl shadow-2xl shadow-[0_8px_30px_rgba(8,255,8,0.15)] overflow-hidden"
                  >
                    {categorias.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => seleccionarCategoria(cat.id)}
                        className={`w-full text-left px-5 py-3 text-sm font-medium transition-all
                          ${categoriaActiva === cat.id
                            ? 'bg-[rgba(8,255,8,0.15)] text-[rgb(8,255,8)] font-bold border-l-2 border-[rgb(8,255,8)]'
                            : 'text-gray-300 hover:bg-[rgba(8,255,8,0.08)] hover:text-white'
                          }`}
                      >
                        {cat.nombre}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sobre Nosotros */}
            <a
              href="#nosotros"
              className="px-4 py-2 text-sm font-bold text-white hover:text-[rgb(8,255,8)] transition-colors tracking-wide uppercase"
            >
              Nosotros
            </a>

            {/* Contáctanos */}
            <a
              href="#contacto"
              className="px-4 py-2 text-sm font-bold text-white hover:text-[rgb(8,255,8)] transition-colors tracking-wide uppercase"
            >
              Contáctanos
            </a>
          </div>

          {/* ICONOS DERECHA — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Icono usuario */}
            <button className="p-2.5 text-gray-400 hover:text-[rgb(8,255,8)] transition-colors rounded-lg hover:bg-[rgba(8,255,8,0.08)]">
              <FaUser size={18} />
            </button>

            {/* Carrito */}
            <button
              onClick={() => setCarritoAbierto(true)}
              className="relative p-2.5 text-gray-400 hover:text-[rgb(8,255,8)] transition-colors rounded-lg hover:bg-[rgba(8,255,8,0.08)]"
            >
              <FaShoppingCart size={20} />
              {totalProductos > 0 && (
                <span className="absolute -top-1 -right-1 bg-[rgb(8,255,8)] text-black rounded-full w-5 h-5 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(8,255,8,0.8)]">
                  {totalProductos}
                </span>
              )}
            </button>
          </div>

          {/* MÓVIL: carrito + hamburguesa */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCarritoAbierto(true)}
              className="relative p-2.5 text-gray-400 hover:text-[rgb(8,255,8)] transition-colors"
            >
              <FaShoppingCart size={22} />
              {totalProductos > 0 && (
                <span className="absolute -top-1 -right-1 bg-[rgb(8,255,8)] text-black rounded-full w-5 h-5 flex items-center justify-center font-black text-xs">
                  {totalProductos}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              className="p-2.5 text-gray-300 hover:text-[rgb(8,255,8)] transition-colors"
            >
              {menuMovilAbierto ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        <AnimatePresence>
          {menuMovilAbierto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-gray-950 border-t border-[rgba(8,255,8,0.15)] overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                <a href="#inicio" onClick={() => setMenuMovilAbierto(false)}
                  className="px-4 py-3 text-sm font-bold text-white tracking-wide uppercase border-b border-gray-800">
                  Inicio
                </a>

                {/* Categorías móvil */}
                <div>
                  <button
                    onClick={() => setMenuCatMovilAbierto(!menuCatMovilAbierto)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-white tracking-wide uppercase border-b border-gray-800"
                  >
                    <span>Categorías</span>
                    <FaChevronDown className={`text-[rgb(8,255,8)] text-xs transition-transform ${menuCatMovilAbierto ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {menuCatMovilAbierto && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-black"
                      >
                        {categorias.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => seleccionarCategoria(cat.id)}
                            className={`w-full text-left px-8 py-2.5 text-sm transition
                              ${categoriaActiva === cat.id ? 'text-[rgb(8,255,8)] font-bold' : 'text-gray-400 hover:text-white'}`}
                          >
                            {cat.nombre}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#nosotros" onClick={() => setMenuMovilAbierto(false)}
                  className="px-4 py-3 text-sm font-bold text-white tracking-wide uppercase border-b border-gray-800">
                  Nosotros
                </a>
                <a href="#contacto" onClick={() => setMenuMovilAbierto(false)}
                  className="px-4 py-3 text-sm font-bold text-white tracking-wide uppercase">
                  Contáctanos
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Espaciador para el navbar fijo */}
      <div className="h-16" />

      {/* ===== HERO ===== */}
      <section id="inicio" className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/logo.jpg" alt="Aceros y Lujos" className="w-56 md:w-72 mb-6 mx-auto" />
          <h1 className="text-4xl md:text-7xl font-black text-black mb-4">INOXIDABLES</h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6">Accesorios Premium para Camiones</p>
          <a
            href="#productos"
            className="bg-[rgb(8,255,8)] text-black font-bold px-10 py-5 rounded-full text-lg shadow-2xl 
                       hover:bg-[rgb(0,220,0)] transition transform hover:scale-105 
                       shadow-[0_0_30px_rgba(8,255,8,0.7)] glow-button inline-block"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* ===== PRODUCTOS ===== */}
      <section id="productos" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl text-center mb-10 font-black text-gray-900">
            {categoriaActiva === "todos" ? "Todos los Productos" : categorias.find(c => c.id === categoriaActiva)?.nombre}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {productosFiltrados.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img src={prod.img} alt={prod.nombre} className="w-full h-32 sm:h-40 object-cover" />
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-black line-clamp-2">{prod.nombre}</h3>
                  <p className="text-black text-lg sm:text-xl font-black mt-2">${prod.precio.toLocaleString()} COP</p>
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="w-full bg-[rgb(8,255,8)] text-black font-bold py-2.5 mt-3 rounded-lg text-sm 
                               hover:bg-[rgb(0,200,0)] transition-all glow-button flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Añadir
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE NOSOTROS ===== */}
      <section id="nosotros" className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Sobre <span className="text-[rgb(8,255,8)]">Nosotros</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Somos <strong className="text-white">Aceros y Lujos</strong>, especializados en accesorios inoxidables premium para camiones. Con años de experiencia en el mercado colombiano, fabricamos y distribuimos productos de la más alta calidad.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Ubicados en Soledad, Atlántico. Cada pieza está diseñada para durar y darle a tu vehículo el estilo que merece.
          </p>
        </div>
      </section>

      {/* ===== CONTÁCTANOS ===== */}
      <section id="contacto" className="py-16 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            <span className="text-[rgb(8,255,8)]">Contáctanos</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">¿Tienes alguna pregunta? Escríbenos por WhatsApp y con gusto te atendemos.</p>
          <a
            href="https://wa.me/573005968323"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[rgb(8,255,8)] text-black font-bold px-10 py-5 rounded-full text-lg glow-button hover:bg-[rgb(0,200,0)] transition"
          >
            <FaWhatsapp size={26} /> Escribir al WhatsApp
          </a>
          <p className="text-gray-500 mt-6 text-sm">📍 Soledad, Atlántico, Colombia</p>
        </div>
      </section>

      {/* ===== MODAL CARRITO ===== */}
      <AnimatePresence>
        {carritoAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end"
            onClick={() => setCarritoAbierto(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-white w-full max-w-lg rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black text-[rgb(8,255,8)] mb-4 text-center drop-shadow glow-text">
                Mi Pedido ({totalProductos})
              </h3>
              {carrito.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-lg">Tu carrito está vacío</p>
              ) : (
                <>
                  {carrito.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-5 pb-4 border-b">
                      <img src={item.img} alt={item.nombre} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-grow">
                        <h4 className="font-semibold text-sm">{item.nombre}</h4>
                        <p className="text-black font-bold text-lg">${(item.precio * item.cantidad).toLocaleString()} COP</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => cambiarCantidad(item.id, -1)} className="bg-gray-200 p-2 rounded"><FaMinus /></button>
                          <span className="font-bold w-8 text-center">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} className="bg-[rgb(8,255,8)] text-black p-2 rounded hover:bg-[rgb(0,200,0)]"><FaPlus /></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-600"><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 pt-4 border-t text-xl font-black flex justify-between">
                    <span>Total:</span>
                    <span className="text-black">${total.toLocaleString()} COP</span>
                  </div>
                  <button
                    onClick={enviarAWhatsApp}
                    className="w-full bg-[rgb(8,255,8)] text-black font-bold py-5 rounded-full mt-5 flex items-center justify-center gap-3 text-lg glow-button hover:bg-[rgb(0,200,0)] transition"
                  >
                    <FaWhatsapp size={28} /> Enviar Pedido por WhatsApp
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glow-button {
          box-shadow: 0 0 30px rgba(8, 255, 8, 0.8);
          animation: neon-pulse 1.8s infinite alternate;
        }
        .glow-text {
          text-shadow: 0 0 15px rgba(8, 255, 8, 0.9);
        }
        @keyframes neon-pulse {
          from { box-shadow: 0 0 20px rgba(8, 255, 8, 0.7); }
          to { box-shadow: 0 0 40px rgba(8, 255, 8, 1), 0 0 60px rgba(8, 255, 8, 0.6); }
        }
      `}</style>

      <footer className="py-8 bg-black text-white text-center text-sm border-t border-[rgba(8,255,8,0.15)]">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </>
  );
}

export default App;