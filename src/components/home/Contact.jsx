import { FaWhatsapp } from 'react-icons/fa';

export default function Contact({ numero = "573005968323", mensaje = "Hola, quiero información sobre sus accesorios" }) {
  return (
    <section id="contacto" style={{ padding: '64px 24px', background: '#111', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 16 }}>
          <span style={{ color: 'rgb(8,255,8)' }}>Contáctanos</span>
        </h2>
        <p style={{ color: '#aaa', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: 32 }}>
          ¿Tienes alguna pregunta? Escríbenos por WhatsApp y con gusto te atendemos.
        </p>
        <a
          href={`https://wa.me/${numero}`}
          target="_blank" rel="noopener noreferrer"
          className="glow-button"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgb(8,255,8)', color: '#000', fontWeight: 800,
            padding: '16px 36px', borderRadius: 50, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            textDecoration: 'none',
          }}
        >
          <FaWhatsapp size={24} /> Escribir al WhatsApp
        </a>
        <p style={{ color: '#555', marginTop: 24, fontSize: 13 }}>📍 Soledad, Atlántico, Colombia</p>
      </div>
    </section>
  );
}
