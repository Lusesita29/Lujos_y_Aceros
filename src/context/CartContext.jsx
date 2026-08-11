import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) {
        return prev.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setCarritoAbierto(true); // feedback inmediato al agregar
  };

  const cambiarCantidad = (id, delta) =>
    setCarrito(prev =>
      prev.map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i)
    );

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(i => i.id !== id));

  const vaciarCarrito = () => setCarrito([]);

  const total = useMemo(() => carrito.reduce((s, i) => s + i.precio * i.cantidad, 0), [carrito]);
  const totalProductos = useMemo(() => carrito.reduce((s, i) => s + i.cantidad, 0), [carrito]);

  const enviarAWhatsApp = (numeroWhatsApp = "573005968323") => {
    if (!carrito.length) return;
    let msg = `*¡Hola Aceros y Lujos!*\n\nQuiero cotizar:\n\n`;
    carrito.forEach(i => {
      msg += `• ${i.nombre}\n  Cantidad: ${i.cantidad} → $${(i.precio * i.cantidad).toLocaleString()} COP\n\n`;
    });
    msg += `─────────────────\n*TOTAL: $${total.toLocaleString()} COP*\n\n¡Gracias!`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const value = {
    carrito, carritoAbierto, setCarritoAbierto,
    agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito,
    total, totalProductos, enviarAWhatsApp,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
