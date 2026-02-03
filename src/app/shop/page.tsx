'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { getProducts } from '@/lib/firestore';
import { products as staticProducts } from '@/data/products';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      if (data.length > 0) {
        setProducts(data);
      } else {
        // Fallback to static data
        setProducts(staticProducts.map(p => ({
          ...p,
          basePrice: 15000,
          available: true,
          maxDiscountPercent: 10,
        })));
        setUseStatic(true);
      }
    } catch (error) {
      console.error('Error loading products, using static data:', error);
      // Use static data as fallback
      setProducts(staticProducts.map(p => ({
        ...p,
        basePrice: 15000,
        available: true,
        maxDiscountPercent: 10,
      })));
      setUseStatic(true);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'tshirt', name: 'T-Shirts' },
    { id: 'hoodie', name: 'Hoodies' },
    { id: 'tank', name: 'Tank Tops' },
    { id: 'sweatshirt', name: 'Sweatshirts' },
    { id: 'polo', name: 'Polos' },
  ];

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    );
  }

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

      {/* Filters */}
      <section className="py-6 px-6 bg-white border-b border-printy-stone">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors font-body ${
                  filter === cat.id
                    ? 'bg-printy-military text-white'
                    : 'bg-printy-smoke text-printy-carbon hover:bg-printy-stone'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-printy-carbon text-lg">
                No hay productos en esta categoría
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-printy-white border border-printy-stone hover:border-printy-military transition-colors focus-ring"
                >
                  <div className="aspect-square bg-printy-stone relative overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-printy-carbon font-body">
                          {product.name} - {product.color}
                        </span>
                      </div>
                    )}
                    {!product.available && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Agotado
                      </div>
                    )}
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
                    <div className="flex justify-between items-center">
                      <span className="font-body-sm text-printy-military">
                        {product.color}
                      </span>
                      <span className="font-bold text-printy-military">
                        ${product.basePrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
            href="/dashboard/quotes/new"
            className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring inline-block"
          >
            Solicitar Cotización Personalizada
          </Link>
        </div>
      </section>
    </main>
  );
}
