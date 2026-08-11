const photos = [
  "/assets/gallery1.jpg",
  "/assets/gallery2.jpg",
  "/assets/gallery3.jpg",
];

export default function Gallery() {
  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        NUESTROS PRODUCTOS EN ACCIÓN
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Producto en acción ${i + 1}`}
            className="w-full h-64 object-cover rounded-xl shadow"
          />
        ))}
      </div>
    </section>
  );
}