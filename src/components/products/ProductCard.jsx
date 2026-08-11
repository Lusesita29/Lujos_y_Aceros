import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ producto, index = 0 }) {
  const { agregarAlCarrito } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      style={{
        background: '#fff', borderRadius: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'transform .2s, box-shadow .2s',
        display: 'flex', flexDirection: 'column',
      }}
      whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.16)' }}
    >
      <Link to={`/producto/${producto.id}`} style={{ display: 'block' }}>
        <img src={producto.img} alt={producto.nombre}
          style={{ width: '100%', height: 'clamp(120px, 28vw, 170px)', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
      </Link>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: 'clamp(0.78rem, 2.6vw, 0.9rem)', fontWeight: 700, color: '#111', marginBottom: 6,
            minHeight: '2.6em', lineHeight: '1.3em',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {producto.nombre}
          </h3>
        </Link>

        <p style={{
          fontSize: 'clamp(0.92rem, 3vw, 1.05rem)', fontWeight: 900, color: '#000', marginBottom: 10,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          ${producto.precio.toLocaleString()} COP
        </p>

        <button
          onClick={() => agregarAlCarrito(producto)}
          className="glow-button"
          style={{
            marginTop: 'auto', width: '100%',
            background: 'rgb(8,255,8)', color: '#000', fontWeight: 700,
            padding: '11px 0', borderRadius: 8, border: 'none',
            fontSize: 'clamp(0.78rem, 2.2vw, 0.88rem)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background .15s', flexShrink: 0,
          }}
        >
          <FaShoppingCart /> Añadir
        </button>
      </div>
    </motion.div>
  );
}
