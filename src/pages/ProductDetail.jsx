import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaWhatsapp, FaChevronLeft, FaCheckCircle } from 'react-icons/fa';
import { productos } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const producto = productos.find(p => String(p.id) === id);

  // Galería: si el producto solo tiene una imagen, la repetimos como placeholder
  // de galería — reemplaza esto por un array real de fotos cuando las tengan (ej: producto.imagenes)
  const galeria = producto?.imagenes?.length ? producto.imagenes : [producto?.img];
  const [imagenActiva, setImagenActiva] = useState(0);

  if (!producto) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 16 }}>No encontramos ese producto.</p>
        <Link to="/" style={{ color: 'rgb(8,180,8)', fontWeight: 700, textDecoration: 'none' }}>← Volver al catálogo</Link>
      </div>
    );
  }

  const mensajeWhatsApp = `Hola, quiero cotizar el producto "${producto.nombre}" (Ref: ${producto.referencia}), cantidad: ${cantidad}`;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 64px' }}>
      <Link to="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: '#555', fontSize: 13, fontWeight: 700, textDecoration: 'none', marginBottom: 24,
      }}>
        <FaChevronLeft size={11} /> Volver al catálogo
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)',
        gap: 40,
      }} className="product-detail-grid">

        {/* Galería */}
        <div>
          <motion.img
            key={imagenActiva}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            src={galeria[imagenActiva]} alt={producto.nombre}
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 16, background: '#eee' }}
          />
          {galeria.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {galeria.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImagenActiva(i)}
                  style={{
                    border: i === imagenActiva ? '2px solid rgb(8,180,8)' : '2px solid transparent',
                    borderRadius: 10, padding: 0, cursor: 'pointer', overflow: 'hidden', background: 'none',
                  }}
                >
                  <img src={img} alt="" style={{ width: 64, height: 64, objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p style={{ color: '#888', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Ref: {producto.referencia}
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900, color: '#111', marginBottom: 12 }}>
            {producto.nombre}
          </h1>
          <p style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 900, color: 'rgb(8,180,8)', marginBottom: 20 }}>
            ${producto.precio.toLocaleString()} COP
          </p>

          <p style={{ color: '#444', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            {producto.descripcion}
          </p>

          {/* Especificaciones */}
          <div style={{ background: '#f7f7f7', borderRadius: 12, padding: 18, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Especificaciones
            </h3>
            <SpecRow label="Material" value={producto.material} />
            <SpecRow label="Categoría" value={producto.categoria} />
            {producto.vehiculos?.length > 0 && (
              <SpecRow
                label="Compatibilidad"
                value={producto.vehiculos.map(v => `${v.marca} ${v.modelo}`).join(', ')}
              />
            )}
            {!producto.vehiculos?.length && <SpecRow label="Compatibilidad" value="Universal" />}
          </div>

          <ul style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {["Fabricación nacional en Colombia", "Acero inoxidable de alta durabilidad", "Garantía por defectos de fabricación"].map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#333' }}>
                <FaCheckCircle color="rgb(8,180,8)" size={14} /> {f}
              </li>
            ))}
          </ul>

          {/* Cantidad + acciones */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>Cantidad:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 8 }}>
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))} style={qtyBtn}>−</button>
              <span style={{ width: 36, textAlign: 'center', fontWeight: 700 }}>{cantidad}</span>
              <button onClick={() => setCantidad(c => c + 1)} style={qtyBtn}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => { for (let i = 0; i < cantidad; i++) agregarAlCarrito(producto); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgb(8,255,8)', color: '#000', fontWeight: 800,
                padding: '14px', borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: 15,
              }}
            >
              <FaShoppingCart /> Añadir al carrito
            </button>
            <a
              href={`https://wa.me/573005968323?text=${encodeURIComponent(mensajeWhatsApp)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#25D366', color: '#fff', fontWeight: 800,
                padding: '14px', borderRadius: 50, textDecoration: 'none', fontSize: 15,
              }}
            >
              <FaWhatsapp size={18} /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #e8e8e8', fontSize: 13.5 }}>
      <span style={{ color: '#888', textTransform: 'capitalize' }}>{label}</span>
      <span style={{ color: '#222', fontWeight: 600, textAlign: 'right', textTransform: 'capitalize' }}>{value}</span>
    </div>
  );
}

const qtyBtn = {
  width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer',
  fontSize: 18, fontWeight: 700, color: '#333',
};
