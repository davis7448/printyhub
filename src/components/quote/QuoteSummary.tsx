'use client';

import { useQuote } from '@/contexts/QuoteContext';
import { formatPrice } from '@/lib/pricing';

interface QuoteSummaryProps {
  ivaPercent?: number;
  estimatedDays?: number | null;
  showDeliveryOption?: boolean;
  deliveryPreference?: 'partial' | 'complete' | null;
  onDeliveryPreferenceChange?: (pref: 'partial' | 'complete') => void;
}

export default function QuoteSummary({
  ivaPercent = 19,
  estimatedDays = null,
  showDeliveryOption = false,
  deliveryPreference = null,
  onDeliveryPreferenceChange,
}: QuoteSummaryProps) {
  const { items, getTotalUnits, getTotalPrice } = useQuote();

  const subtotal = getTotalPrice();
  const totalUnits = getTotalUnits();
  const ivaAmount = Math.round(subtotal * (ivaPercent / 100));
  const total = subtotal + ivaAmount;

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-500">No hay productos en la cotización</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">Resumen de Cotización</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const itemUnits = Object.values(item.sizeBreakdown).reduce(
              (sum, qty) => sum + (qty || 0),
              0
            );
            const itemTotal = itemUnits * item.product.basePrice;

            return (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.product.color} • {itemUnits} unidades
                  </p>
                  {item.customizations.length > 0 && (
                    <p className="text-sm text-printy-military">
                      + {item.customizations.length} personalización(es)
                    </p>
                  )}
                </div>
                <span className="font-medium">{formatPrice(itemTotal)}</span>
              </div>
            );
          })}
        </div>

        {/* Subtotal */}
        <div className="border-t pt-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({totalUnits} unidades)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* IVA */}
        <div className="flex justify-between text-gray-600">
          <span>IVA ({ivaPercent}%)</span>
          <span>{formatPrice(ivaAmount)}</span>
        </div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between font-bold text-xl text-gray-900">
            <span>Total</span>
            <span className="text-printy-military">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Tiempo de entrega */}
        {estimatedDays !== null && estimatedDays !== undefined && (
          <div className="bg-printy-smoke p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Tiempo de entrega estimado:</span>{' '}
              {totalUnits >= 200 ? (
                <span>A definir por el comercial</span>
              ) : (
                <span>8-15 días hábiles después del pago</span>
              )}
            </p>
          </div>
        )}

        {/* Opción de entregas parciales */}
        {showDeliveryOption && totalUnits >= 200 && (
          <div className="bg-printy-smoke p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Preferencias de entrega:
            </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryPreference === 'partial'}
                  onChange={() => onDeliveryPreferenceChange?.('partial')}
                  className="text-printy-military focus:ring-printy-military"
                />
                <span className="text-sm">
                  Entregas parciales según disponibilidad
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryPreference === 'complete'}
                  onChange={() => onDeliveryPreferenceChange?.('complete')}
                  className="text-printy-military focus:ring-printy-military"
                />
                <span className="text-sm">
                  Esperar producción completa
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Nota */}
        <p className="text-xs text-gray-500 text-center">
          Esta cotización tiene validez de 30 días
        </p>
      </div>
    </div>
  );
}
