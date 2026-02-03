'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getPersonalizationConfig, savePersonalizationConfig } from '@/lib/firestore';
import { PersonalizationConfig, PersonalizationSize } from '@/types';
import toast from 'react-hot-toast';

const DEFAULT_CONFIG: PersonalizationConfig = {
  technique: 'DTF',
  sizes: [
    { name: 'BOLSILLERO', width: 9, height: 9, price: 4000 },
    { name: 'CARTA', width: 22, height: 29, price: 9000 },
    { name: 'TABLOIDE', width: 29, height: 42, price: 14000 },
  ],
  maxUnitsForFixedPrice: 6,
  xMetroConfig: {
    tiers: [
      { minMeters: 0, maxMeters: 25, pricePerM2: 20000 },
      { minMeters: 25, maxMeters: 120, pricePerM2: 18000 },
      { minMeters: 120, maxMeters: null, pricePerM2: 17000 },
    ],
  },
  locations: [
    { id: 'chest_front', name: 'Pecho Frontal', maxWidth: 30, maxHeight: 40 },
    { id: 'back_center', name: 'Espalda Centro', maxWidth: 40, maxHeight: 50 },
    { id: 'left_sleeve', name: 'Manga Izquierda', maxWidth: 8, maxHeight: 12 },
    { id: 'right_sleeve', name: 'Manga Derecha', maxWidth: 8, maxHeight: 12 },
    { id: 'pocket', name: 'Bolsillo', maxWidth: 8, maxHeight: 8 },
    { id: 'custom', name: 'Ubicación Personalizada', maxWidth: 40, maxHeight: 50, description: 'A definir' },
  ],
};

export default function AdminPricingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'DTF' | 'DTG'>('DTF');
  const [config, setConfig] = useState<PersonalizationConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, [activeTab]);

  const loadConfig = async () => {
    try {
      const data = await getPersonalizationConfig(activeTab);
      if (data) {
        setConfig(data);
      } else {
        setConfig({ ...DEFAULT_CONFIG, technique: activeTab });
      }
    } catch (error) {
      console.error('Error loading config:', error);
      toast.error('Error al cargar configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePersonalizationConfig(config);
      toast.success('Configuración guardada');
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  const updateSize = (index: number, field: string, value: string | number) => {
    const newSizes = [...config.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setConfig({ ...config, sizes: newSizes });
  };

  const updateTier = (index: number, field: string, value: string | number | null) => {
    const newTiers = [...config.xMetroConfig.tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setConfig({ ...config, xMetroConfig: { ...config.xMetroConfig, tiers: newTiers } });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
          <p className="text-gray-500">No tienes permisos para acceder a esta página</p>
        </div>
      </div>
    );
  }

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
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Configurar Precios</h1>
              <p className="opacity-80">Precios de personalización DTF y DTG</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-printy-military px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {(['DTF', 'DTG'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-printy-military text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'DTF' ? 'DTF (Direct To Film)' : 'DTG (Direct To Garment)'}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {/* Fixed Prices */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Precios Fijos (1-6 unidades)</h2>
            <p className="text-sm text-gray-500 mb-4">
              Precio fijo por tamaño para pedidos de 1 a 6 unidades por diseño
            </p>
            <div className="grid grid-cols-3 gap-4">
              {config.sizes.map((size, i) => (
                <div key={size.name} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{size.name}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-500">Ancho (cm)</label>
                      <input
                        type="number"
                        value={size.width}
                        onChange={(e) => updateSize(i, 'width', parseInt(e.target.value))}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Alto (cm)</label>
                      <input
                        type="number"
                        value={size.height}
                        onChange={(e) => updateSize(i, 'height', parseInt(e.target.value))}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Precio ($)</label>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => updateSize(i, 'price', parseInt(e.target.value))}
                        className="w-full border rounded px-2 py-1 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X Metro Prices */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Precios por Metro (+6 unidades)</h2>
            <p className="text-sm text-gray-500 mb-4">
              Precio por metro cuadrado para pedidos mayores a 6 unidades
            </p>
            <div className="space-y-4">
              {config.xMetroConfig.tiers.map((tier, i) => (
                <div key={i} className="flex items-center gap-4 border rounded-lg p-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500">
                      {i === 2 ? 'Más de (metros)' : 'Rango (metros)'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={tier.minMeters}
                        onChange={(e) => updateTier(i, 'minMeters', parseInt(e.target.value))}
                        className="w-24 border rounded px-2 py-1 text-sm"
                        disabled={i === 0}
                      />
                      <span className="text-gray-400">-</span>
                      {tier.maxMeters !== null ? (
                        <input
                          type="number"
                          value={tier.maxMeters}
                          onChange={(e) => updateTier(i, 'maxMeters', parseInt(e.target.value))}
                          className="w-24 border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">∞</span>
                      )}
                      <span className="text-sm text-gray-500">metros</span>
                    </div>
                  </div>
                  <div className="w-48">
                    <label className="block text-xs text-gray-500">Precio por m²</label>
                    <input
                      type="number"
                      value={tier.pricePerM2}
                      onChange={(e) => updateTier(i, 'pricePerM2', parseInt(e.target.value))}
                      className="w-full border rounded px-2 py-1 text-sm font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Max Units for Fixed Price */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Límite Precio Fijo</h2>
            <p className="text-sm text-gray-500 mb-4">
              Cantidad máxima de unidades por diseño para aplicar precio fijo
            </p>
            <input
              type="number"
              value={config.maxUnitsForFixedPrice}
              onChange={(e) => setConfig({ ...config, maxUnitsForFixedPrice: parseInt(e.target.value) })}
              className="w-32 border rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
            />
            <p className="text-sm text-gray-500 mt-2">
              Hasta {config.maxUnitsForFixedPrice} unidades aplica precio fijo por tamaño.
              Más de {config.maxUnitsForFixedPrice} unidades aplica precio por metro.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-printy-military text-white px-8 py-3 rounded-lg font-medium hover:bg-printy-deep-blue transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
