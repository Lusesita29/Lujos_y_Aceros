export default function Footer() {
  return (
    <footer style={{
      padding: '28px 16px', background: '#000', color: '#555',
      textAlign: 'center', fontSize: 13,
      borderTop: '1px solid rgba(8,255,8,0.12)',
    }}>
      © {new Date().getFullYear()} Aceros y Lujos • Soledad, Colombia
    </footer>
  );
}
