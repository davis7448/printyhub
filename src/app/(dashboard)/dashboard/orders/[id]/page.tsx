'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';
import { OrderStatus } from '@/types';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, firebaseUser } = useAuth();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [resolvedParams.id]);

  const loadOrder = async () => {
    try {
      const orderData = await getOrderById(resolvedParams.id);
      if (orderData) {
        setOrder(orderData);
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      'pending_payment': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'in_production': 'bg-purple-100 text-purple-800',
      'partial_ready': 'bg-orange-100 text-orange-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
    };

    const labels: Record<OrderStatus, string> = {
      'pending_payment': 'Pendiente de Pago',
      'confirmed': 'Confirmado',
      'in_production': 'En Producción',
      'partial_ready': 'Entrega Parcial',
      'completed': 'Completado',
      'cancelled': 'Cancelado',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatDate = (date: Date | any) => {
    if (!date) return '-';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-CO');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-printy-military"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pedido no encontrado</h1>
          <Link href="/dashboard/orders" className="text-printy-military hover:underline">
            Volver a Mis Pedidos
          </Link>
        </div>
      </div>
    );
  }

  const totalUnits = order.items.reduce((sum: number, item: any) => {
    const sizes = Object.values(item.sizeBreakdown);
    return sum + sizes.reduce((s: number, q: any) => s + (q || 0), 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-printy-military text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/dashboard/orders"
            className="text-white/80 hover:text-white text-sm mb-2 inline-block"
          >
            ← Volver a Mis Pedidos
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
              <p className="opacity-80">Fecha: {formatDate(order.createdAt)}</p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Productos</h2>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-500">{item.productColor}</p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.itemTotal)}
                    </span>
                  </div>
                  
                  {/* Talllas */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Object.keys(item.sizeBreakdown)
                      .filter(size => {
                        const qty = item.sizeBreakdown[size as keyof typeof item.sizeBreakdown];
                        return typeof qty === 'number' && qty > 0;
                      })
                      .map((size) => (
                        <span
                          key={size as string}
                          className="bg-gray-100 px-2 py-1 rounded text-sm"
                        >
                          {size}: {item.sizeBreakdown[size as keyof typeof item.sizeBreakdown]}
                        </span>
                      ))}
                  </div>

                  {/* Personalizaciones */}
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {item.customizations.map((c: any, i: number) => (
                        <div key={i} className="text-sm text-printy-military">
                          • {c.technique} - {c.locationName} ({c.sizeName})
                          <span className="text-gray-500 ml-2">
                            {c.quantity} × {formatPrice(c.pricePerUnit)} = {formatPrice(c.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de pago */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Resumen de Pago</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalUnits} unidades)</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IVA (19%)</span>
                <span>{formatPrice(order.ivaAmount)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-printy-military">{formatPrice(order.total)}</span>
              </div>
            </div>

            {order.status === 'pending_payment' && (
              <Link
                href={`/dashboard/orders/${order.id}/payment`}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center block"
              >
                Subir Comprobante de Pago
              </Link>
            )}
          </div>

          {/* Entregas programadas */}
          {order.delivery?.schedule && order.delivery.schedule.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold text-lg mb-4">Entregas Programadas</h2>
              <div className="space-y-3">
                {order.delivery.schedule.map((schedule: any, i: number) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      schedule.delivered
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{schedule.quantity} unidades</p>
                        <p className="text-sm text-gray-500">
                          Programada: {formatDate(schedule.scheduledDate)}
                        </p>
                      </div>
                      {schedule.delivered ? (
                        <span className="text-green-600 font-medium">✓ Entregado</span>
                      ) : (
                        <span className="text-gray-500">Pendiente</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nota de entrega */}
          {order.delivery?.type && (
            <div className="bg-printy-smoke p-4 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Tipo de entrega:</span>{' '}
                {order.delivery.type === 'partial'
                  ? 'Entregas parciales según disponibilidad'
                  : 'Esperar producción completa'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
