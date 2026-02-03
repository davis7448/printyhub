import { describe, it, expect } from 'vitest';
import { calculateCustomizationPrice, formatPrice } from '@/lib/pricing';
import { PersonalizationConfig } from '@/types';

describe('Pricing Utils', () => {
  const mockConfig: PersonalizationConfig = {
    technique: 'DTF',
    sizes: [
      { name: 'BOLSILLERO', width: 9, height: 9, price: 4000 },
      { name: 'CARTA', width: 22, height: 29, price: 9000 },
      { name: 'TABLOIDE', width: 29, height: 42, price: 14000 }
    ],
    maxUnitsForFixedPrice: 6,
    xMetroConfig: {
      tiers: [
        { minMeters: 0, maxMeters: 25, pricePerM2: 20000 },
        { minMeters: 25, maxMeters: 120, pricePerM2: 18000 },
        { minMeters: 120, maxMeters: null, pricePerM2: 17000 }
      ]
    },
    locations: [
      { id: 'chest_front', name: 'Pecho Frontal', maxWidth: 30, maxHeight: 40 },
      { id: 'back_center', name: 'Espalda Centro', maxWidth: 40, maxHeight: 50 }
    ]
  };

  describe('calculateCustomizationPrice', () => {
    it('should calculate fixed price for 1-6 units', () => {
      const result = calculateCustomizationPrice('DTF', 'BOLSILLERO', 5, 5, mockConfig);
      
      expect(result.pricePerUnit).toBe(4000);
      expect(result.total).toBe(20000);
      expect(result.tierUsed).toContain('FIJO');
      expect(result.metersNeeded).toBe(0);
    });

    it('should use Carta price for CARTA size', () => {
      const result = calculateCustomizationPrice('DTF', 'CARTA', 3, 3, mockConfig);
      
      expect(result.pricePerUnit).toBe(9000);
      expect(result.total).toBe(27000);
    });

    it('should use Tabloide price for TABLOIDE size', () => {
      const result = calculateCustomizationPrice('DTF', 'TABLOIDE', 4, 4, mockConfig);
      
      expect(result.pricePerUnit).toBe(14000);
      expect(result.total).toBe(56000);
    });

    it('should calculate xMetro price for 7+ units', () => {
      const result = calculateCustomizationPrice('DTF', 'CARTA', 10, 10, mockConfig);
      
      expect(result.pricePerUnit).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.metersNeeded).toBeGreaterThan(0);
      expect(result.tierUsed).toContain('0-25m');
    });

    it('should calculate correctly for large quantities', () => {
      const result = calculateCustomizationPrice('DTF', 'CARTA', 100, 100, mockConfig);
      
      // 22x29cm = 0.0638 m²
      // 100 und * 0.0638 = 6.38 m²
      // 6.38 / 1.5 = 4.25 metros lineales
      expect(result.metersNeeded).toBeGreaterThan(4);
      expect(result.tierUsed).toContain('0-25m');
    });
  });

  describe('formatPrice', () => {
    it('should format small numbers', () => {
      const formatted = formatPrice(1000);
      expect(formatted).toContain('1.000');
    });

    it('should format large numbers', () => {
      const formatted = formatPrice(1500000);
      expect(formatted).toContain('1.500.000');
    });

    it('should handle zero', () => {
      const formatted = formatPrice(0);
      expect(formatted).toContain('0');
    });
  });
});
