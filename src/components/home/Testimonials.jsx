// src/components/home/Testimonials.jsx
import { testimonios } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">TESTIMONIOS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonios.map((t) => (
          <div key={t.id} className="bg-gray-50 rounded-xl p-6 shadow">
            <div className="text-brand-green mb-3">
              {"★".repeat(t.estrellas)}
            </div>
            <p className="text-gray-600 italic mb-4">"{t.comentario}"</p>
            <p className="font-semibold">{t.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}