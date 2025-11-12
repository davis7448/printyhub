'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { b2bApplicationFormSchema, type B2BApplicationFormData } from '@/lib/schemas';
import { products } from '@/data/products';
import FileDropzone from '@/components/FileDropzone';
import toast, { Toaster } from 'react-hot-toast';

const clientTypes = [
  { value: 'marca', label: 'Marca' },
  { value: 'agencia', label: 'Agencia' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'dropshipper', label: 'Dropshipper' }
];

const interests = [
  { value: 'blanks', label: 'Blanks' },
  { value: 'dtf', label: 'DTF' },
  { value: 'dtg', label: 'DTG' },
  { value: 'bordado', label: 'Bordado' },
  { value: 'tinte', label: 'Tinte' },
  { value: 'etiquetado', label: 'Etiquetado' }
];

const volumeOptions = [
  { value: '0-100', label: '0-100 unidades/mes' },
  { value: '100-300', label: '100-300 unidades/mes' },
  { value: '300-1000', label: '300-1000 unidades/mes' },
  { value: '1000+', label: 'Más de 1000 unidades/mes' }
];

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [briefFile, setBriefFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<B2BApplicationFormData>({
    resolver: zodResolver(b2bApplicationFormSchema)
  });

  const selectedInterests = watch('interests') || [];

  // Check for product query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    if (productId) {
      setSelectedProduct(productId);
      const product = products.find(p => p.id === productId);
      if (product) {
        // Pre-select blanks interest
        setValue('interests', ['blanks']);
      }
    }
  }, [setValue]);

  const handleInterestChange = (interest: string, checked: boolean) => {
    const current = selectedInterests;
    if (checked) {
      setValue('interests', [...current, interest]);
    } else {
      setValue('interests', current.filter(i => i !== interest));
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileRef = ref(storage, `briefs/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const onSubmit = async (data: B2BApplicationFormData) => {
    setIsSubmitting(true);

    try {
      let briefFilePath = undefined;
      if (briefFile) {
        briefFilePath = await uploadFile(briefFile);
      }

      const applicationData = {
        ...data,
        briefFilePath,
        createdAt: serverTimestamp(),
        status: 'new' as const
      };

      const docRef = await addDoc(collection(db, 'b2b_applications'), applicationData);

      toast.success(`¡Aplicación enviada exitosamente! Número de solicitud: ${docRef.id.slice(-6).toUpperCase()}`);

      // Reset form
      setBriefFile(null);
      setSelectedProduct(null);

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error al enviar la aplicación. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-printy-white py-12 px-6">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading-lg text-printy-black mb-4">
            APLICACIÓN B2B
          </h1>
          <p className="font-body text-printy-carbon">
            Completa el formulario para solicitar información y cotizaciones personalizadas
            para tus necesidades de personalización.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <div className="bg-printy-smoke p-6 rounded-lg">
            <h2 className="font-heading-md text-printy-black mb-4">
              INFORMACIÓN DE LA EMPRESA
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  Nombre de Empresa *
                </label>
                <input
                  {...register('companyName')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="Tu empresa S.A.S."
                />
                {errors.companyName && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  NIT *
                </label>
                <input
                  {...register('nit')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="123456789-0"
                />
                {errors.nit && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.nit.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-printy-smoke p-6 rounded-lg">
            <h2 className="font-heading-md text-printy-black mb-4">
              INFORMACIÓN DE CONTACTO
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  Nombre de Contacto *
                </label>
                <input
                  {...register('contactName')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="Juan Pérez"
                />
                {errors.contactName && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  WhatsApp *
                </label>
                <input
                  {...register('whatsapp')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="+57 300 123 4567"
                />
                {errors.whatsapp && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.whatsapp.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block font-body-sm text-printy-black mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="contacto@empresa.com"
                />
                {errors.email && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block font-body-sm text-printy-black mb-2">
                  Ciudad *
                </label>
                <input
                  {...register('city')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="Bogotá, Colombia"
                />
                {errors.city && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-printy-smoke p-6 rounded-lg">
            <h2 className="font-heading-md text-printy-black mb-4">
              INFORMACIÓN DE NEGOCIO
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  Tipo de Cliente *
                </label>
                <select
                  {...register('clientType')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                >
                  <option value="">Seleccionar tipo</option>
                  {clientTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.clientType && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.clientType.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body-sm text-printy-black mb-3">
                  Intereses (selecciona al menos uno) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map(interest => (
                    <label key={interest.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(interest.value)}
                        onChange={(e) => handleInterestChange(interest.value, e.target.checked)}
                        className="focus-ring"
                      />
                      <span className="font-body-sm text-printy-carbon">{interest.label}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.interests.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  Volumen Mensual Estimado *
                </label>
                <select
                  {...register('monthlyVolume')}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                >
                  <option value="">Seleccionar volumen</option>
                  {volumeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.monthlyVolume && (
                  <p className="text-red-600 font-body-sm mt-1">{errors.monthlyVolume.message}</p>
                )}
              </div>

              <div>
                <label className="block font-body-sm text-printy-black mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full p-3 border border-printy-stone focus-ring focus:border-printy-military"
                  placeholder="Describe tus necesidades específicas, proyectos actuales, etc."
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-printy-smoke p-6 rounded-lg">
            <h2 className="font-heading-md text-printy-black mb-4">
              ARCHIVO DE BRIEF (OPCIONAL)
            </h2>
            <p className="font-body-sm text-printy-carbon mb-4">
              Sube un archivo con tu brief, logos, referencias o cualquier información adicional
              que nos ayude a entender mejor tu proyecto.
            </p>
            <FileDropzone
              onFileSelect={setBriefFile}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-printy-military text-printy-white px-12 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Aplicación'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}