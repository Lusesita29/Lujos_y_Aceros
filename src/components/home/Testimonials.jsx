import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonios" style={{ padding: "64px 24px", background: "#f3f4f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            color: "#111",
          }}
        >
          Lo que dicen nuestros <span style={{ color: "rgb(8,180,8)" }}>clientes</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: 24,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FaQuoteLeft color="rgb(8,255,8)" size={22} style={{ marginBottom: 12 }} />
              <p style={{ color: "#333", fontSize: 14.5, lineHeight: 1.7, marginBottom: 18, flex: 1 }}>
                {t.texto}
              </p>
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {Array.from({ length: t.estrellas }).map((_, idx) => (
                  <FaStar key={idx} color="#f5b301" size={14} />
                ))}
              </div>
              <p style={{ fontWeight: 800, color: "#111", fontSize: 14 }}>{t.nombre}</p>
              <p style={{ color: "#888", fontSize: 12.5 }}>{t.ciudad}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}