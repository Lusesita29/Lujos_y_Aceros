/* --- PRECIOS EN NEGRO + BOTONES VERDE FOSFORESCENTE RGB(8,255,8) --- */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaChevronDown, FaBars } from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  // === PRODUCTOS (sin cambios) ===
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

  // === FUNCIONES CARRITO (sin cambios) ===
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let mensaje = `*¡Hola Aceros y Lujos!* \n\nQuiero cotizar lo siguiente:\n\n`;
    carrito.forEach((item) => {
      mensaje += `• ${item.nombre}\n Cantidad: ${item.cantidad} → $${(item.precio * item.cantidad).toLocaleString()} COP\n\n`;
    });
    mensaje += `─────────────────\n`;
    mensaje += `*TOTAL: $${total.toLocaleString()} COP*\n\n`;
    mensaje += `¡Gracias, quedo pendiente de su respuesta!`;
    const telefono = "573001704587";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <motion.div className="text-center">
          <img src="/logo.jpg" alt="Aceros y Lujos" className="w-56 md:w-72 mb-6 mx-auto" />
          <h1 className="text-4xl md:text-7xl font-black text-black mb-4">INOXIDABLES</h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6">Accesorios Premium para Camiones</p>
          <a
            href="#categorias"
            className="bg-[rgb(8,255,8)] text-black font-bold px-10 py-5 rounded-full text-lg shadow-2xl 
                       hover:bg-[rgb(0,220,0)] transition transform hover:scale-105 
                       shadow-[0_0_30px_rgba(8,255,8,0.7)] glow-button"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* MENÚ DE CATEGORÍAS */}
      <section id="categorias" className="py-3 bg-gray-900 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex gap-2 flex-wrap justify-center">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all
                  ${categoriaActiva === cat.id
                    ? "bg-[rgb(8,255,8)] text-black shadow-lg shadow-[0_0_30px_rgba(8,255,8,0.7)] glow-button"
                    : "bg-gray-800 text-gray-300 hover:bg-[rgb(8,255,8)] hover:text-black hover:shadow-[0_0_25px_rgba(8,255,8,0.6)]"
                  }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* Móvil */}
          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => setDropdownAbierto(!dropdownAbierto)}
              className="flex items-center gap-3 bg-gray-800 px-5 py-4 rounded-xl w-full font-bold text-white shadow-lg"
            >
              <FaBars className="text-[rgb(8,255,8)]" />
              <span className="flex-1 text-left">
                {categorias.find(c => c.id === categoriaActiva)?.nombre || "Categorías"}
              </span>
              <FaChevronDown className={`text-[rgb(8,255,8)] transition ${dropdownAbierto ? "rotate-180" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            {dropdownAbierto && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-gray-800 rounded-b-xl overflow-hidden shadow-2xl mt-1"
              >
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoriaActiva(cat.id);
                      setDropdownAbierto(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-white font-medium transition
                      ${categoriaActiva === cat.id ? "bg-[rgb(8,255,8)] text-black font-bold" : "hover:bg-gray-700"}
                    `}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-10 bg-gray-50">
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
                  {/* PRECIO AHORA EN NEGRO Y MÁS LEGIBLE */}
                  <p className="text-black text-lg sm:text-xl font-black mt-2">
                    ${prod.precio.toLocaleString()} COP
                  </p>
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

      {/* BOTÓN CARRITO FIJO */}
      <button
        onClick={() => setCarritoAbierto(true)}
        className="fixed bottom-20 right-5 bg-[rgb(8,255,8)] text-black p-5 rounded-full shadow-2xl z-40 
                   hover:bg-[rgb(0,200,0)] transition transform hover:scale-110 glow-button"
      >
        <FaShoppingCart size={28} />
        {totalProductos > 0 && (
          <span className="absolute -top-3 -right-3 bg-black text-[rgb(8,255,8)] rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shadow-lg border-2 border-[rgb(8,255,8)]">
            {totalProductos}
          </span>
        )}
      </button>

      {/* MODAL CARRITO */}
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
                        {/* PRECIO EN EL CARRITO TAMBIÉN EN NEGRO PARA MEJOR LEGIBILIDAD */}
                        <p className="text-black font-bold text-lg">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
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

      {/* EFECTO FOSFORESCENTE (solo para botones) */}
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

      <footer className="py-8 bg-black text-white text-center text-sm">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </>
  );
}

export default App;