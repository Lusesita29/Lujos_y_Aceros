import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: 'calc(100vh - 64px)',
      background: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <img src="/logo.jpg" alt="Aceros y Lujos"
          style={{ width: 'min(280px, 60vw)', marginBottom: 24, borderRadius: 12, objectFit: 'cover', display: 'block', margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)', fontWeight: 900, color: '#000', marginBottom: 12, lineHeight: 1.1 }}>
          INOXIDABLES
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#555', marginBottom: 28 }}>
          Accesorios Premium para Camiones
        </p>
        <a href="#productos" className="glow-button" style={{
          display: 'inline-block',
          background: 'rgb(8,255,8)', color: '#000', fontWeight: 800,
          padding: '16px 40px', borderRadius: 50, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          textDecoration: 'none', transition: 'background .2s, transform .2s',
        }}>
          Ver Catálogo
        </a>
      </motion.div>
    </section>
  );
}
