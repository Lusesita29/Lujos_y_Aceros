import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton({ numero = "573005968323", mensaje = "Hola, quiero información sobre sus accesorios" }) {
  return (
    <a
      href={`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      style={{
        position: 'fixed',
        bottom: 20, right: 20,
        zIndex: 1500,
        width: 58, height: 58,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.6)',
        animation: 'wa-bounce 2.4s infinite',
      }}
    >
      <FaWhatsapp size={30} color="#fff" />
      <style>{`
        @keyframes wa-bounce {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.08); }
          20% { transform: scale(1); }
        }
      `}</style>
    </a>
  );
}
