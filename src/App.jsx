import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaTools,
  FaCarSide,
  FaShieldAlt,
  FaWrench,
  FaWater,
  FaBlender
} from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Tema claro/oscuro
  const [temaOscuro, setTemaOscuro] = useState(() => {
    const guardado = localStorage.getItem("temaOscuro");
    if (guardado !== null) return JSON.parse(guardado);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("temaOscuro", JSON.stringify(temaOscuro));
    if (temaOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [temaOscuro]);

  const toggleTema = () => setTemaOscuro(prev => !prev);

  // === PRODUCTOS ===
  const productos = [
    { id: 1, nombre: "Retrovisores Cromados", precio: 850000, img: "/retro.jpg", categoria: "retrovisores y regletas" },
    { id: 2, nombre: "Retrovisor 60 cm", precio: 380000, img: "/retro2.jpg", categoria: "retrovisores y regletas" },
    { id: 3, nombre: "Regleta LED azul", precio: 450000, img: "/retro3.jpg", categoria: "retrovisores y regletas" },
    { id: 4, nombre: "Defensa Delantera LED", precio: 1950000, img: "/defensa.jpg", categoria: "defensas" },
    { id: 5, nombre: "Defensa Trasera con Luces", precio: 1780000, img: "/defensa2.jpg", categoria: "defensas" },
    { id: 6, nombre: "Guardabarros Inox", precio: 680000, img: "/guarda.jpg", categoria: "guardabarros" },
    { id: 7, nombre: "Babero Inox Personalizado", precio: 720000, img: "/babero.jpg", categoria: "baberos" },
    { id: 8, nombre: "Mofle Cromado 5 pulg", precio: 1350000, img: "/mofle.jpg", categoria: "mofles" },
    { id: 9, nombre: "Estribos Tubulares", precio: 1680000, img: "/estribo.jpg", categoria: "estribos" },
    { id: 10, nombre: "Tanque Agua 100L Inox", precio: 980000, img: "/tanque.jpg", categoria: "tanques" },
    { id: 11, nombre: "Porta Licuadora Inox", precio: 890000, img: "/portalic.jpg", categoria: "portalicuadora" },
  ];

  const categorias = [
    { id: "todos", nombre: "Todos los Productos", icon: <FaTools /> },
    { id: "retrovisores y regletas", nombre: "Retrovisores y Regletas", icon: <FaCarSide /> },
    { id: "defensas", nombre: "Defensas", icon: <FaShieldAlt /> },
    { id: "guardabarros", nombre: "Guardabarros", icon: <FaShieldAlt /> },
    { id: "baberos", nombre: "Baberos", icon: <FaWrench /> },
    { id: "mofles", nombre: "Mofles y Escapes", icon: <FaTools /> },
    { id: "estribos", nombre: "Estribos", icon: <FaTools /> },
    { id: "tanques", nombre: "Tanques de Agua", icon: <FaWater /> },
    { id: "portalicuadora", nombre: "Porta Licuadoras", icon: <FaBlender /> },
  ];

  const productosFiltrados = categoriaActiva === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  // === FUNCIONES DEL CARRITO ===
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;

    let mensaje = `*¡Hola Aceros y Lujos!* \n\nQuiero cotizar:\n\n`;
    carrito.forEach(item => {
      mensaje += `• ${item.nombre}\n  Cantidad: ${item.cantidad} → $${(item.precio * item.cantidad).toLocaleString()} COP\n\n`;
    });
    mensaje += `─────────────────\n`;
    mensaje += `*TOTAL: $${total.toLocaleString()} COP*\n\n`;
    mensaje += `¡Gracias, quedo pendiente!`;

    const url = `https://wa.me/573001704587?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${temaOscuro ? "dark bg-gray-900" : "bg-gray-50"}`}>

      {/* BOTONES FIJOS MÓVIL */}
      <div className="fixed top-4 left-4 right-4 flex justify-between z-50 md:hidden">
        <button
          onClick={() => setMenuAbierto(true)}
          className="bg-white dark:bg-gray-800 p-3.5 rounded-full shadow-2xl"
        >
          <FaBars size={24} className="text-green-700 dark:text-green-400" />
        </button>
        <button
          onClick={toggleTema}
          className="bg-white dark:bg-gray-800 p-3.5 rounded-full shadow-2xl"
        >
          {temaOscuro ? <FaSun size={24} className="text-yellow-400" /> : <FaMoon size={24} className="text-gray-800" />}
        </button>
      </div>

      {/* MENÚ LATERAL DESPLEGABLE (MÓVIL) */}
      <AnimatePresence>
        {menuAbierto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuAbierto(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <img src="/logo.jpg" alt="Logo" className="h-14" />
                <button onClick={() => setMenuAbierto(false)}>
                  <FaTimes size={30} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Categorías</h3>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoriaActiva(cat.id);
                    setMenuAbierto(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl mb-3 transition-all ${
                    categoriaActiva === cat.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-medium">{cat.nombre}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER ESCRITORIO */}
      <header className="hidden md:flex sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-lg items-center justify-between px-8 py-5">
        <img src="/logo.jpg" alt="Aceros y Lujos" className="h-16" />
        <div className="flex items-center gap-6">
          {categorias.slice(0, 7).map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`font-medium px-5 py-2 rounded-full transition ${
                categoriaActiva === cat.id
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
          <button
          onClick={toggleTema}
          className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          {temaOscuro ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
        </button>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black text-green-700 dark:text-green-400 mb-4"
        >
          ACEROS Y LUJOS
        </motion.h1>
        <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-10">
          Accesorios Inoxidables Premium para Camiones
        </p>
        <button
          onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-5 rounded-full text-xl shadow-2xl transition"
        >
          Ver Catálogo
        </button>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-green-700 dark:text-green-400">
            {categorias.find(c => c.id === categoriaActiva)?.nombre || "Productos"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {productosFiltrados.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => agregarAlCarrito(prod)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={prod.img}
                    alt={prod.nombre}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm line-clamp-2 text-gray-900 dark:text-white">
                    {prod.nombre}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-black text-xl mt-2">
                    ${prod.precio.toLocaleString()} COP
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Toca para añadir</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTÓN CARRITO FIJO */}
      <button
        onClick={() => setCarritoAbierto(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-5 rounded-full shadow-2xl z-40 transition"
      >
        <FaShoppingCart size={28} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
            {totalItems}
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
            className="fixed inset-0 bg-black/70 z-50 flex items-end"
            onClick={() => setCarritoAbierto(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-white dark:bg-gray-900 w-full max-w-lg mx-auto rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black text-green-600 dark:text-green-400 text-center mb-6">
                Mi Pedido ({totalItems})
              </h3>

              {carrito.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">
                  Tu carrito está vacío
                </p>
              ) : (
                <>
                  {carrito.map(item => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <img src={item.img} alt={item.nombre} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.nombre}</h4>
                        <p className="text-green-600 dark:text-green-400 font-bold text-lg">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => cambiarCantidad(item.id, -1)}
                            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                          >
                            <FaMinus size={14} />
                          </button>
                          <span className="font-bold w-8 text-center">{item.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidad(item.id, 1)}
                            className="bg-green-600 text-white p-2 rounded-lg"
                          >
                            <FaPlus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-red-600 dark:text-red-400"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                    <div className="flex justify-between text-xl font-black mb-6">
                      <span className="text-gray-800 dark:text-white">Total:</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${total.toLocaleString()} COP
                      </span>
                    </div>
                    <button
                      onClick={enviarAWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 text-lg transition"
                    >
                      <FaWhatsapp size={28} />
                      Enviar Pedido por WhatsApp
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 bg-black text-white text-center">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </div>
  );
}

export default App;