'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllOrders, getOrderById, updateOrderStatus } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';
import toast from 'react-hot-toast';
import { OrderStatus } from '@/types';

const STATUS_COLUMNS: { key: OrderStatus; label: string; color: string }[] = [
  { key: 'pending_payment', label: 'Pendiente de Pago', color: 'bg-yellow-100' },
  { key: 'confirmed', label: 'Confirmados', color: 'bg-blue-100' },
  { key: 'in_production', label: 'En Producción', color: 'bg-purple-100' },
  { key: 'partial_ready', label: 'Entrega Parcial', color: 'bg-orange-100' },
  { key: 'completed', label: 'Completados', color: 'bg-green-100' },
];

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Estado actualizado');
      loadOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error al actualizar estado');
    }
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status);
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
          <h1 className="text-2xl font-bold">Gestionar Pedidos</h1>
          <p className="opacity-80">Kanban de todos los pedidos</p>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-8 overflow-x-auto">
        {/* Kanban Board */}
        <div className="flex gap-4 min-w-max">
          {STATUS_COLUMNS.map((column) => (
            <div key={column.key} className="w-80 flex-shrink-0">
              <div className={`${column.color} rounded-t-lg px-4 py-3`}>
                <h3 className="font-semibold text-gray-800">
                  {column.label}
                  <span className="ml-2 bg-white/50 px-2 py-0.5 rounded-full text-sm">
                    {getOrdersByStatus(column.key).length}
                  </span>
                </h3>
              </div>
              <div className="bg-gray-100 rounded-b-lg p-4 space-y-3 min-h-[400px]">
                {getOrdersByStatus(column.key).map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{order.orderNumber}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="text-sm font-medium text-printy-military">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {order.items?.length || 0} producto(s)
                    </p>
                  </div>
                ))}
                {getOrdersByStatus(column.key).length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-8">
                    Sin pedidos
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-500">
                  Creado: {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cambiar Estado
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
                >
                  {STATUS_COLUMNS.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-medium mb-2">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {Object.entries(item.sizeBreakdown)
                          .filter(([, qty]) => typeof qty === 'number' && qty > 0)
                          .map(([size, qty]) => `${size}: ${qty}`)
                          .join(', ')}
                      </p>
                      {item.customizations?.length > 0 && (
                        <p className="text-sm text-printy-military mt-1">
                          + {item.customizations.length} personalización(es)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-printy-military">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Payment Info */}
              {selectedOrder.payment && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Información de Pago</h4>
                  <p className="text-sm">
                    <span className="text-gray-500">Método:</span>{' '}
                    {selectedOrder.payment.method || '-'}
                  </p>
                  {selectedOrder.payment.proofUrl && (
                    <p className="text-sm text-green-600">
                      ✓ Comprobante subido
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
