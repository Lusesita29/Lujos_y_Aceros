/* --- PRECIOS EN NEGRO + VERDE FOSFORESCENTE EN BOTONES --- */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaChevronDown, FaBars } from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  // === PRODUCTOS (igual) ===
  const productos = [ /* ... tus productos ... */ ];

  const categorias = [ /* ... tus categorías ... */ ];

  const productosFiltrados = categoriaActiva === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  // === FUNCIONES CARRITO (igual) ===
  const agregarAlCarrito = (producto) => { /* ... */ };
  const cambiarCantidad = (id, delta) => { /* ... */ };
  const eliminarDelCarrito = (id) => { /* ... */ };
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarAWhatsApp = () => { /* ... */ };

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
            className="bg-[#00ff9d] text-black font-bold px-10 py-5 rounded-full text-lg shadow-2xl 
                       hover:bg-[#00cc7a] transition transform hover:scale-105 glow-button"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* MENÚ (igual que antes - ultra compacto) */}
      <section id="categorias" className="py-3 bg-gray-900 sticky top-0 z-30 shadow-2xl">
        {/* ... código del menú idéntico al anterior ... */}
      </section>

      {/* PRODUCTOS - PRECIO EN NEGRO */}
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
                  
                  {/* PRECIO AHORA EN NEGRO Y MUY LEGIBLE */}
                  <p className="text-black text-xl sm:text-2xl font-black mt-2">
                    ${prod.precio.toLocaleString()} COP
                  </p>

                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="w-full bg-[#00ff9d] text-black font-bold py-2.5 mt-3 rounded-lg text-sm 
                               hover:bg-[#00cc7a] transition glow-button flex items-center justify-center gap-2"
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
        className="fixed bottom-20 right-5 bg-[#00ff9d] text-black p-5 rounded-full shadow-2xl z-40 
                   hover:bg-[#00cc7a] transition transform hover:scale-110 glow-button"
      >
        <FaShoppingCart size={28} />
        {totalProductos > 0 && (
          <span className="absolute -top-3 -right-3 bg-black text-[#00ff9d] rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shadow-lg">
            {totalProductos}
          </span>
        )}
      </button>

      {/* MODAL CARRITO - PRECIOS EN NEGRO */}
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
              <h3 className="text-2xl font-black text-[#00ff9d] mb-4 text-center glow-text">
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
                        
                        {/* PRECIO EN NEGRO EN EL CARRITO */}
                        <p className="text-black font-bold text-lg">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => cambiarCantidad(item.id, -1)} className="bg-gray-200 p-2 rounded"><FaMinus /></button>
                          <span className="font-bold w-8 text-center">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} className="bg-[#00ff9d] text-black p-2 rounded"><FaPlus /></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-600"><FaTrash /></button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-5 pt-4 border-t text-xl font-black flex justify-between">
                    <span>Total:</span>
                    {/* TOTAL TAMBIÉN EN NEGRO PARA MÁXIMA LEGIBILIDAD */}
                    <span className="text-black">${total.toLocaleString()} COP</span>
                  </div>

                  <button
                    onClick={enviarAWhatsApp}
                    className="w-full bg-[#00ff9d] text-black font-bold py-5 rounded-full mt-5 flex items-center justify-center gap-3 text-lg glow-button"
                  >
                    <FaWhatsapp size={28} /> Enviar Pedido por WhatsApp
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EFECTO GLOW SOLO EN BOTONES */}
      <style jsx>{`
        .glow-button {
          box-shadow: 0 0 20px rgba(0, 255, 157, 0.6);
          animation: pulse-glow 2s infinite alternate;
        }
        .glow-text {
          text-shadow: 0 0 15px rgba(0, 255, 157, 0.9);
        }
        @keyframes pulse-glow {
          from { box-shadow: 0 0 15px rgba(0, 255, 157, 0.5); }
          to { box-shadow: 0 0 30px rgba(0, 255, 157, 0.9); }
        }
      `}</style>

      <footer className="py-8 bg-black text-white text-center text-sm">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </>
  );
}

export default App;