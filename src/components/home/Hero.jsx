import { motion } from 'framer-motion';
import logo from '../../assets/logo.jpg';

export default function Hero({ onVerProductos }) {
  return (
    <section style={{
      minHeight: '90vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '24px', background: '#f3f4f6', color: '#111',
    }}>
      <motion.img
        src={logo}
        alt="Aceros y Lujos"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: 'clamp(140px, 20vw, 220px)', marginBottom: 24 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900,
          letterSpacing: '0.01em', maxWidth: 920, lineHeight: 1.1, color: '#111',
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
          color: '#333', fontWeight: 600,
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
          lineHeight: 1.7,
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
          justifyContent: 'center',
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
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', cursor: 'pointer'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111'; }}
        >
          COTIZAR
        </a>
      </motion.div>
    </section>
  );
}