import { motion } from 'framer-motion';
import logo from '../../assets/logo.jpg';

export default function Hero() {
  return (
    <section style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '24px', background: '#ffffff', color: '#111',
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
        transition={{ duration: 0.6 }}
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
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ marginTop: 16, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#121212' }}
      >
        "Diseñados para destacar. Fabricados para durar."
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <a
          href="#productos"
          className="glow-button"
          style={{
            background: '#08b408', color: '#000', fontWeight: 800,
            padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
            fontSize: '0.9rem', letterSpacing: '0.04em',
          }}
        >
          VER PRODUCTOS
        </a>

        <a
          href="#contacto"
          style={{
            border: '1.5px solid #000', color: '#111111', fontWeight: 700,
            padding: '14px 32px', borderRadius: 999, textDecoration: 'none',
            fontSize: '0.9rem', letterSpacing: '0.04em', transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#08b408'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; }}
        >
          COTIZAR
        </a>
      </motion.div>
    </section>
  );
}