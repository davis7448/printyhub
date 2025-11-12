import { faqs } from '@/data/faqs';

export default function HelpPage() {
  const categories = ['general', 'products', 'services', 'orders', 'shipping'];

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      general: 'General',
      products: 'Productos',
      services: 'Servicios',
      orders: 'Pedidos',
      shipping: 'Envíos'
    };
    return titles[category] || category;
  };

  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            PREGUNTAS FRECUENTES
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos,
            servicios y procesos. Si no encuentras lo que buscas, contáctanos.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter(faq => faq.category === category);
            if (categoryFaqs.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="font-heading-md text-printy-black mb-6 border-b-2 border-printy-stone pb-2">
                  {getCategoryTitle(category)}
                </h2>

                <div className="space-y-6">
                  {categoryFaqs.map((faq) => (
                    <div key={faq.id} className="bg-printy-white border border-printy-stone p-6 hover:border-printy-military transition-colors">
                      <h3 className="font-heading-sm text-printy-black mb-3">
                        {faq.question}
                      </h3>
                      <p className="font-body text-printy-carbon leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading-md text-printy-black mb-4">
            ¿NO ENCONTRASTE LO QUE BUSCABAS?
          </h2>
          <p className="font-body text-printy-carbon mb-6">
            Nuestro equipo está listo para ayudarte con cualquier pregunta adicional
            o requerimiento específico que tengas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/apply"
              className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Solicitar Información
            </a>
            <a
              href="/contact"
              className="border-2 border-printy-military text-printy-military px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military hover:text-printy-white transition-colors focus-ring"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}