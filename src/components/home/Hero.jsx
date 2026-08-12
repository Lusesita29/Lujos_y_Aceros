import { motion } from 'framer-motion';
import logo from '../../assets/logo.jpg';

export default function Hero({ onVerProductos }) {
  return (
    <section style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '24px', background: '#fefefe', color: '#fff',
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
          fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 900,
          letterSpacing: '0.02em', maxWidth: 900,
        }}
      >
        ACCESORIOS <span style={{ color: '#08b408' }}>INOXIDABLES</span> PREMIUM
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{ marginTop: 16, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#ccc' }}
      >
        Diseñados para destacar. Fabricados para durar.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{ marginTop: 10, maxWidth: 560, color: '#999', fontSize: '0.95rem', lineHeight: 1.6 }}
      >
        Calidad y diseño en cada pieza. Accesorios premium para transformar la apariencia y funcionalidad de tu vehículo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button
          onClick={onVerProductos}
          className="glow-button"
          style={{
            background: '#08b408', color: '#000', fontWeight: 800,
            padding: '14px 32px', borderRadius: 999, border: 'none',
            fontSize: '0.9rem', letterSpacing: '0.04em', cursor: 'pointer',
          }}
        >
          VER PRODUCTOS
        </button>

        <a
          href="#contacto"
          style={{
            border: '1.5px solid #fff', color: '#fff', fontWeight: 700,
            padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
            fontSize: '0.9rem', letterSpacing: '0.04em', transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
        >
          COTIZAR
        </a>
      </motion.div>
    </section>
  );
}