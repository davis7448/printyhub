'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, RegisterInput } from '@/lib/schemas';
import { createUser } from '@/lib/firestore';
import toast from 'react-hot-toast';
import { UserCredential } from 'firebase/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const credential: UserCredential = await registerAuth(data.email, data.password);
      
      await createUser({
        uid: credential.user.uid,
        email: data.email,
        role: 'client',
        companyName: data.companyName,
        nit: data.nit,
        contactName: data.contactName,
        whatsapp: data.whatsapp,
        city: data.city,
        active: true,
      });

      toast.success('¡Cuenta creada exitosamente!');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'El email ya está registrado',
        'auth/invalid-email': 'Email inválido',
        'auth/weak-password': 'La contraseña es muy débil',
        'auth/operation-not-allowed': 'Operación no permitida',
      };
      toast.error(errorMessages[error.code] || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link href="/login" className="font-medium text-printy-military hover:text-printy-deep-blue">
              inicia sesión aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="companyName" className="sr-only">
                Nombre de Empresa
              </label>
              <input
                {...register('companyName')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Nombre de Empresa *"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nit" className="sr-only">
                NIT
              </label>
              <input
                {...register('nit')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="NIT *"
              />
              {errors.nit && (
                <p className="text-red-500 text-sm mt-1">{errors.nit.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactName" className="sr-only">
                Nombre de Contacto
              </label>
              <input
                {...register('contactName')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Nombre de Contacto *"
              />
              {errors.contactName && (
                <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className="sr-only">
                WhatsApp
              </label>
              <input
                {...register('whatsapp')}
                type="tel"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="WhatsApp *"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="sr-only">
                Ciudad
              </label>
              <input
                {...register('city')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Ciudad *"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Email *"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                {...register('password')}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Contraseña *"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-printy-military focus:border-printy-military sm:text-sm"
                placeholder="Confirmar Contraseña *"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-printy-military hover:bg-printy-deep-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-printy-military disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
