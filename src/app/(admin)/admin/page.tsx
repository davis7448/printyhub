'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getAllOrders, getProducts } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingPayment: 0,
    inProduction: 0,
    completed: 0,
    totalProducts: 0,
    recentOrders: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [orders, products] = await Promise.all([
        getAllOrders(),
        getProducts(),
      ]);

      setStats({
        totalOrders: orders.length,
        pendingPayment: orders.filter(o => o.status === 'pending_payment').length,
        inProduction: orders.filter(o => o.status === 'in_production').length,
        completed: orders.filter(o => o.status === 'completed').length,
        totalProducts: products.length,
        recentOrders: orders.slice(0, 5),
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '-';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-CO');
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
          <p className="text-gray-500">No tienes permisos para acceder a esta página</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-printy-military text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="opacity-80">Bienvenido, {user.contactName}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Total Pedidos</p>
            <p className="text-3xl font-bold text-printy-military">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Pendientes de Pago</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingPayment}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">En Producción</p>
            <p className="text-3xl font-bold text-purple-600">{stats.inProduction}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Completados</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/products"
                className="p-4 border rounded-lg hover:border-printy-military hover:bg-printy-military/5 transition-colors text-center"
              >
                <p className="text-2xl mb-1">👕</p>
                <p className="font-medium">Productos</p>
                <p className="text-sm text-gray-500">{stats.totalProducts} activos</p>
              </Link>
              <Link
                href="/admin/orders"
                className="p-4 border rounded-lg hover:border-printy-military hover:bg-printy-military/5 transition-colors text-center"
              >
                <p className="text-2xl mb-1">📦</p>
                <p className="font-medium">Pedidos</p>
                <p className="text-sm text-gray-500">{stats.totalOrders} total</p>
              </Link>
              <Link
                href="/admin/pricing"
                className="p-4 border rounded-lg hover:border-printy-military hover:bg-printy-military/5 transition-colors text-center"
              >
                <p className="text-2xl mb-1">💰</p>
                <p className="font-medium">Precios</p>
                <p className="text-sm text-gray-500">Configurar</p>
              </Link>
              <Link
                href="/admin/users"
                className="p-4 border rounded-lg hover:border-printy-military hover:bg-printy-military/5 transition-colors text-center"
              >
                <p className="text-2xl mb-1">👥</p>
                <p className="font-medium">Usuarios</p>
                <p className="text-sm text-gray-500">Gestionar</p>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Pedidos Recientes</h2>
            {stats.recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay pedidos aún</p>
            ) : (
              <div className="space-y-3">
                {stats.recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders?id=${order.id}`}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-printy-military">
                        {formatPrice(order.total)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'pending_payment' ? 'Pendiente' :
                         order.status === 'confirmed' ? 'Confirmado' :
                         order.status === 'completed' ? 'Completado' : order.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
