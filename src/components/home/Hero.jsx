export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
        ACCESORIOS INOXIDABLES PREMIUM
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300">
        Diseñados para destacar. Fabricados para durar.
      </p>
      <p className="mt-2 max-w-xl text-gray-400">
        Calidad y diseño en cada pieza. Accesorios premium para transformar
        la apariencia y funcionalidad de tu vehículo.
      </p>

      <div className="mt-8 flex gap-4 flex-col sm:flex-row">
        <a
          href="#productos"
          className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
        >
          VER PRODUCTOS
        </a>
        <a
          href="#contacto"
          className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition"
        >
          COTIZAR
        </a>
      </div>
    </section>
  );
}