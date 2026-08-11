const stats = [
  { number: "+10", label: "AÑOS" },
  { number: "+500", label: "CLIENTES" },
  { number: "+100", label: "PRODUCTOS" },
];

export default function Stats() {
  return (
    <section className="py-12 border-y border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              {s.number}
            </p>
            <p className="text-sm md:text-base text-gray-500 tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}