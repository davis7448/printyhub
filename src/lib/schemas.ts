import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Nombre de empresa requerido'),
  nit: z.string().min(5, 'NIT requerido'),
  contactName: z.string().min(2, 'Nombre de contacto requerido'),
  whatsapp: z.string().min(10, 'WhatsApp requerido'),
  city: z.string().min(2, 'Ciudad requerida'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// B2B Application Schema (mantener existente)
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
  createdAt: z.any(),
  status: z.enum(['new', 'review', 'approved', 'rejected']).default('new'),
});

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
  createdAt: any;
  status: 'new' | 'review' | 'approved' | 'rejected';
}

export type B2BApplicationFormData = Omit<B2BApplication, 'createdAt' | 'status' | 'briefFilePath'>;

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