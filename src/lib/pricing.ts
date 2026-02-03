import { PersonalizationConfig, PersonalizationSize } from '@/types';

export interface PriceCalculation {
  pricePerUnit: number;
  total: number;
  tierUsed: string;
  metersNeeded: number;
}

export function calculateCustomizationPrice(
  technique: 'DTF' | 'DTG',
  sizeName: string,
  quantity: number,
  totalUnitsInQuote: number,
  config: PersonalizationConfig
): PriceCalculation {
  const sizeConfig = config.sizes.find(s => s.name === sizeName);
  
  if (!sizeConfig) {
    throw new Error(`Size ${sizeName} not found in config`);
  }

  // CASO 1: Hasta 6 unidades - precio fijo por tamaño
  if (quantity <= config.maxUnitsForFixedPrice) {
    return {
      pricePerUnit: sizeConfig.price,
      total: sizeConfig.price * quantity,
      tierUsed: `FIJO (${sizeName})`,
      metersNeeded: 0,
    };
  }

  // CASO 2: Más de 6 unidades - precio x mayor por metro lineal
  // Calcular área del diseño en m²
  const designAreaM2 = (sizeConfig.width * sizeConfig.height) / 10000;
  
  // Calcular metros lineales necesarios (ancho de tela típico: 1.5m)
  const metersNeeded = (designAreaM2 * quantity) / 1.5;
  
  // Determinar precio por m² según volumen
  let pricePerM2 = 20000; // default tier 1
  let tierUsed = '0-25m (20,000/m²)';
  
  const tier = config.xMetroConfig.tiers.find(
    t => metersNeeded >= t.minMeters && 
         (t.maxMeters === null || metersNeeded <= t.maxMeters)
  );
  
  if (tier) {
    pricePerM2 = tier.pricePerM2;
    if (tier.maxMeters === null) {
      tierUsed = `120m+ (${(tier.pricePerM2 / 1000).toFixed(0)}k/m²)`;
    } else {
      tierUsed = `${tier.minMeters}-${tier.maxMeters}m (${(tier.pricePerM2 / 1000).toFixed(0)}k/m²)`;
    }
  }

  // Precio total del diseño
  const totalPrice = metersNeeded * pricePerM2;
  
  // Precio por unidad
  const pricePerUnit = Math.round(totalPrice / quantity);

  return {
    pricePerUnit,
    total: Math.round(totalPrice),
    tierUsed,
    metersNeeded: Math.round(metersNeeded * 100) / 100,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getTechniqueInfo(technique: 'DTF' | 'DTG'): { name: string; description: string } {
  if (technique === 'DTF') {
    return {
      name: 'DTF',
      description: 'Direct To Film - Transferencia directa a tela',
    };
  }
  return {
    name: 'DTG',
    description: 'Direct To Garment - Impresión directa sobre la prenda',
  };
}

export function getLocationInfo(locations: { id: string; name: string; maxWidth: number; maxHeight: number }[]): string {
  return locations.map(l => l.name).join(', ');
}
