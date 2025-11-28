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
    if (temaOscuro) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [temaOscuro]);

  const toggleTema = () => setTemaOscuro(prev => !prev);

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
    { id: "todos", nombre: "Todos", icon: <FaTools /> },
    { id: "retrovisores y regletas", nombre: "Retrovisores", icon: <FaCarSide /> },
    { id: "defensas", nombre: "Defensas", icon: <FaShieldAlt /> },
    { id: "guardabarros", nombre: "Guardabarros", icon: <FaShieldAlt /> },
    { id: "baberos", nombre: "Baberos", icon: <FaWrench /> },
    { id: "mofles", nombre: "Mofles", icon: <FaTools /> },
    { id: "estribos", nombre: "Estribos", icon: <FaTools /> },
    { id: "tanques", nombre: "Tanques", icon: <FaWater /> },
    { id: "portalicuadora", nombre: "Porta Licuadora", icon: <FaBlender /> },
  ];

  const productosFiltrados = categoriaActiva === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) return prev.map(i => i.id === producto.id ? {...i, cantidad: i.cantidad + 1} : i);
      return [...prev, {...producto, cantidad: 1}];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev
      .map(i => i.id === id ? {...i, cantidad: Math.max(1, i.cantidad + delta)} : i)
      .filter(i => i.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(i => i.id !== id));

  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);

  const enviarAWhatsApp = () => {
    if (carrito.length === 0) return;
    let msg = `*¡Hola Aceros y Lujos!* \n\nCotización:\n\n`;
    carrito.forEach(i => {
      msg += `• ${i.nombre} ×${i.cantidad} → $${(i.precio*i.cantidad).toLocaleString()} COP\n`;
    });
    msg += `\n*TOTAL: $${total.toLocaleString()} COP*\n¡Gracias!`;
    window.open(`https://wa.me/573001704587?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${temaOscuro ? "dark bg-black" : "bg-gray-100"}`}>

      {/* LOGO FIJO EN LA ESQUINA SUPERIOR IZQUIERDA */}
      <div className="fixed top-4 left-4 z-50 pointer-events-none">
        <img src="/logo.jpg" alt="Aceros y Lujos" className="h-14 drop-shadow-2xl pointer-events-auto" />
      </div>

      {/* BOTONES MÓVIL: MENÚ + TEMA */}
      <div className="fixed top-4 right-4 flex gap-3 z-50 md:hidden">
        <button onClick={toggleTema} className="bg-black/20 backdrop-blur-lg p-3.5 rounded-full shadow-xl">
          {temaOscuro ? <FaSun className="text-yellow-300" size={22} /> : <FaMoon className="text-white" size={22} />}
        </button>
        <button onClick={() => setMenuAbierto(true)} className="bg-black/20 backdrop-blur-lg p-3.5 rounded-full shadow-xl">
          <FaBars className="text-white" size={24} />
        </button>
      </div>

      {/* MENÚ LATERAL MÓVIL */}
      <AnimatePresence>
        {menuAbierto && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 bg-black/80 z-40" onClick={() => setMenuAbierto(false)} />
            <motion.div initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}}
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-black to-zinc-900 text-white z-50 p-6 overflow-y-auto">
              <div className="flex justify-end mb-8">
                <button onClick={() => setMenuAbierto(false)}><FaTimes size={30} /></button>
              </div>
              {categorias.map(cat => (
                <button key={cat.id} onClick={() => {setCategoriaActiva(cat.id); setMenuAbierto(false);}}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl mb-3 text-lg font-medium transition-all ${
                    categoriaActiva === cat.id ? "bg-gradient-to-r from-lime-500 to-green-500 shadow-2xl shadow-lime-500/50" : "hover:bg-white/10"
                  }`}>
                  <span className="text-2xl">{cat.icon}</span>
                  <span>{cat.nombre}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER ESCRITORIO */}
      <header className="hidden md:flex sticky top-0 z-40 bg-gradient-to-r from-black via-black/95 to-black/90 backdrop-blur-xl shadow-2xl px-8 py-5 items-center justify-center">
        <nav className="flex gap-8">
          {categorias.map(cat => (
            <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
              className={`font-bold text-lg transition-all ${
                categoriaActiva === cat.id 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500 drop-shadow-lg" 
                  : "text-gray-300 hover:text-white"
              }`}>
              {cat.nombre}
            </button>
          ))}
          <button onClick={toggleTema} className="ml-8">
            {temaOscuro ? <FaSun className="text-yellow-300" size={26} /> : <FaMoon className="text-gray-400" size={26} />}
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-500 to-cyan-400 drop-shadow-2xl mb-6"
          style={{ textShadow: '0 0 40px rgba(0,255,100,0.8)' }}
        >
          ACEROS Y LUJOS
        </motion.h1>
        <p className="text-2xl md:text-4xl text-white font-bold mb-12 drop-shadow-2xl">
          Accesorios Inoxidables Premium
        </p>
        <button
          onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          className="relative px-12 py-6 bg-gradient-to-r from-lime-500 to-green-500 text-black font-black font-bold text-2xl rounded-full shadow-2xl shadow-lime-500/50 hover:shadow-lime-400/80 hover:scale-105 transition-all"
        >
          VER CATÁLOGO
        </button>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-20 px-6 bg-black/95">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
            {categorias.find(c => c.id === categoriaActiva)?.nombre}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {productosFiltrados.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => agregarAlCarrito(prod)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img src={prod.img} alt={prod.nombre} className="w-full h-64 object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-2xl">{prod.nombre}</h3>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
                      ${prod.precio.toLocaleString()} COP
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTÓN CARRITO FIJO */}
      <button
        onClick={() => setCarritoAbierto(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-lime-500 to-green-500 text-black p-6 rounded-full shadow-2xl shadow-lime-500/60 z-40 hover:shadow-lime-400/100 hover:scale-110 transition-all"
      >
        <FaShoppingCart size={32} />
        {totalItems > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center animate-pulse shadow-lg">
            {totalItems}
          </span>
        )}
      </button>

      {/* MODAL CARRITO */}
      <AnimatePresence>
        {carritoAbierto && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/90 z-50 flex items-end" onClick={() => setCarritoAbierto(false)}>
            <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}
              className="bg-gradient-to-b from-zinc-900 to-black w-full max-w-lg mx-auto rounded-t-3xl p-8 max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500 mb-8">
                MI PEDIDO ({totalItems})
              </h3>
              {carrito.length === 0 ? (
                <p className="text-center text-gray-400 text-xl py-20">Carrito vacío</p>
              ) : (
                <>
                  {carrito.map(item => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-800">
                      <img src={item.img} alt={item.nombre} className="w-24 h-24 object-cover rounded-2xl" />
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{item.nombre}</h4>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500 font-black text-xl">
                          ${(item.precio * item.cantidad).toLocaleString()} COP
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3 mb-3">
                          <button onClick={() => cambiarCantidad(item.id, -1)} className="bg-gray-800 p-2 rounded-lg"><FaMinus /></button>
                          <span className="text-white font-bold text-xl w-12">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} className="bg-gradient-to-r from-lime-500 to-green-500 p-2 rounded-lg"><FaPlus /></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-500"><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                  <div className="text-3xl font-black text-white text-right mb-8">
                    TOTAL: <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">${total.toLocaleString()} COP</span>
                  </div>
                  <button onClick={enviarAWhatsApp}
                    className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-black font-black text-xl py-5 rounded-3xl shadow-2xl shadow-lime-500/60 hover:shadow-lime-400/100 transition-all">
                    <FaWhatsapp className="inline mr-3" size={32} /> ENVIAR POR WHATSAPP
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 bg-black text-center text-gray-400">
        © 2025 Aceros y Lujos • Soledad, Colombia
      </footer>
    </div>
  );
}

export default App;