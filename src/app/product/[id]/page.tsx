import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/firestore';
import { Product } from '@/types';
import { products as staticProducts } from '@/data/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Static params for build time (using static data)
export function generateStaticParams() {
  return staticProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: Product | null = null;

  try {
    product = await getProductById(params.id);
  } catch (error) {
    console.error('Error loading product from Firestore:', error);
    // Fallback to static data
    const staticProduct = staticProducts.find(p => p.id === params.id);
    if (staticProduct) {
      product = {
        ...staticProduct,
        basePrice: 15000,
        available: true,
        maxDiscountPercent: 10,
      };
    }
  }

  if (!product) {
    // Final fallback to static data
    const staticProduct = staticProducts.find(p => p.id === params.id);
    if (staticProduct) {
      product = {
        ...staticProduct,
        basePrice: 15000,
        available: true,
        maxDiscountPercent: 10,
      };
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-8 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/shop"
            className="text-printy-military font-league-spartan uppercase tracking-wider text-sm hover:underline focus-ring"
          >
            ← Volver al Catálogo
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-printy-stone rounded-lg flex items-center justify-center overflow-hidden">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-printy-carbon font-body">
                    Imagen Principal - {product.name}
                  </span>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-printy-stone rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={image}
                        alt={`Vista ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading-lg text-printy-black mb-2">
                  {product.name}
                </h1>
                <p className="font-body text-printy-carbon mb-4">
                  {product.reference} • {product.color}
                </p>
                {product.description && (
                  <p className="font-body text-printy-carbon">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-printy-smoke p-6 rounded-lg">
                <h2 className="font-heading-md text-printy-black mb-4">
                  ESPECIFICACIONES
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body-sm text-printy-carbon">Fit:</span>
                    <span className="font-body-sm text-printy-black capitalize">{product.fit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-sm text-printy-carbon">Material:</span>
                    <span className="font-body-sm text-printy-black">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-sm text-printy-carbon">Peso:</span>
                    <span className="font-body-sm text-printy-black">{product.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-sm text-printy-carbon">Precio base:</span>
                    <span className="font-body-sm text-printy-black font-bold">
                      ${product.basePrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-heading-sm text-printy-black mb-3">
                    CARACTERÍSTICAS
                  </h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="font-body-sm text-printy-carbon flex items-center">
                        <span className="text-printy-military mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Chart */}
              {product.sizeChart && product.sizeChart.length > 0 && (
                <div>
                  <h3 className="font-heading-sm text-printy-black mb-3">
                    TABLA DE TALLES
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-printy-stone">
                          <th className="text-left py-2 font-body-sm text-printy-carbon">Talle</th>
                          <th className="text-left py-2 font-body-sm text-printy-carbon">Pecho</th>
                          <th className="text-left py-2 font-body-sm text-printy-carbon">Largo</th>
                          <th className="text-left py-2 font-body-sm text-printy-carbon">Manga</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizeChart.map((size) => (
                          <tr key={size.size} className="border-b border-printy-stone/50">
                            <td className="py-2 font-body-sm text-printy-black">{size.size}</td>
                            <td className="py-2 font-body-sm text-printy-black">{size.chest}</td>
                            <td className="py-2 font-body-sm text-printy-black">{size.length}</td>
                            <td className="py-2 font-body-sm text-printy-black">{size.sleeve}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href={`/dashboard/quotes/new?productId=${product.id}`}
                  className={`w-full bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring text-center block ${
                    product.available === false ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {product.available === false ? 'Producto Agotado' : 'Cotizar Este Producto'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
