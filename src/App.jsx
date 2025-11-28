import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
} from 'react-icons/fa';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  // === TODOS LOS PRODUCTOS CATEGORIZADOS ===
  const productos = [
    // RETROVISORS Y REGLETAS
    { id: 1, nombre: "Retrovisores Cromados", precio: 850000, img: "/retro.jpg", categoria: "retrovisores y regletas" },
    { id: 2, nombre: "Retrovisor 60 cm", precio: 380000, img: "/retro2.jpg", categoria: "retrovisores y regletas" },
    { id: 3, nombre: "Regleta LED azul", precio: 450000, img: "/retro3.jpg", categoria: "retrovisores y regletas" },

    // DEFENSAS
    { id: 4, nombre: "Defensa Delantera LED", precio: 1950000, img: "/defensa.jpg", categoria: "defensas" },
    { id: 5, nombre: "Defensa Trasera con Luces", precio: 1780000, img: "/defensa2.jpg", categoria: "defensas" },

    // GUARDABARROS Y BABEROS
    { id: 6, nombre: "Guardabarros Inox", precio: 680000, img: "/guarda.jpg", categoria: "guardabarros" },
    { id: 7, nombre: "Babero Inox Personalizado", precio: 720000, img: "/babero.jpg", categoria: "baberos" },

    // MOFLES Y ESTRIBOS
    { id: 8, nombre: "Mofle Escape Cromado 5 pulgadas", precio: 1350000, img: "/mofle.jpg", categoria: "mofles" },
    { id: 9, nombre: "Estribos Laterales Tubulares", precio: 1680000, img: "/estribo.jpg", categoria: "estribos" },

    // TANQUES Y PORTA LICUADORAS
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

  // === FUNCIONES DEL CARRITO ===
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
        .map((item) => item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item)
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
          <img src="/logo.jpg" alt="Aceros y Lujos" className="w-80 md:w-96 mb-8 mx-auto" />
          <h1 className="text-6xl md:text-8xl font-black text-black mb-4">INOXIDABLES</h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-10">Accesorios Premium para Camiones –  imparable en cada kilómetro</p>
          <a href="#categorias" className="bg-green-700 text-white font-bold px-12 py-5 rounded-full text-xl hover:bg-green-800 transition transform hover:scale-105 inline-block shadow-2xl">
            Ver Catálogo
          </a>
        </motion.div>
      </section>

      {/* CATEGORÍAS */}
      <section id="categorias" className="py-16 bg-gray-100 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`px-6 py-3 rounded-full font-bold transition ${
                  categoriaActiva === cat.id
                    ? "bg-green-700 text-white"
                    : "bg-white text-black hover:bg-green-700 hover:text-white"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS FILTRADOS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl text-center mb-16 font-black text-green-800">
            {categoriaActiva === "todos" ? "Todos los Productos" : categorias.find(c => c.id === categoriaActiva)?.nombre}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {productosFiltrados.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition"
              >
                <img src={prod.img} alt={prod.nombre} className="w-full h-80 object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">{prod.nombre}</h3>
                  <p className="text-green-700 text-3xl font-black mb-6">
                    ${prod.precio.toLocaleString()} COP
                  </p>
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="w-full bg-green-700 text-white font-bold py-4 rounded-full hover:bg-green-800 transition flex items-center justify-center gap-3 text-lg"
                  >
                    <FaShoppingCart /> Añadir al Carrito
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTONES FLOTANTES */}
      <button
        onClick={() => setCarritoAbierto(true)}
        className="fixed bottom-24 right-6 bg-green-700 text-white p-5 rounded-full shadow-2xl z-40 hover:bg-green-800 transition"
      >
        <FaShoppingCart size={30} />
        {totalProductos > 0 && (
          <span className="absolute -top-3 -right-3 bg-black text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
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
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end justify-center"
            onClick={() => setCarritoAbierto(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-white w-full max-w-lg rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black text-green-700">Mi Pedido ({totalProductos})</h3>
                <button onClick={() => setCarritoAbierto(false)} className="text-4xl">×</button>
              </div>

              {carrito.length === 0 ? (
                <p className="text-center text-gray-500 py-12 text-xl">Tu carrito está vacío</p>
              ) : (
                <>
                  {carrito.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-4 border-b">
                      <img src={item.img} alt={item.nombre} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-black">{item.nombre}</h4>
                        <p className="text-green-700 font-black text-xl">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => cambiarCantidad(item.id, -1)} className="bg-gray-300 p-2 rounded"><FaMinus /></button>
                          <span className="font-bold text-xl w-10 text-center">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} className="bg-green-700 text-white p-2 rounded"><FaPlus /></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-600"><FaTrash /></button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t-2 border-gray-300">
                    <div className="flex justify-between text-3xl font-black mb-8">
                      <span>Total:</span>
                      <span className="text-green-700">${total.toLocaleString()} COP</span>
                    </div>
                    <button
                      onClick={enviarAWhatsApp}
                      className="w-full bg-green-700 text-white font-bold py-5 rounded-full text-xl hover:bg-green-800 transition flex items-center justify-center gap-4"
                    >
                      <FaWhatsapp size={32} /> Enviar Pedido por WhatsApp
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 bg-black text-white text-center">
        <p className="text-xl">© 2025 <strong className="text-green-600">Aceros y Lujos</strong> • Soledad, Colombia</p>
        <p className="mt-2">Cra 10B #44B 30 • Los mejores accesorios para tu camión</p>
      </footer>
    </>
  );
}

export default App;