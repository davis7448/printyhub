'use client';

import { useState } from 'react';
import { SizeChartEntry } from '@/types';

interface SizeSelectorProps {
  sizeChart: SizeChartEntry[];
  value: Record<string, number>;
  onChange: (sizes: Record<string, number>) => void;
  maxTotal?: number;
}

export default function SizeSelector({ sizeChart, value, onChange, maxTotal }: SizeSelectorProps) {
  const [total, setTotal] = useState(
    Object.values(value).reduce((sum, qty) => sum + (qty || 0), 0)
  );

  const handleQuantityChange = (size: string, quantity: string) => {
    const qty = parseInt(quantity) || 0;
    const newValue = { ...value, [size]: qty };
    const newTotal = Object.values(newValue).reduce((sum, q) => sum + (q || 0), 0);

    if (maxTotal && newTotal > maxTotal) {
      return;
    }

    setTotal(newTotal);
    onChange(newValue);
  };

  const handleIncrement = (size: string) => {
    const currentQty = value[size] || 0;
    if (maxTotal && total >= maxTotal) return;
    handleQuantityChange(size, String(currentQty + 1));
  };

  const handleDecrement = (size: string) => {
    const currentQty = value[size] || 0;
    if (currentQty <= 0) return;
    handleQuantityChange(size, String(currentQty - 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Seleccionar Tallas</h4>
        {maxTotal && (
          <span className="text-sm text-gray-500">
            Total: {total}/{maxTotal} unidades
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {sizeChart.map((sizeEntry) => {
          const size = sizeEntry.size;
          const currentQty = value[size] || 0;

          return (
            <div key={size} className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {size}
              </label>
              <div className="flex items-center justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleDecrement(size)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  disabled={currentQty <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={currentQty}
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                  className="w-16 text-center border border-gray-300 rounded-md py-1 focus:ring-printy-military focus:border-printy-military"
                />
                <button
                  type="button"
                  onClick={() => handleIncrement(size)}
                  className="w-8 h-8 rounded-full bg-printy-military text-white hover:bg-printy-deep-blue flex items-center justify-center transition-colors"
                  disabled={maxTotal ? total >= maxTotal : false}
                >
                  +
                </button>
              </div>
              {currentQty > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Pecho: {sizeEntry.chest}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <div className="bg-printy-smoke p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-900">
            Resumen de tallas:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(value)
              .filter(([, qty]) => qty && qty > 0)
              .map(([size, qty]) => (
                <span
                  key={size}
                  className="bg-white px-2 py-1 rounded text-sm border border-gray-300"
                >
                  {size}: {qty}
                </span>
              ))}
            <span className="font-bold ml-auto">
              Total: {total} unidades
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
