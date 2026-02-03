'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { User } from '@/types';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, firebaseUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-printy-deep-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="font-bold text-lg">
                Admin Panel
              </Link>
              <div className="flex space-x-4">
                <Link href="/admin" className="px-3 py-2 rounded hover:bg-white/10 transition-colors">
                  Inicio
                </Link>
                <Link href="/admin/orders" className="px-3 py-2 rounded hover:bg-white/10 transition-colors">
                  Pedidos
                </Link>
                <Link href="/admin/products" className="px-3 py-2 rounded hover:bg-white/10 transition-colors">
                  Productos
                </Link>
                <Link href="/admin/pricing" className="px-3 py-2 rounded hover:bg-white/10 transition-colors">
                  Precios
                </Link>
                <Link href="/admin/users" className="px-3 py-2 rounded hover:bg-white/10 transition-colors">
                  Usuarios
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-printy-sand transition-colors">
                Ver Sitio
              </Link>
              <span className="text-sm opacity-80">{user.companyName || user.email}</span>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
