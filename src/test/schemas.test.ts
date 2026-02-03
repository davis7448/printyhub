import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../lib/schemas';
import { z } from 'zod';

describe('Login Schema', () => {
  it('should validate a correct email and password', () => {
    const validInput = {
      email: 'test@example.com',
      password: 'password123',
    };
    
    const result = loginSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const invalidInput = {
      email: 'invalid-email',
      password: 'password123',
    };
    
    const result = loginSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject a short password', () => {
    const shortPassword = {
      email: 'test@example.com',
      password: '12345',
    };
    
    const result = loginSchema.safeParse(shortPassword);
    expect(result.success).toBe(false);
  });
});

describe('Register Schema', () => {
  it('should validate all required fields', () => {
    const validInput = {
      email: 'company@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      companyName: 'Mi Empresa',
      nit: '123456789',
      contactName: 'Juan Perez',
      whatsapp: '3001234567',
      city: 'Bogotá',
    };
    
    const result = registerSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject mismatched passwords', () => {
    const mismatched = {
      email: 'company@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
      companyName: 'Mi Empresa',
      nit: '123456789',
      contactName: 'Juan Perez',
      whatsapp: '3001234567',
      city: 'Bogotá',
    };
    
    const result = registerSchema.safeParse(mismatched);
    expect(result.success).toBe(false);
  });

  it('should reject a short company name', () => {
    const shortName = {
      email: 'company@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      companyName: 'A',
      nit: '123456789',
      contactName: 'Juan Perez',
      whatsapp: '3001234567',
      city: 'Bogotá',
    };
    
    const result = registerSchema.safeParse(shortName);
    expect(result.success).toBe(false);
  });

  it('should reject an invalid WhatsApp', () => {
    const invalidWhatsapp = {
      email: 'company@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      companyName: 'Mi Empresa',
      nit: '123456789',
      contactName: 'Juan Perez',
      whatsapp: '12',
      city: 'Bogotá',
    };
    
    const result = registerSchema.safeParse(invalidWhatsapp);
    expect(result.success).toBe(false);
  });
});

describe('Type Inference', () => {
  it('should correctly infer login input types', () => {
    const schema = loginSchema;
    type LoginInput = z.infer<typeof schema>;
    
    const input: LoginInput = {
      email: 'test@example.com',
      password: 'password123',
    };
    
    expect(input.email).toBe('test@example.com');
    expect(input.password).toBe('password123');
  });

  it('should correctly infer register input types', () => {
    const schema = registerSchema;
    type RegisterInput = z.infer<typeof schema>;
    
    const input: RegisterInput = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      companyName: 'Test Company',
      nit: '123456789',
      contactName: 'Test User',
      whatsapp: '3001234567',
      city: 'Bogotá',
    };
    
    expect(input.companyName).toBe('Test Company');
  });
});
