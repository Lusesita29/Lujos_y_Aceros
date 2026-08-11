const features = [
  {
    icon: "⚙️",
    title: "FABRICACIÓN",
    desc: "Cada pieza es elaborada con atención al detalle.",
  },
  {
    icon: "🛡️",
    title: "RESISTENCIA",
    desc: "Materiales seleccionados para ofrecer durabilidad.",
  },
  {
    icon: "✨",
    title: "ACABADO",
    desc: "Terminaciones diseñadas para destacar visualmente.",
  },
  {
    icon: "🎯",
    title: "PRECISIÓN",
    desc: "Diseños pensados para adaptarse a cada vehículo.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        ¿Qué hace premium a nuestros productos?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-semibold mb-2 tracking-wide">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}