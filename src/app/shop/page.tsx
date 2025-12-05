'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGramaje, setSelectedGramaje] = useState<string>('180g');
  const [customizationsPerView, setCustomizationsPerView] = useState<{ [view: string]: { id: string, image: File, position: { x: number, y: number }, scale: number }[] }>({
    front: [],
    back: [],
    sleeve: []
  });
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'sleeve'>('front');
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [responseImage, setResponseImage] = useState<string | null>(null);
  const [responseZoom, setResponseZoom] = useState<number>(1);
  const [responsePan, setResponsePan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const responseContainerRef = useRef<HTMLDivElement>(null);

  const productData = {
    'T-Shirts': {
      folder: 'TSHIRTS',
      prefix: 'TSHIRT',
      colors: [
        { name: 'Azul', file: 'AZUL', color: '#0000FF' },
        { name: 'Beige', file: 'BEIGE', color: '#F5F5DC' },
        { name: 'Blanco', file: 'BLANCO', color: '#FFFFFF' },
        { name: 'Gris', file: 'GRIS', color: '#808080' },
        { name: 'Hueso', file: 'HUESO', color: '#F5DEB3' },
        { name: 'Negra', file: 'NEGRA', color: '#000000' },
        { name: 'Verde', file: 'VERDE', color: '#008000' },
      ],
      customizations: [
        'LOGO PEQUEÑO EN EL PECHO IZQUIERDO',
        'LOGO PEQUEÑO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO IZQUIERDO',
        'LOGO GRANDE CENTRO FRENTE',
        'MANGA IZQUIERDA',
        'MANGA DERECHA',
        'LATERAL IZQUIERDO',
        'LATERAL DERECHO',
        'ESPALDA CENTRADO PEQUEÑO',
        'ESPALDA GRANDE CENTRADO',
      ],
    },
    'Hoodies': {
      folder: 'HOODIES',
      prefix: 'HOODIE',
      colors: [],
      customizations: [
        'LOGO PEQUEÑO EN EL PECHO IZQUIERDO',
        'LOGO PEQUEÑO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO IZQUIERDO',
        'LOGO GRANDE CENTRO FRENTE',
        'MANGA IZQUIERDA',
        'MANGA DERECHA',
        'LATERAL IZQUIERDO',
        'LATERAL DERECHO',
        'ESPALDA CENTRADO PEQUEÑO',
        'ESPALDA GRANDE CENTRADO',
      ],
    },
    'Tank Tops': {
      folder: 'TANKTOPS',
      prefix: 'TANKTOP',
      colors: [],
      customizations: [
        'LOGO PEQUEÑO EN EL PECHO IZQUIERDO',
        'LOGO PEQUEÑO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO DERECHO',
        'LOGO MEDIANO EN EL PECHO IZQUIERDO',
        'LOGO GRANDE CENTRO FRENTE',
        'LATERAL IZQUIERDO',
        'LATERAL DERECHO',
        'ESPALDA CENTRADO PEQUEÑO',
        'ESPALDA GRANDE CENTRADO',
      ],
    },
    'Gorras': {
      folder: 'GORRAS',
      prefix: 'GORRA',
      colors: [],
      customizations: [
        'LOGO FRENTE',
        'LOGO LATERAL IZQUIERDO',
        'LOGO LATERAL DERECHO',
        'LOGO ATRAS',
      ],
    },
  };

  const currentProduct = selectedCategory ? productData[selectedCategory as keyof typeof productData] : null;
  const currentColors = currentProduct?.colors || [];
  const currentCustomizations = currentProduct?.customizations || [];

  const gramajeOptions = ['150g', '180g', '220g', '250g'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;
        setCustomizationsPerView(prev => ({
          ...prev,
          [currentView]: prev[currentView].map(c =>
            c.id === dragging
              ? { ...c, position: { x: Math.max(0, Math.min(x, rect.width - 50)), y: Math.max(0, Math.min(y, rect.height - 50)) } }
              : c
          )
        }));
      }

      if (isPanning && responseContainerRef.current) {
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        setResponsePan(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      setIsPanning(false);
    };

    if (dragging || isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset, currentView, isPanning, panStart]);

  const addCustomization = useCallback((file: File) => {
    const id = `custom-${Date.now()}`;
    setCustomizationsPerView(prev => ({
      ...prev,
      [currentView]: [...prev[currentView], {
        id,
        image: file,
        position: { x: 50, y: 50 },
        scale: 1
      }]
    }));
  }, [currentView]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addCustomization(file);
    }
  };

  const canSendWebhook = selectedColor && (customizationsPerView.front.length + customizationsPerView.back.length + customizationsPerView.sleeve.length) > 0;

  const sendWebhook = async () => {
    if (!canSendWebhook) return;

    const formData = new FormData();
    formData.append('tipoDeCamisa', `${selectedCategory} ${currentColors.find(c => c.file === selectedColor)?.name || ''}`);
    formData.append('gramaje', selectedGramaje);

    // Generate composite images for each view
    for (const view of ['front', 'back', 'sleeve'] as const) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      const baseImageUrl = `/IMAGENES/${currentProduct?.folder}/${currentProduct?.prefix}-${selectedColor}${view === 'front' ? '' : view === 'back' ? '-ATRAS' : '-MANGA'}.png`;

      try {
        const baseImage = document.createElement('img');
        await new Promise((resolve, reject) => {
          baseImage.onload = resolve;
          baseImage.onerror = reject;
          baseImage.src = baseImageUrl;
        });

        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        ctx.drawImage(baseImage, 0, 0);

        // Calculate scale factor: displayed size is ~448px width
        const displayedWidth = 448;
        const scale = baseImage.width / displayedWidth;

        // Draw customizations
        for (const customization of customizationsPerView[view]) {
          const customImage = document.createElement('img');
          await new Promise((resolve, reject) => {
            customImage.onload = resolve;
            customImage.onerror = reject;
            customImage.src = URL.createObjectURL(customization.image);
          });

          const scaledWidth = 48 * customization.scale * scale;
          const scaledHeight = 48 * customization.scale * scale;

          ctx.drawImage(
            customImage,
            customization.position.x * scale,
            customization.position.y * scale,
            scaledWidth,
            scaledHeight
          );
        }

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve);
        });
        if (blob) {
          formData.append(`imagen_${view}`, blob, `${selectedCategory}_${selectedColor}_${view}.png`);
        }
      } catch (error) {
        console.error(`Error generating composite for ${view}:`, error);
      }
    }

    // For testing, log the data instead of sending due to CORS
    console.log('Datos a enviar:', {
      tipoDeCamisa: `${selectedCategory} ${currentColors.find(c => c.file === selectedColor)?.name || ''}`,
      gramaje: selectedGramaje,
      imagenesCompuestas: ['front', 'back', 'sleeve']
    });

    alert('Datos preparados para envío. Revisa la consola para ver los datos.');

    try {
      const response = await fetch('https://n8n-n8nwork.e72bkl.easypanel.host/webhook/PRINTY', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        // Try different possible structures for the base64 data
        let imageData = null;

        // First try: direct data field
        if (data.data) {
          imageData = data.data;
        }
        // Second try: direct candidates structure
        else if (data.candidates?.[0]?.content?.parts) {
          for (const part of data.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              imageData = part.inlineData.data;
              break;
            }
          }
        }
        // Third try: array-wrapped structure (previous implementation)
        else if (data[0]?.candidates?.[0]?.content?.parts) {
          for (const part of data[0].candidates[0].content.parts) {
            if (part.inlineData?.data) {
              imageData = part.inlineData.data;
              break;
            }
          }
        }

        if (imageData) {
          const imageUrl = `data:image/png;base64,${imageData}`;
          setResponseImage(imageUrl);
          alert('Webhook enviado exitosamente. Imagen generada.');
        } else {
          console.log('Response data:', data); // Debug log
          alert(`Error: No se encontró imagen en la respuesta. Estructura recibida: ${JSON.stringify(data, null, 2)}`);
        }
      } else {
        alert(`Error al enviar webhook: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar webhook: ' + (error as Error).message);
    }

  };

  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-8 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            TIENDA
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Selecciona el tipo de prenda que deseas
          </p>
        </div>
      </section>

      {/* Shop Layout */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto flex">
          {/* Sidebar Menu */}
          <div className="w-48 pr-6">
            <h2 className="font-heading-md text-printy-black mb-6">Tipo de Prenda</h2>
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory('T-Shirts');
                    setSelectedColor(null);
                  }}
                  className={`w-full text-left p-4 border transition-colors font-league-spartan uppercase tracking-wider ${
                    selectedCategory === 'T-Shirts'
                      ? 'bg-printy-military text-printy-white border-printy-military font-bold'
                      : 'bg-white text-printy-black border-printy-stone hover:bg-printy-stone'
                  }`}
                >
                  T-Shirts
                </button>
                {selectedCategory === 'T-Shirts' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentColors.map((color) => (
                      <button
                        key={color.file}
                        onClick={() => setSelectedColor(color.file)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color.file
                            ? 'border-printy-military ring-2 ring-printy-military/50'
                            : 'border-printy-stone hover:border-printy-military'
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedCategory('Hoodies')}
                className={`w-full text-left p-4 border transition-colors font-league-spartan uppercase tracking-wider ${
                  selectedCategory === 'Hoodies'
                    ? 'bg-printy-military text-printy-white border-printy-military font-bold'
                    : 'bg-white text-printy-black border-printy-stone hover:bg-printy-stone'
                }`}
              >
                Hoodies
              </button>
              <button
                onClick={() => setSelectedCategory('Tank Tops')}
                className={`w-full text-left p-4 border transition-colors font-league-spartan uppercase tracking-wider ${
                  selectedCategory === 'Tank Tops'
                    ? 'bg-printy-military text-printy-white border-printy-military font-bold'
                    : 'bg-white text-printy-black border-printy-stone hover:bg-printy-stone'
                }`}
              >
                Tank Tops
              </button>
              <button
                onClick={() => setSelectedCategory('Gorras')}
                className={`w-full text-left p-4 border transition-colors font-league-spartan uppercase tracking-wider ${
                  selectedCategory === 'Gorras'
                    ? 'bg-printy-military text-printy-white border-printy-military font-bold'
                    : 'bg-white text-printy-black border-printy-stone hover:bg-printy-stone'
                }`}
              >
                Gorras
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {selectedColor ? (
              <div className="flex flex-col items-center justify-center bg-printy-smoke p-8">
                <h3 className="font-heading-md text-printy-black mb-4">{selectedCategory} {currentColors.find(c => c.file === selectedColor)?.name}</h3>
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setCurrentView('front')}
                    className={`px-4 py-2 mx-1 ${currentView === 'front' ? 'bg-printy-military text-white' : 'bg-gray-200'}`}
                  >
                    Frente
                  </button>
                  <button
                    onClick={() => setCurrentView('back')}
                    className={`px-4 py-2 mx-1 ${currentView === 'back' ? 'bg-printy-military text-white' : 'bg-gray-200'}`}
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setCurrentView('sleeve')}
                    className={`px-4 py-2 mx-1 ${currentView === 'sleeve' ? 'bg-printy-military text-white' : 'bg-gray-200'}`}
                  >
                    Manga
                  </button>
                </div>
                <div className="relative w-full max-w-md" ref={containerRef}>
                  <Image
                    src={`/IMAGENES/${currentProduct?.folder}/${currentProduct?.prefix}-${selectedColor}${currentView === 'front' ? '' : currentView === 'back' ? '-ATRAS' : '-MANGA'}.png`}
                    alt={`${selectedCategory} ${selectedColor} ${currentView}`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                  {customizationsPerView[currentView].map((customization) => (
                    <img
                      key={customization.id}
                      src={URL.createObjectURL(customization.image)}
                      alt={`Personalización ${customization.id}`}
                      className="absolute object-contain cursor-move"
                      style={{
                        left: customization.position.x,
                        top: customization.position.y,
                        width: 48 * customization.scale,
                        height: 48 * customization.scale
                      }}
                      onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDragOffset({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                        setDragging(customization.id);
                      }}
                      onWheel={(e) => {
                        e.preventDefault();
                        const delta = e.deltaY > 0 ? -0.1 : 0.1;
                        setCustomizationsPerView(prev => ({
                          ...prev,
                          [currentView]: prev[currentView].map(c =>
                            c.id === customization.id
                              ? { ...c, scale: Math.max(0.5, Math.min(2, c.scale + delta)) }
                              : c
                          )
                        }));
                      }}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <label className="block text-printy-black font-body mb-2">Gramaje:</label>
                  <select
                    value={selectedGramaje}
                    onChange={(e) => setSelectedGramaje(e.target.value)}
                    className="px-4 py-2 border border-printy-stone bg-white text-printy-black font-league-spartan uppercase tracking-wider"
                  >
                    {gramajeOptions.map((gramaje) => (
                      <option key={gramaje} value={gramaje}>
                        {gramaje}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="add-customization"
                  />
                  <label
                    htmlFor="add-customization"
                    className="px-4 py-2 bg-printy-military text-printy-white font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors cursor-pointer"
                  >
                    Añadir Personalización
                  </label>
                  {canSendWebhook && (
                    <div className="mt-6">
                      <button
                        onClick={sendWebhook}
                        className="px-6 py-3 bg-printy-military text-printy-white font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors"
                      >
                        Enviar Pedido
                      </button>
                    </div>
                  )}
                  {responseImage && (
                    <div className="mt-6">
                      <h4 className="text-printy-black font-heading-sm mb-4">Imagen Generada:</h4>
                      <p className="text-printy-carbon font-body text-sm mb-4">
                        Esta imagen ha sido generada por IA. Puede presentar variaciones en el diseño y es únicamente referencial.
                      </p>
                      <div className="flex justify-center items-center mb-4 space-x-2">
                        <span className="text-printy-black font-body text-sm mr-2">Zoom:</span>
                        <button
                          onClick={() => setResponseZoom(prev => Math.max(0.5, prev - 0.25))}
                          className="px-4 py-2 bg-printy-stone text-printy-black hover:bg-printy-military hover:text-printy-white transition-colors font-league-spartan uppercase tracking-wider text-sm"
                          title="Alejar"
                        >
                          Zoom Out
                        </button>
                        <button
                          onClick={() => {
                            setResponseZoom(1);
                            setResponsePan({ x: 0, y: 0 });
                          }}
                          className="px-4 py-2 bg-printy-stone text-printy-black hover:bg-printy-military hover:text-printy-white transition-colors font-league-spartan uppercase tracking-wider text-sm"
                          title="Restablecer zoom"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setResponseZoom(prev => Math.min(3, prev + 0.25))}
                          className="px-4 py-2 bg-printy-stone text-printy-black hover:bg-printy-military hover:text-printy-white transition-colors font-league-spartan uppercase tracking-wider text-sm"
                          title="Acercar"
                        >
                          Zoom In
                        </button>
                      </div>
                      <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing"
                        ref={responseContainerRef}
                        onMouseDown={(e) => {
                          if (responseZoom > 1) {
                            setIsPanning(true);
                            setPanStart({ x: e.clientX, y: e.clientY });
                          }
                        }}
                      >
                        <img
                          src={responseImage}
                          alt="Imagen generada"
                          className="max-w-full h-auto transition-transform duration-200"
                          style={{
                            transform: `scale(${responseZoom}) translate(${responsePan.x}px, ${responsePan.y}px)`,
                            transformOrigin: 'center'
                          }}
                          draggable={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : selectedCategory ? (
              <div className="h-64 flex items-center justify-center bg-printy-smoke">
                <p className="text-printy-carbon font-body">Mostrando productos de {selectedCategory}</p>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center bg-printy-smoke">
                <p className="text-printy-carbon font-body">Selecciona un tipo de prenda del menú</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}