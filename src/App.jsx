/* NUEVO DISEÑO 2025: MENÚ LATERAL DESPLEGABLE INTERACTIVO */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaTrash, 
  FaBars,
  FaTimes,
  FaTools,
  FaShieldAlt,
  FaWater,
  FaBlender,
  FaCarSide,
  FaWrench
} from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaAct] = useState("todos");
  const [menuAbierto, setMenuAbierto] = useState(false);

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

  const productosFiltrados = categoriaAct === "todos" 
    ? productos 
    : productos.filter(p => p.categoria === categoriaAct);

  // === CARRITO (sin cambios) ===
  const agregarAlCarrito = (producto) => { /* ... igual que antes ... */ };
  const cambiarCantidad = (id, delta) => { /* ... igual ... */ };
  const eliminarDelCarrito = (id) => { /* ... igual ... */ };
  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let msg = `*¡Hola Aceros y Lujos!* \n\nQuiero cotizar:\n\n`;
    carrito.forEach(i => {
      msg += `• ${i.nombre} x${i.cantidad} → $${(i.precio*i.cantidad).toLocaleString()} COP\n`;
    });
    msg += `\n*TOTAL: $${total.toLocaleString()} COP*\n¡Gracias!`;
    window.open(`https://wa.me/573001704587?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {/* BOTÓN MENÚ FIJO */}
      <button
        onClick={() => setMenuAbierto(true)}
        className="fixed top-20 left-4 bg-green-700 text-white p-4 rounded-full shadow-2xl z-50 md:hidden"
      >
        <FaBars size={24} />
      </button>

      {/* MENÚ LATERAL DESPLEGABLE */}
      <AnimatePresence>
        {menuAbierto && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuAbierto(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Panel lateral */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-green-800 to-green-900 text-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <img src="/logo.jpg" alt="Logo" className="h-12" />
                  <button onClick={() => setMenuAbierto(false)}>
                    <FaTimes size={28} />
                  </button>
                </div>

                <h3 className="text-xl font-bold mb-6">Categorías</h3>

                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoriaAct(cat.id);
                      setMenuAbierto(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                      categoriaAct === cat.id
                        ? "bg-white text-green-800 shadow-lg scale-105"
                        : "hover:bg-white/20"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium text-left flex-1">{cat.nombre}</span>
                    {categoriaAct === cat.id && <span>Check</span>}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-white/20 mt-8">
                <p className="text-sm opacity-90">Aceros y Lujos</p>
                <p className="text-xs opacity-70 mt-1">Soledad, Atlántico</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER FIJO EN ESCRITORIO */}
      <div className="hidden md:block sticky top-0 z-30 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logo.jpg" alt="Logo" className="h-14" />
          <div className="flex gap-4">
            {categorias.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAct(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  categoriaAct === cat.id
                    ? "bg-green-700 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
            <button className="px-5 py-2 font-bold text-green-700">+ Más</button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
        <div className="text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black text-green-800 mb-4"
          >
            ACEROS Y LUJOS
          </motion.h1>
          <p className="text-xl md:text-3xl text-gray-700 mb-8">Accesorios Inoxidables Premium</p>
          <button
            onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green-700 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-green-800 transition shadow-2xl"
          >
            Ver Catálogo
          </button>
        </div>
      </section>

      {/* PRODUCTOS - GRID COMPACTO */}
      <section id="productos" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center text-green-800 mb-10">
            {categorias.find(c => c.id === categoriaAct)?.nombre}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {productosFiltrados.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                onClick={() => agregarAlCarrito(p)}
              >
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.nombre} className="w-full h-40 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm line-clamp-2 mb-2">{p.nombre}</h3>
                  <p className="text-green-700 font-black text-lg">${p.precio.toLocaleString()}</p>
                  <span className="text-xs text-gray-500 block mt-1">Toca para añadir</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTÓN CARRITO Y MODAL (igual que antes, solo más bonito) */}
      <button
        onClick={() => setCarritoAbierto(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-5 rounded-full shadow-2xl z-40"
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
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end"
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
              <h3 className="text-2xl font-black text-green-700 mb-4 text-center">
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
                        <p className="text-green-700 font-bold text-lg">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => cambiarCantidad(item.id, -1)}
                            className="bg-gray-200 p-2 rounded"
                          >
                            <FaMinus />
                          </button>
                          <span className="font-bold w-8 text-center">{item.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidad(item.id, 1)}
                            className="bg-green-700 text-white p-2 rounded"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-red-600 mt-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-5 pt-4 border-t text-xl font-black flex justify-between">
                    <span>Total:</span>
                    <span className="text-green-700">${total.toLocaleString()} COP</span>
                  </div>

                  <button
                    onClick={enviarAWhatsApp}
                    className="w-full bg-green-700 text-white font-bold py-4 rounded-full mt-5 flex items-center justify-center gap-3 text-lg"
                  >
                    <FaWhatsapp size={26} /> Enviar Pedido por WhatsApp
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-10 bg-black text-white text-center">
        © 2025 Aceros y Lujos • Hecho con pasión en Colombia
      </footer>
    </>
  );
}

export default App;