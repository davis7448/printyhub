// Products
export interface Product {
  id: string;
  name: string;
  reference: string;
  color: string;
  category: 'tshirt' | 'hoodie' | 'tank' | 'sweatshirt' | 'polo';
  fit: 'oversize' | 'regular' | 'slim';
  material: string;
  weight: string;
  images: string[];
  basePrice: number;
  available: boolean;
  maxDiscountPercent: number;
  sizeChart: SizeChartEntry[];
  features?: string[];
  description?: string;
}

export interface SizeChartEntry {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
}

// Personalization (costing rules per technique)
export interface PersonalizationConfig {
  technique: 'DTF' | 'DTG';
  sizes: PersonalizationSize[];
  maxUnitsForFixedPrice: number;
  xMetroConfig: XMetroConfig;
  locations: LocationTemplate[];
}

export interface PersonalizationSize {
  name: string;
  width: number;
  height: number;
  price: number;
}

export interface XMetroConfig {
  tiers: {
    minMeters: number;
    maxMeters: number | null;
    pricePerM2: number;
  }[];
}

export interface LocationTemplate {
  id: string;
  name: string;
  maxWidth: number;
  maxHeight: number;
  description?: string;
}

// Users
export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'commercial' | 'client';
  companyName: string;
  nit: string;
  contactName: string;
  whatsapp: string;
  city: string;
  assignedTo?: string;
  createdAt: Date;
  lastLogin?: Date;
  active: boolean;
}

// Quotations
export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId: string | null;
  commercialId: string | null;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'expired';
  items: QuotationItem[];
  subtotal: number;
  ivaPercent: number;
  ivaAmount: number;
  total: number;
  totalUnits: number;
  estimatedDays: number | null;
  estimatedDaysNote?: string;
  requiresCommercialApproval: boolean;
  clientDeliveryPreference?: 'partial' | 'complete';
  deliveryPreferenceConfirmed: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationItem {
  productId: string;
  productName: string;
  productColor: string;
  sizeBreakdown: Record<string, number>;
  customizations: QuotationCustomization[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  itemTotal: number;
}

export interface QuotationCustomization {
  technique: 'DTF' | 'DTG';
  locationId: string;
  locationName: string;
  sizeName: string;
  width: number;
  height: number;
  designUrl?: string;
  designDescription?: string;
  pricePerUnit: number;
  quantity: number;
  subtotal: number;
}

// Orders
export interface Order {
  id: string;
  orderNumber: string;
  quotationId: string;
  clientId: string;
  commercialId: string | null;
  status: OrderStatus;
  items: QuotationItem[];
  subtotal: number;
  ivaAmount: number;
  total: number;
  payment: OrderPayment;
  delivery: OrderDelivery;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type OrderStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'in_production'
  | 'partial_ready'
  | 'completed'
  | 'cancelled';

export interface OrderPayment {
  method: 'transfer' | 'nequi' | 'cash' | 'other';
  proofUrl?: string;
  uploadedAt?: Date;
  verifiedBy?: string;
  verifiedAt?: Date;
  notes?: string;
}

export interface OrderDelivery {
  type: 'partial' | 'total';
  schedule: OrderDeliverySchedule[];
}

export interface OrderDeliverySchedule {
  quantity: number;
  scheduledDate: Date;
  delivered: boolean;
  deliveredAt?: Date;
  tracking?: string;
}

// Uploaded Designs
export interface UploadedDesign {
  id: string;
  userId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  originalFileName: string;
  fileType: 'image' | 'pdf';
  fileSize: number;
  uploadedAt: Date;
  usedInQuotes: string[];
  usedInOrders: string[];
  isPublic: boolean;
}
