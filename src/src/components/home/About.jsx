export default function About() {
  return (
    <section id="nosotros" style={{ padding: '64px 24px', background: '#000', color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 20 }}>
          Sobre <span style={{ color: 'rgb(8,255,8)' }}>Nosotros</span>
        </h2>
        <p style={{ color: '#ccc', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: 16 }}>
          Somos <strong style={{ color: '#fff' }}>Aceros y Lujos</strong>, especializados en accesorios inoxidables premium para camiones.
          Con años de experiencia en el mercado colombiano, fabricamos y distribuimos productos de la más alta calidad.
        </p>
        <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7 }}>
          Ubicados en Soledad, Atlántico. Cada pieza está diseñada para durar y darle a tu vehículo el estilo que merece.
        </p>
      </div>
    </section>
  );
}
