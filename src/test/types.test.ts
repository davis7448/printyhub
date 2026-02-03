import { describe, it, expect } from 'vitest';
import { Product, Quotation, User, OrderStatus } from '../src/types';

describe('Product Type', () => {
  it('should have all required properties', () => {
    const product: Product = {
      id: '1',
      name: 'T-Shirt Premium',
      reference: 'TSH-001',
      color: 'Negro',
      category: 'tshirt',
      fit: 'oversize',
      material: 'Algodón peruano 100%',
      weight: '230g',
      images: ['/images/product1.jpg'],
      basePrice: 15000,
      available: true,
      maxDiscountPercent: 10,
      sizeChart: [
        { size: 'S', chest: '52cm', length: '70cm', sleeve: '22cm' },
      ],
      features: ['Fit oversize'],
      description: 'T-Shirt premium oversize',
    };
    
    expect(product.id).toBe('1');
    expect(product.name).toBe('T-Shirt Premium');
    expect(product.category).toBe('tshirt');
    expect(product.basePrice).toBe(15000);
  });

  it('should accept all category types', () => {
    const categories: Product['category'][] = ['tshirt', 'hoodie', 'tank', 'sweatshirt', 'polo'];
    
    categories.forEach((category) => {
      expect(['tshirt', 'hoodie', 'tank', 'sweatshirt', 'polo']).toContain(category);
    });
  });

  it('should accept all fit types', () => {
    const fits: Product['fit'][] = ['oversize', 'regular', 'slim'];
    
    fits.forEach((fit) => {
      expect(['oversize', 'regular', 'slim']).toContain(fit);
    });
  });
});

describe('Quotation Type', () => {
  it('should have all required properties', () => {
    const quotation: Quotation = {
      id: 'q-001',
      quotationNumber: 'Q-2026-000001',
      clientId: 'user-123',
      commercialId: null,
      status: 'draft',
      items: [],
      subtotal: 100000,
      ivaPercent: 19,
      ivaAmount: 19000,
      total: 119000,
      totalUnits: 10,
      estimatedDays: null,
      requiresCommercialApproval: false,
      deliveryPreferenceConfirmed: false,
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    expect(quotation.quotationNumber).toBe('Q-2026-000001');
    expect(quotation.status).toBe('draft');
    expect(quotation.totalUnits).toBe(10);
  });

  it('should accept all quotation statuses', () => {
    const statuses: Quotation['status'][] = ['draft', 'pending_approval', 'approved', 'rejected', 'expired'];
    
    statuses.forEach((status) => {
      expect(['draft', 'pending_approval', 'approved', 'rejected', 'expired']).toContain(status);
    });
  });
});

describe('User Type', () => {
  it('should have all required properties for a client', () => {
    const client: User = {
      uid: 'user-123',
      email: 'client@example.com',
      role: 'client',
      companyName: 'Empresa Test',
      nit: '123456789',
      contactName: 'Juan Perez',
      whatsapp: '3001234567',
      city: 'Bogotá',
      active: true,
      createdAt: new Date(),
    };
    
    expect(client.role).toBe('client');
    expect(client.companyName).toBe('Empresa Test');
  });

  it('should have all required properties for a commercial', () => {
    const commercial: User = {
      uid: 'user-456',
      email: 'commercial@example.com',
      role: 'commercial',
      companyName: '',
      nit: '',
      contactName: 'Maria Garcia',
      whatsapp: '3007654321',
      city: 'Bogotá',
      active: true,
      createdAt: new Date(),
    };
    
    expect(commercial.role).toBe('commercial');
  });

  it('should have all required properties for an admin', () => {
    const admin: User = {
      uid: 'user-789',
      email: 'admin@example.com',
      role: 'admin',
      companyName: '',
      nit: '',
      contactName: 'Admin User',
      whatsapp: '3001112222',
      city: 'Bogotá',
      active: true,
      createdAt: new Date(),
    };
    
    expect(admin.role).toBe('admin');
  });

  it('should accept all user roles', () => {
    const roles: User['role'][] = ['admin', 'commercial', 'client'];
    
    roles.forEach((role) => {
      expect(['admin', 'commercial', 'client']).toContain(role);
    });
  });
});

describe('OrderStatus Type', () => {
  it('should accept all order statuses', () => {
    const statuses: OrderStatus[] = [
      'pending_payment',
      'confirmed',
      'in_production',
      'partial_ready',
      'completed',
      'cancelled',
    ];
    
    statuses.forEach((status) => {
      expect([
        'pending_payment',
        'confirmed',
        'in_production',
        'partial_ready',
        'completed',
        'cancelled',
      ]).toContain(status);
    });
  });
});

describe('Personalization Types', () => {
  it('should have correct personalization config structure', () => {
    const config = {
      technique: 'DTF' as const,
      sizes: [
        { name: 'BOLSILLERO', width: 9, height: 9, price: 4000 },
        { name: 'CARTA', width: 22, height: 29, price: 9000 },
      ],
      maxUnitsForFixedPrice: 6,
      xMetroConfig: {
        tiers: [
          { minMeters: 0, maxMeters: 25, pricePerM2: 20000 },
          { minMeters: 25, maxMeters: 120, pricePerM2: 18000 },
        ],
      },
      locations: [
        { id: 'chest_front', name: 'Pecho Frontal', maxWidth: 30, maxHeight: 40 },
      ],
    };
    
    expect(config.technique).toBe('DTF');
    expect(config.maxUnitsForFixedPrice).toBe(6);
    expect(config.xMetroConfig.tiers.length).toBe(2);
  });
});
