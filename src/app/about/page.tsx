export default function AboutPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading-lg text-printy-black mb-4">
            SOBRE NOSOTROS
          </h1>
          <p className="font-body text-printy-carbon text-lg">
            Conoce más sobre PrintyHub y nuestra misión de ofrecer blanks premium para tu marca.
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading-md text-printy-black mb-6 text-center">
            NUESTRA HISTORIA
          </h2>
          <div className="bg-printy-white border border-printy-stone p-8 rounded-lg">
            <p className="font-body text-printy-carbon mb-4">
              PrintyHub nació de una visión clara: democratizar el acceso a blanks premium de alta calidad 
              para emprendedores, marcas emergentes y empresas establecidas que buscan diferenciarse en el mercado.
            </p>
            <p className="font-body text-printy-carbon mb-4">
              Fundada en Colombia, hemos trabajado incansablemente para construir una red de proveedores 
              que comparten nuestra filosofía de calidad, sostenibilidad y excelencia en cada prenda que 
              comercializamos.
            </p>
            <p className="font-body text-printy-carbon">
              Hoy, PrintyHub se ha convertido en el aliado estratégico de cientos de marcas colombianas 
              que confían en nosotros para vestir sus sueños y hacer realidad sus proyectos de personalización.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Misión */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading-md text-printy-black mb-6 text-center">
            NUESTRA MISIÓN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-printy-white border border-printy-stone p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-heading-sm text-printy-black mb-2">Calidad</h3>
              <p className="font-body-sm text-printy-carbon">
                Ofrecer blanks de la más alta calidad en el mercado colombiano.
              </p>
            </div>
            <div className="bg-printy-white border border-printy-stone p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-heading-sm text-printy-black mb-2">Profesionalismo</h3>
              <p className="font-body-sm text-printy-carbon">
                Brindar un servicio excepcional en cada interacción con nuestros clientes.
              </p>
            </div>
            <div className="bg-printy-white border border-printy-stone p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-heading-sm text-printy-black mb-2">Sostenibilidad</h3>
              <p className="font-body-sm text-printy-carbon">
                Comprometidos con prácticas productivas responsables y sostenibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading-md text-printy-black mb-6 text-center">
            ¿POR QUÉ ELEGIRNOS?
          </h2>
          <div className="bg-printy-white border border-printy-stone p-8 rounded-lg">
            <ul className="space-y-4">
              {[
                'Blanks premium de marcas reconocidas mundialmente',
                'Amplia catálogo: camisetas, hoodies, tank tops, sudaderas y más',
                'Precios competitivos por volumen',
                'Asesoría personalizada para tu proyecto',
                'Envíos a todo Colombia',
                'Atención al cliente excepcional'
              ].map((item, index) => (
                <li key={index} className="font-body text-printy-carbon flex items-start">
                  <span className="text-printy-military mr-3 mt-1 text-xl">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contáctanos */}
      <section className="py-12 px-6 bg-printy-military text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading-md mb-4">
            ¿LISTO PARA TRABAJAR CON NOSOTROS?
          </h2>
          <p className="font-body mb-6 opacity-90">
            Contáctanos hoy y descubre cómo podemos ayudarte a hacer realidad tus proyectos.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-printy-military px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-gray-100 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </main>
  );
}
