'use client';

import { useState, useEffect } from 'react';
import { PersonalizationConfig, QuotationCustomization, LocationTemplate } from '@/types';
import { getPersonalizationConfig } from '@/lib/firestore';
import { calculateCustomizationPrice, formatPrice, getTechniqueInfo } from '@/lib/pricing';
import SizeSelector from '@/components/catalog/SizeSelector';

interface CustomizationFormProps {
  productId: string;
  sizeChart: { size: string; chest: string; length: string; sleeve: string }[];
  sizeBreakdown: Record<string, number>;
  onSizeBreakdownChange: (breakdown: Record<string, number>) => void;
  onAddCustomization: (customization: QuotationCustomization) => void;
  existingCustomizations: QuotationCustomization[];
  totalUnitsInQuote: number;
}

export default function CustomizationForm({
  productId,
  sizeChart,
  sizeBreakdown,
  onSizeBreakdownChange,
  onAddCustomization,
  existingCustomizations,
  totalUnitsInQuote,
}: CustomizationFormProps) {
  const [technique, setTechnique] = useState<'DTF' | 'DTG'>('DTF');
  const [config, setConfig] = useState<PersonalizationConfig | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [designDescription, setDesignDescription] = useState('');
  const [previewPrice, setPreviewPrice] = useState<{ pricePerUnit: number; total: number; tierUsed: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, [technique]);

  const loadConfig = async () => {
    try {
      const configData = await getPersonalizationConfig(technique);
      setConfig(configData);
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPrice = () => {
    if (!config || !selectedSize || totalUnitsInQuote === 0) return;

    const calculation = calculateCustomizationPrice(
      technique,
      selectedSize,
      totalUnitsInQuote,
      totalUnitsInQuote,
      config
    );

    setPreviewPrice({
      pricePerUnit: calculation.pricePerUnit,
      total: calculation.total,
      tierUsed: calculation.tierUsed,
    });
  };

  useEffect(() => {
    if (selectedSize && config && totalUnitsInQuote > 0) {
      handlePreviewPrice();
    }
  }, [selectedSize, technique, totalUnitsInQuote, config]);

  const handleAddCustomization = () => {
    if (!config || !selectedLocation || !selectedSize) {
      alert('Por favor selecciona ubicación y tamaño');
      return;
    }

    if (totalUnitsInQuote === 0) {
      alert('Por favor selecciona al menos una talla y cantidad');
      return;
    }

    const location = config.locations.find(l => l.id === selectedLocation);
    const size = config.sizes.find(s => s.name === selectedSize);

    if (!location || !size) return;

    const calculation = calculateCustomizationPrice(
      technique,
      selectedSize,
      totalUnitsInQuote,
      totalUnitsInQuote,
      config
    );

    const customization: QuotationCustomization = {
      technique,
      locationId: selectedLocation,
      locationName: location.name,
      sizeName: selectedSize,
      width: size.width,
      height: size.height,
      designUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      designDescription: designDescription || undefined,
      pricePerUnit: calculation.pricePerUnit,
      quantity: totalUnitsInQuote,
      subtotal: calculation.total,
    };

    onAddCustomization(customization);
    
    // Reset form
    setSelectedLocation('');
    setSelectedSize('');
    setDesignDescription('');
    setSelectedFile(null);
    setPreviewPrice(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo no debe superar 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Técnica */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Técnica de Personalización
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['DTF', 'DTG'] as const).map((t) => {
            const info = getTechniqueInfo(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTechnique(t)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  technique === t
                    ? 'border-printy-military bg-printy-military/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{info.name}</span>
                <p className="text-xs text-gray-500 mt-1">{info.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ubicación */}
      {config && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación en la prenda
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
          >
            <option value="">Seleccionar ubicación</option>
            {config.locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} (máx {loc.maxWidth}x{loc.maxHeight}cm)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tamaño del diseño */}
      {config && selectedLocation && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamaño del diseño
          </label>
          <div className="grid grid-cols-3 gap-3">
            {config.sizes.map((size) => (
              <button
                key={size.name}
                type="button"
                onClick={() => setSelectedSize(size.name)}
                className={`p-3 rounded-lg border-2 transition-colors text-center ${
                  selectedSize === size.name
                    ? 'border-printy-military bg-printy-military/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium block">{size.name}</span>
                <span className="text-xs text-gray-500">
                  {size.width}x{size.height}cm
                </span>
                <span className="text-sm font-bold text-printy-military block mt-1">
                  {formatPrice(size.price)}
                </span>
                {size.price === 4000 && (
                  <span className="text-xs text-gray-400">x 1-6 und.</span>
                )}
              </button>
            ))}
          </div>
          {selectedSize && config && (
            <p className="text-sm text-gray-500 mt-2">
              {config.xMetroConfig.tiers.map((t, i) => (
                <span key={i} className="block">
                  {t.maxMeters === null
                    ? `+${t.minMeters}m: ${formatPrice(t.pricePerM2)}/m²`
                    : `${t.minMeters}-${t.maxMeters}m: ${formatPrice(t.pricePerM2)}/m²`}
                </span>
              ))}
            </p>
          )}
        </div>
      )}

      {/* Archivo del diseño */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Archivo del diseño (opcional)
        </label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
        />
        <p className="text-xs text-gray-500 mt-1">
          Formatos: JPG, PNG, PDF (máx 10MB)
        </p>
        {selectedFile && (
          <p className="text-sm text-green-600 mt-1">
            ✓ {selectedFile.name}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción del diseño (opcional)
        </label>
        <textarea
          value={designDescription}
          onChange={(e) => setDesignDescription(e.target.value)}
          rows={3}
          placeholder="Describe tu diseño si no tienes archivo..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
        />
      </div>

      {/* Preview de precio */}
      {previewPrice && totalUnitsInQuote > 0 && (
        <div className="bg-printy-smoke p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Vista previa del precio</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>Precio por unidad:</span>
              <span className="font-medium">{formatPrice(previewPrice.pricePerUnit)}</span>
            </p>
            <p className="flex justify-between">
              <span>Cantidad:</span>
              <span className="font-medium">{totalUnitsInQuote} unidades</span>
            </p>
            <p className="flex justify-between text-gray-500">
              <span>Tarifa aplicada:</span>
              <span>{previewPrice.tierUsed}</span>
            </p>
            <div className="border-t pt-2 mt-2">
              <p className="flex justify-between font-bold text-lg">
                <span>Subtotal:</span>
                <span className="text-printy-military">{formatPrice(previewPrice.total)}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Personalizaciones existentes */}
      {existingCustomizations.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">
            Personalizaciones agregadas ({existingCustomizations.length})
          </h4>
          <div className="space-y-2">
            {existingCustomizations.map((c, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{c.technique} - {c.locationName}</p>
                  <p className="text-sm text-gray-500">
                    {c.sizeName} • {c.quantity} und. • {formatPrice(c.pricePerUnit)}/und.
                  </p>
                </div>
                <span className="font-bold text-printy-military">
                  {formatPrice(c.subtotal)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón agregar */}
      {selectedSize && selectedLocation && (
        <button
          type="button"
          onClick={handleAddCustomization}
          className="w-full bg-printy-military text-white py-3 rounded-lg font-medium hover:bg-printy-deep-blue transition-colors"
        >
          Agregar Personalización
        </button>
      )}
    </div>
  );
}
