import { motion } from 'framer-motion';

const stats = [
  { number: "+10", label: "AÑOS" },
  { number: "+500", label: "CLIENTES" },
  { number: "+100", label: "PRODUCTOS" },
];

export default function Stats() {
  return (
    <section style={{
      padding: '48px 24px', background: '#000',
      borderTop: '1px solid #222', borderBottom: '1px solid #222',
    }}>
      <div style={{
        maxWidth: 720, margin: '0 auto', display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center',
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <p style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900, color: '#08b408' }}>
              {s.number}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#999', letterSpacing: '0.08em', marginTop: 4 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}