import Link from 'next/link';

const services = [
  {
    name: 'DTF',
    title: 'Direct To Film',
    description: 'Impresión directa a tela de alta calidad con colores vibrantes y durabilidad excepcional.',
    specs: [
      'Colores vibrantes y detalles finos',
      'Durabilidad hasta 50 lavados',
      'Ideal para diseños complejos',
      'Sin límite de colores'
    ],
    turnaround: '3-5 días hábiles'
  },
  {
    name: 'DTG',
    title: 'Direct To Garment',
    description: 'Impresión digital directa en prenda con tecnología de inyección de tinta.',
    specs: [
      'Impresión fotográfica de alta calidad',
      'Colores suaves y naturales',
      'Perfecto para fotografías y gradientes',
      'Prendas blancas y claras'
    ],
    turnaround: '2-4 días hábiles'
  },
  {
    name: 'Bordado',
    title: 'Bordado Computarizado',
    description: 'Bordado profesional con puntadas precisas y materiales de primera calidad.',
    specs: [
      'Puntadas precisas y duraderas',
      'Hasta 15 colores por diseño',
      'Texturas tridimensionales',
      'Ideal para logos corporativos'
    ],
    turnaround: '4-7 días hábiles'
  },
  {
    name: 'Tinte',
    title: 'Tinte Directo',
    description: 'Tinte personalizado con diseños únicos y colores personalizados.',
    specs: [
      'Colores personalizados',
      'Diseños únicos y exclusivos',
      'Alta durabilidad',
      'Efectos especiales disponibles'
    ],
    turnaround: '5-8 días hábiles'
  },
  {
    name: 'Etiquetado',
    title: 'Etiquetas Personalizadas',
    description: 'Etiquetas tejidas o estampadas con tu branding personalizado.',
    specs: [
      'Etiquetas tejidas o estampadas',
      'Materiales premium',
      'Información de cuidado incluida',
      'Códigos de barras opcionales'
    ],
    turnaround: '2-3 días hábiles'
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            NUESTROS SERVICIOS
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios de personalización con las mejores
            técnicas y tecnologías del mercado para resultados excepcionales.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.name} className="bg-printy-white border border-printy-stone p-6 hover:border-printy-military transition-colors">
                <div className="mb-4">
                  <h3 className="font-heading-md text-printy-black mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body-sm text-printy-carbon mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-heading-sm text-printy-black mb-2">
                    ESPECIFICACIONES TÉCNICAS
                  </h4>
                  <ul className="space-y-1">
                    {service.specs.map((spec, index) => (
                      <li key={index} className="font-body-sm text-printy-carbon flex items-start">
                        <span className="text-printy-military mr-2 mt-1">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="font-body-sm text-printy-carbon">
                    <span className="font-league-spartan uppercase tracking-wider text-xs text-printy-military">
                      Tiempo de entrega:
                    </span>
                    <br />
                    {service.turnaround}
                  </p>
                </div>

                <Link
                  href="/apply"
                  className="w-full bg-printy-military text-printy-white px-6 py-3 font-league-spartan uppercase tracking-wider text-sm hover:bg-printy-military/90 transition-colors focus-ring text-center block"
                >
                  Cotizar {service.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading-md text-printy-black mb-4">
            ¿NECESITAS UNA SOLUCIÓN PERSONALIZADA?
          </h2>
          <p className="font-body text-printy-carbon mb-6">
            Contáctanos para discutir proyectos especiales, técnicas combinadas
            o soluciones personalizadas para tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/turnaround"
              className="border-2 border-printy-military text-printy-military px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military hover:text-printy-white transition-colors focus-ring"
            >
              Ver Tiempos de Entrega
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}