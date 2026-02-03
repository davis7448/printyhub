'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById, updateOrderStatus, getOrderById as getOrder } from '@/lib/firestore';
import { formatPrice } from '@/lib/pricing';
import toast from 'react-hot-toast';

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, firebaseUser } = useAuth();
  const router = useRouter();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'nequi' | 'cash' | 'other'>('transfer');
  const [submitting, setSubmitting] = useState(false);

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
      toast.error('Error al cargar pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('El archivo no debe superar 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Por favor sube el comprobante de pago');
      return;
    }

    setSubmitting(true);

    try {
      // In a real app, upload to Firebase Storage here
      // For now, just update the order status
      
      await updateOrderStatus(resolvedParams.id, 'confirmed');

      toast.success('Comprobante enviado. Tu pedido está siendo verificado.');
      router.push('/dashboard/orders');
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Error al enviar comprobante');
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-printy-military text-white py-6">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/dashboard/orders"
            className="text-white/80 hover:text-white text-sm mb-2 inline-block"
          >
            ← Volver a Mis Pedidos
          </Link>
          <h1 className="text-2xl font-bold">Subir Comprobante de Pago</h1>
          <p className="opacity-80">{order.orderNumber}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Resumen del Pedido</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-xl text-printy-military">
                {formatPrice(order.total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                Pendiente de Pago
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Información de Pago</h2>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['transfer', 'nequi', 'cash', 'other'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-lg border-2 text-center transition-colors ${
                    paymentMethod === method
                      ? 'border-printy-military bg-printy-military/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium capitalize">
                    {method === 'transfer' ? 'Transferencia' : method}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bank Info */}
          {paymentMethod === 'transfer' && (
            <div className="bg-printy-smoke p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Datos Bancarios</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-600">Banco:</span> Bancolombia</p>
                <p><span className="text-gray-600">Cuenta:</span> Ahorros 123456789</p>
                <p><span className="text-gray-600">Titular:</span> ADMA FASHION S.A.S</p>
                <p><span className="text-gray-600">NIT:</span> 123456789-0</p>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comprobante de Pago
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-printy-military focus:border-printy-military"
            />
            <p className="text-xs text-gray-500 mt-1">
              Formatos: JPG, PNG, PDF (máx 10MB)
            </p>
            {selectedFile && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {selectedFile.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !selectedFile}
            className="w-full bg-printy-military text-white py-3 rounded-lg font-medium hover:bg-printy-deep-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Enviando...' : 'Enviar Comprobante'}
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Tu comprobante será revisado por un comercial.</p>
          <p>Recibirás una notificación cuando sea verificado.</p>
        </div>
      </div>
    </div>
  );
}
