import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    carrito, carritoAbierto, setCarritoAbierto,
    cambiarCantidad, eliminarDelCarrito, total, totalProductos, enviarAWhatsApp,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = carritoAbierto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [carritoAbierto]);

  return (
    <AnimatePresence>
      {carritoAbierto && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setCarritoAbierto(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', width: '100%', maxWidth: 520,
              borderRadius: '24px 24px 0 0', padding: '24px 20px',
              maxHeight: '82vh', overflowY: 'auto',
            }}
          >
            <div style={{ width: 40, height: 4, background: '#ddd', borderRadius: 4, margin: '0 auto 20px' }} />

            <h3 style={{
              textAlign: 'center', fontWeight: 900, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: 'rgb(8,255,8)', marginBottom: 20, textShadow: '0 0 15px rgba(8,255,8,0.7)',
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
                    display: 'flex', gap: 12, marginBottom: 20, paddingBottom: 20,
                    borderBottom: '1px solid #eee', alignItems: 'flex-start',
                  }}>
                    <img src={item.img} alt={item.nombre}
                      style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: 600, fontSize: 13, color: '#222', marginBottom: 4,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
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
                  onClick={() => enviarAWhatsApp()}
                  className="glow-button"
                  style={{
                    width: '100%', background: 'rgb(8,255,8)', color: '#000',
                    fontWeight: 800, padding: '16px', borderRadius: 50, border: 'none',
                    fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 16,
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
  );
}
