import { motion } from 'framer-motion';
import logo from '../../assets/logo.jpg';

export default function Hero({ onVerProductos }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '90vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '24px', background: '#f3f4f6', color: '#111',
      overflow: 'hidden',
    }}>
      {/* Glow decorativo de fondo */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(8,180,8,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(8,180,8,0.35), transparent)',
      }} />

      {/* Logo con fondo circular sutil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          width: 'clamp(150px, 22vw, 220px)', height: 'clamp(150px, 22vw, 220px)',
          borderRadius: '50%', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28, position: 'relative', zIndex: 1,
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={logo}
          alt="Aceros y Lujos"
          style={{ width: '78%', height: '78%', objectFit: 'contain' }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900,
          letterSpacing: '0.01em', maxWidth: 920, lineHeight: 1.1,
          position: 'relative', zIndex: 1, color: '#111',
        }}
      >
        ACCESORIOS <span style={{ color: '#08b408' }}>INOXIDABLES</span> PREMIUM
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          marginTop: 18, fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
          color: '#333', fontWeight: 600, position: 'relative', zIndex: 1,
        }}
      >
        Diseñados para destacar. Fabricados para durar.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          marginTop: 12, maxWidth: 580, color: '#666', fontSize: '0.95rem',
          lineHeight: 1.7, position: 'relative', zIndex: 1,
        }}
      >
        Calidad y diseño en cada pieza. Accesorios premium para transformar la apariencia y funcionalidad de tu vehículo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{
          marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center', position: 'relative', zIndex: 1,
        }}
      >
        <button
          onClick={onVerProductos}
          className="glow-button"
          style={{
            background: '#08b408', color: '#000', fontWeight: 800,
            padding: '15px 36px', borderRadius: 999, border: 'none',
            fontSize: '0.92rem', letterSpacing: '0.04em', cursor: 'pointer',
          }}
        >
          VER PRODUCTOS
        </button>

        <a
          href="#contacto"
          style={{
            border: '1.5px solid #111', color: '#111', fontWeight: 700,
            padding: '15px 36px', borderRadius: 999, textDecoration: 'none',
            fontSize: '0.92rem', letterSpacing: '0.04em', transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}
        >
          COTIZAR
        </a>
      </motion.div>

      {/* Indicador scroll sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 0.8 }, y: { duration: 1.6, repeat: Infinity } }}
        style={{
          position: 'absolute', bottom: 24, fontSize: 12, color: '#999',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}
      >
        ↓ Descubre más
      </motion.div>
    </section>
  );
}