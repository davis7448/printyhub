'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { User } from '@/types';

export default function DashboardPage() {
  const { user, firebaseUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-printy-military text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">ADMA FASHION - PrintyHub</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span>{user?.companyName || firebaseUser?.email}</span>
                <span className="bg-printy-deep-blue px-2 py-1 rounded text-sm">
                  {user?.role === 'admin' && 'Administrador'}
                  {user?.role === 'commercial' && 'Comercial'}
                  {user?.role === 'client' && 'Cliente'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-printy-deep-blue px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bienvenido, {user?.contactName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card: Nueva Cotización */}
              <Link
                href="/dashboard/quotes/new"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900">Nueva Cotización</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Crear una nueva cotización de pedido
                </p>
              </Link>

              {/* Card: Mis Cotizaciones */}
              <Link
                href="/dashboard/quotes"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900">Mis Cotizaciones</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Ver historial de cotizaciones
                </p>
              </Link>

              {/* Card: Mis Pedidos */}
              <Link
                href="/dashboard/orders"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900">Mis Pedidos</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Ver pedidos y estados
                </p>
              </Link>

              {/* Card: Catálogo */}
              <Link
                href="/shop"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">👕</div>
                <h3 className="text-lg font-medium text-gray-900">Catálogo</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Ver productos disponibles
                </p>
              </Link>

              {/* Card: Mi Perfil */}
              <Link
                href="/dashboard/profile"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">👤</div>
                <h3 className="text-lg font-medium text-gray-900">Mi Perfil</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Gestionar información de cuenta
                </p>
              </Link>

              {/* Card: Diseños */}
              <Link
                href="/dashboard/designs"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-printy-military text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-medium text-gray-900">Mis Diseños</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Ver diseños subidos anteriormente
                </p>
              </Link>
            </div>

            {/* Sección para Admin/Comercial */}
            {(user?.role === 'admin' || user?.role === 'commercial') && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Panel de {user?.role === 'admin' ? 'Administración' : 'Comercial'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    href="/admin/products"
                    className="bg-printy-deep-blue text-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-lg font-medium">Gestionar Productos</h3>
                    <p className="mt-2 text-sm opacity-80">CRUD de productos</p>
                  </Link>

                  <Link
                    href="/admin/users"
                    className="bg-printy-deep-blue text-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-lg font-medium">Usuarios</h3>
                    <p className="mt-2 text-sm opacity-80">Gestionar clientes y comerciales</p>
                  </Link>

                  <Link
                    href="/admin/orders"
                    className="bg-printy-deep-blue text-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-lg font-medium">Pedidos</h3>
                    <p className="mt-2 text-sm opacity-80">Ver y gestionar pedidos</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
