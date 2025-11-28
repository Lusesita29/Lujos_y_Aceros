
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaChevronDown } from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [dropdownAbierto, setDropdownAbierto] = useState(false); // Para el menú móvil

  // === PRODUCTOS ===
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

  // === FUNCIONES CARRITO
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
      mensaje += `• ${item.nombre}\n  Cantidad: ${item.cantidad} → $${(item.precio * item.cantidad).toLocaleString()} COP\n\n`;
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
            className="bg-green-700 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-green-800 transition inline-block shadow-xl"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* MENÚ DE CATEGORÍAS - DESKTOP + DROPDOWN MÓVIL */}
      <section id="categorias" className="py-6 bg-gray-100 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4">

          {/* Versión Desktop: Botones horizontales */}
          <div className="hidden md:flex gap-3 overflow-x-auto pb-2 justify-center">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition whitespace-nowrap ${
                  categoriaActiva === cat.id
                    ? "bg-green-700 text-white"
                    : "bg-white text-black hover:bg-green-700 hover:text-white"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* Versión Móvil: Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setDropdownAbierto(!dropdownAbierto)}
              className="w-full bg-white px-6 py-4 rounded-xl font-bold flex items-center justify-between shadow-md"
            >
              {categorias.find(c => c.id === categoriaActiva)?.nombre || "Selecciona categoría"}
              <FaChevronDown className={`transition ${dropdownAbierto ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownAbierto && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl mt-2 overflow-hidden z-40"
                >
                  {categorias.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoriaActiva(cat.id);
                        setDropdownAbierto(false);
                      }}
                      className="w-full text-left px-6 py-4 hover:bg-green-100 transition font-medium"
                    >
                      {cat.nombre}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl text-center mb-10 font-black text-green-800">
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
                <img
                  src={prod.img}
                  alt={prod.nombre}
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-black line-clamp-2">
                    {prod.nombre}
                  </h3>
                  <p className="text-green-700 text-lg sm:text-xl font-black mt-2">
                    ${prod.precio.toLocaleString()} COP
                  </p>
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="w-full bg-green-700 text-white font-bold py-2.5 mt-3 rounded-lg text-sm hover:bg-green-800 transition flex items-center justify-center gap-2"
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
        className="fixed bottom-20 right-5 bg-green-700 text-white p-5 rounded-full shadow-2xl z-40 hover:bg-green-800 transition"
      >
        <FaShoppingCart size={26} />
        {totalProductos > 0 && (
          <span className="absolute -top-3 -right-3 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
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

      <footer className="py-8 bg-black text-white text-center text-sm">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </>
  );
}

export default App;