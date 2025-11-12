import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            NUESTROS BLANKS
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Descubre nuestra colección completa de blanks premium, perfectos para personalización
            con las mejores técnicas de impresión del mercado.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 9).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-printy-white border border-printy-stone hover:border-printy-military transition-colors focus-ring"
              >
                <div className="aspect-square bg-printy-stone relative overflow-hidden">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-printy-carbon font-body">
                      {product.name} - {product.color}
                    </span>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-printy-military/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-printy-military font-league-spartan uppercase tracking-wider text-sm">
                      Ver Detalles
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading-sm text-printy-black mb-1">
                    {product.reference}
                  </h3>
                  <p className="font-body-sm text-printy-carbon mb-2">
                    {product.name}
                  </p>
                  <p className="font-body-sm text-printy-military">
                    {product.color}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading-md text-printy-black mb-4">
            ¿NO ENCUENTRAS LO QUE BUSCAS?
          </h2>
          <p className="font-body text-printy-carbon mb-6">
            Contáctanos para productos personalizados o volúmenes especiales.
            Tenemos opciones adicionales disponibles bajo pedido.
          </p>
          <Link
            href="/apply"
            className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
          >
            Solicitar Cotización Personalizada
          </Link>
        </div>
      </section>
    </main>
  );
}