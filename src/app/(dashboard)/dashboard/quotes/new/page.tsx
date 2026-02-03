'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useQuote } from '@/contexts/QuoteContext';
import { Product, Quotation } from '@/types';
import { getProducts } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';
import CustomizationForm from '@/components/quote/CustomizationForm';
import QuoteSummary from '@/components/quote/QuoteSummary';
import SizeSelector from '@/components/catalog/SizeSelector';
import toast from 'react-hot-toast';
import { createQuotation } from '@/lib/firestore';

function NewQuoteContent() {
  const searchParams = useSearchParams();
  const { user, firebaseUser } = useAuth();
  const { items, addItem, removeItem, updateSizeBreakdown, addCustomization, clearQuote, getTotalUnits, reset } = useQuote();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deliveryPreference, setDeliveryPreference] = useState<'partial' | 'complete' | null>(null);
  const [showDeliveryOption, setShowDeliveryOption] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const productId = searchParams.get('productId');
    if (productId && products.length > 0) {
      const product = products.find(p => p.id === productId);
      if (product && !items.find(i => i.product.id === productId)) {
        addItem(product);
        setActiveItemIndex(items.length);
      }
    }
  }, [products, searchParams, items]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.filter(p => p.available !== false));
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product: Product) => {
    addItem(product);
    setActiveItemIndex(items.length);
    toast.success(`${product.name} agregado`);
  };

  const handleRemoveItem = (index: number) => {
    removeItem(index);
    if (activeItemIndex === index) {
      setActiveItemIndex(null);
    } else if (activeItemIndex && activeItemIndex > index) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const handleSubmitQuote = async () => {
    if (!firebaseUser) {
      toast.error('Debes iniciar sesión para enviar la cotización');
      return;
    }

    if (items.length === 0) {
      toast.error('Agrega al menos un producto');
      return;
    }

    const totalUnits = getTotalUnits();
    if (totalUnits === 0) {
      toast.error('Selecciona las cantidades por talla');
      return;
    }

    if (totalUnits >= 200 && !deliveryPreference) {
      toast.error('Selecciona tu preferencia de entrega');
      return;
    }

    setSubmitting(true);

    try {
      const quotationItems = items.map(item => {
        const itemUnits = Object.values(item.sizeBreakdown).reduce(
          (sum, qty) => sum + (qty || 0),
          0
        );
        const subtotal = itemUnits * item.product.basePrice +
          item.customizations.reduce((sum, c) => sum + c.subtotal, 0);
        
        return {
          productId: item.product.id,
          productName: item.product.name,
          productColor: item.product.color,
          sizeBreakdown: item.sizeBreakdown,
          customizations: item.customizations,
          subtotal,
          discountPercent: 0,
          discountAmount: 0,
          itemTotal: subtotal,
        };
      });

      const subtotal = quotationItems.reduce((sum, item) => sum + item.itemTotal, 0);
      const ivaAmount = Math.round(subtotal * 0.19);
      const total = subtotal + ivaAmount;
      const estimatedDays = totalUnits >= 200 ? null : 8;

      await createQuotation({
        quotationNumber: `Q-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        clientId: firebaseUser.uid,
        commercialId: null,
        status: 'pending_approval',
        items: quotationItems,
        subtotal,
        ivaPercent: 19,
        ivaAmount,
        total,
        totalUnits,
        estimatedDays,
        requiresCommercialApproval: totalUnits >= 200,
        clientDeliveryPreference: deliveryPreference || undefined,
        deliveryPreferenceConfirmed: totalUnits < 200,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Quotation);

      toast.success('Cotización enviada exitosamente');
      reset();
      window.location.href = '/dashboard/quotes';
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Error al enviar cotización');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const totalUnits = getTotalUnits();
    setShowDeliveryOption(totalUnits >= 200);
  }, [items, getTotalUnits]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-printy-military text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Nueva Cotización</h1>
              <p className="opacity-80">Agrega productos y personalizaciones</p>
            </div>
            <Link
              href="/shop"
              className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Productos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Productos en la cotización */}
            {items.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Productos en tu cotización</h2>
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const units = Object.values(item.sizeBreakdown).reduce(
                      (sum, qty) => sum + (qty || 0),
                      0
                    );
                    const isActive = activeItemIndex === index;

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 transition-colors ${
                          isActive ? 'border-printy-military bg-printy-military/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">
                              {item.product.color} • {units} unidades
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setActiveItemIndex(isActive ? null : index)}
                              className="text-printy-military hover:underline text-sm"
                            >
                              {isActive ? 'Ocultar' : 'Personalizar'}
                            </button>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>

                        {isActive && (
                          <div className="mt-4 pt-4 border-t">
                            {/* Selector de tallas */}
                            <div className="mb-6">
                              <h4 className="font-medium mb-3">1. Selecciona las cantidades por talla</h4>
                              <SizeSelector
                                sizeChart={item.product.sizeChart}
                                value={item.sizeBreakdown}
                                onChange={(breakdown) => updateSizeBreakdown(index, breakdown)}
                                maxTotal={500}
                              />
                            </div>

                            {/* Personalizaciones */}
                            <div>
                              <h4 className="font-medium mb-3">2. Agrega personalizaciones</h4>
                              <CustomizationForm
                                productId={item.product.id}
                                sizeChart={item.product.sizeChart}
                                sizeBreakdown={item.sizeBreakdown}
                                onSizeBreakdownChange={(b) => updateSizeBreakdown(index, b)}
                                onAddCustomization={(c) => addCustomization(index, c)}
                                existingCustomizations={item.customizations}
                                totalUnitsInQuote={getTotalUnits()}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {items.length > 0 && (
                  <button
                    onClick={() => {
                      addItem(products[0]);
                      setActiveItemIndex(items.length);
                    }}
                    className="mt-4 w-full border-2 border-dashed border-gray-300 text-gray-500 py-3 rounded-lg hover:border-printy-military hover:text-printy-military transition-colors"
                  >
                    + Agregar otro producto
                  </button>
                )}
              </div>
            )}

            {/* Catálogo rápido */}
            {items.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Agregar productos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {products.slice(0, 6).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleAddProduct(product)}
                      className="border rounded-lg p-4 text-left hover:border-printy-military transition-colors"
                    >
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.color}</p>
                      <p className="text-sm font-bold text-printy-military mt-2">
                        {formatPrice(product.basePrice)}
                      </p>
                    </button>
                  ))}
                </div>
                <Link
                  href="/shop"
                  className="block mt-4 text-center text-printy-military hover:underline"
                >
                  Ver catálogo completo →
                </Link>
              </div>
            )}
          </div>

          {/* Columna derecha: Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <QuoteSummary
                estimatedDays={getTotalUnits() > 0 ? getTotalUnits() : null}
                showDeliveryOption={showDeliveryOption}
                deliveryPreference={deliveryPreference}
                onDeliveryPreferenceChange={setDeliveryPreference}
              />

              <div className="mt-4 space-y-3">
                <button
                  onClick={handleSubmitQuote}
                  disabled={submitting || items.length === 0 || getTotalUnits() === 0}
                  className="w-full bg-printy-military text-white py-3 rounded-lg font-medium hover:bg-printy-deep-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Enviando...' : 'Enviar Cotización'}
                </button>

                <button
                  onClick={() => {
                    clearQuote();
                    toast.success('Cotización limpiada');
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpiar Cotización
                </button>
              </div>

              {/* Info */}
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Hasta 6 unidades: precio fijo por tamaño</p>
                <p>• +6 unidades: precio por metro lineal</p>
                <p>• IVA: 19%</p>
                <p>• Validez: 30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewQuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    }>
      <NewQuoteContent />
    </Suspense>
  );
}
