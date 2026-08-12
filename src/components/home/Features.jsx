import { motion } from 'framer-motion';

const features = [
  { icon: "⚙️", title: "FABRICACIÓN", desc: "Cada pieza es elaborada con atención al detalle." },
  { icon: "🛡️", title: "RESISTENCIA", desc: "Materiales seleccionados para ofrecer durabilidad." },
  { icon: "✨", title: "ACABADO", desc: "Terminaciones diseñadas para destacar visualmente." },
  { icon: "🎯", title: "PRECISIÓN", desc: "Diseños pensados para adaptarse a cada vehículo." },
];

export default function Features() {
  return (
    <section style={{ padding: '64px 24px', background: '#f3f4f6' }}>
      <h2 style={{
        textAlign: 'center', marginBottom: 48, fontWeight: 900,
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#111',
      }}>
        ¿Qué hace <span style={{ color: '#08b408' }}>premium</span> a nuestros productos?
      </h2>

      <div style={{
        maxWidth: 1100, margin: '0 auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32,
      }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontSize: '2rem', marginBottom: 16, width: 64, height: 64,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#000', borderRadius: '50%', margin: '0 auto 16px',
              boxShadow: '0 0 0 3px rgba(8,180,8,0.15)',
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontWeight: 800, marginBottom: 8, letterSpacing: '0.03em', color: '#111', fontSize: '0.95rem' }}>
              {f.title}
            </h3>
            <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}