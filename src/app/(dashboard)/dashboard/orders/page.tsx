'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Order, Quotation } from '@/types';
import { getQuotationsByClient, updateQuotationStatus, createOrder } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';
import toast from 'react-hot-toast';
import { updateOrderStatus, getOrdersByClient } from '@/lib/firestore';
import { OrderStatus } from '@/types';

export default function OrdersPage() {
  const { user, firebaseUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'quotations'>('orders');

  useEffect(() => {
    loadData();
  }, [firebaseUser]);

  const loadData = async () => {
    if (!firebaseUser) return;
    
    try {
      // Load orders
      const ordersData = await getOrdersByClient(firebaseUser.uid);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveQuotation = async (quotation: Quotation) => {
    try {
      await updateQuotationStatus(quotation.id, 'approved');
      
      // Create order from quotation
      await createOrder({
        orderNumber: `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        quotationId: quotation.id,
        clientId: quotation.clientId!,
        commercialId: quotation.commercialId,
        status: 'pending_payment',
        items: quotation.items,
        subtotal: quotation.subtotal,
        ivaAmount: quotation.ivaAmount,
        total: quotation.total,
        payment: {
          method: 'transfer',
        },
        delivery: {
          type: quotation.clientDeliveryPreference === 'partial' ? 'partial' : 'total',
          schedule: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast.success('Cotización aprobada. Se ha creado un pedido.');
      loadData();
    } catch (error) {
      console.error('Error approving quotation:', error);
      toast.error('Error al aprobar cotización');
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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-printy-military text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Mis Pedidos y Cotizaciones</h1>
          <p className="opacity-80">Gestiona tus pedidos y cotizaciones</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-printy-military text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pedidos ({orders.length})
          </button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
            <Link
              href="/dashboard/quotes/new"
              className="bg-printy-military text-white px-6 py-2 rounded-lg hover:bg-printy-deep-blue transition-colors inline-block"
            >
              Crear Cotización
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500">
                      Fecha: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Items summary */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {order.items.length} producto(s) • {order.items.reduce((sum, item) => {
                      const sizes = Object.values(item.sizeBreakdown);
                      return sum + sizes.reduce((s, q) => s + (q || 0), 0);
                    }, 0)} unidades
                  </p>
                </div>

                {/* Payment info */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                      <p className="text-sm text-gray-500">IVA incluido</p>
                    </div>
                    {order.status === 'pending_payment' && (
                      <Link
                        href={`/dashboard/orders/${order.id}/payment`}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Subir Comprobante
                      </Link>
                    )}
                  </div>
                </div>

                {/* Delivery schedule */}
                {order.delivery.schedule && order.delivery.schedule.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Entregas Programadas</h4>
                    <div className="space-y-2">
                      {order.delivery.schedule.map((schedule, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>
                            {schedule.quantity} unidades - {formatDate(schedule.scheduledDate)}
                          </span>
                          <span className={schedule.delivered ? 'text-green-600' : 'text-gray-500'}>
                            {schedule.delivered ? '✓ Entregado' : 'Pendiente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
