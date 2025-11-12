import { z } from 'zod';

// B2B Application Schema
export const b2bApplicationSchema = z.object({
  companyName: z.string().min(1, 'Nombre de empresa es requerido'),
  nit: z.string().min(1, 'NIT es requerido'),
  contactName: z.string().min(1, 'Nombre de contacto es requerido'),
  whatsapp: z.string().min(1, 'WhatsApp es requerido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  city: z.string().min(1, 'Ciudad es requerida'),
  clientType: z.enum(['marca', 'agencia', 'empresa', 'dropshipper']),
  interests: z.array(z.string()).min(1, 'Selecciona al menos un interés'),
  monthlyVolume: z.enum(['0-100', '100-300', '300-1000', '1000+']),
  notes: z.string().optional(),
  briefFilePath: z.string().optional(),
  createdAt: z.any(), // Firestore Timestamp
  status: z.enum(['new', 'review', 'approved', 'rejected']).default('new'),
});

// TypeScript interface
export interface B2BApplication {
  companyName: string;
  nit: string;
  contactName: string;
  whatsapp: string;
  email?: string;
  city: string;
  clientType: 'marca' | 'agencia' | 'empresa' | 'dropshipper';
  interests: string[];
  monthlyVolume: '0-100' | '100-300' | '300-1000' | '1000+';
  notes?: string;
  briefFilePath?: string;
  createdAt: any; // Firestore Timestamp
  status: 'new' | 'review' | 'approved' | 'rejected';
}

// Form data type (without server-generated fields)
export type B2BApplicationFormData = Omit<B2BApplication, 'createdAt' | 'status' | 'briefFilePath'>;

// Form schema for validation (without server fields)
export const b2bApplicationFormSchema = z.object({
  companyName: z.string().min(1, 'Nombre de empresa es requerido'),
  nit: z.string().min(1, 'NIT es requerido'),
  contactName: z.string().min(1, 'Nombre de contacto es requerido'),
  whatsapp: z.string().min(1, 'WhatsApp es requerido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  city: z.string().min(1, 'Ciudad es requerida'),
  clientType: z.enum(['marca', 'agencia', 'empresa', 'dropshipper']),
  interests: z.array(z.string()).min(1, 'Selecciona al menos un interés'),
  monthlyVolume: z.enum(['0-100', '100-300', '300-1000', '1000+']),
  notes: z.string().optional(),
});