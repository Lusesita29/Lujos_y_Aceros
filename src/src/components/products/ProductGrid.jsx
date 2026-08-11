import ProductCard from './ProductCard';
import { productos, categorias } from '../../data/products';

export default function ProductGrid({ categoriaActiva }) {
  const productosFiltrados = categoriaActiva === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  const nombreCategoria = categoriaActiva === "todos"
    ? "Todos los Productos"
    : categorias.find(c => c.id === categoriaActiva)?.nombre;

  return (
    <section id="productos" style={{ padding: '48px 0', background: '#f3f4f6' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 36, fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#111' }}>
          {nombreCategoria}
        </h2>

        {productosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No hay productos en esta categoría todavía.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 45vw), 1fr))',
            gap: 16,
          }}>
            {productosFiltrados.map((prod, i) => (
              <ProductCard key={prod.id} producto={prod} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
