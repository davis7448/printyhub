export default function LegalPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            INFORMACIÓN LEGAL
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Información legal y términos de servicio de PrintyHub.
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Terms of Service */}
          <div>
            <h2 className="font-heading-md text-printy-black mb-6">
              TÉRMINOS DE SERVICIO
            </h2>
            <div className="space-y-6 font-body text-printy-carbon">
              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  1. ACEPTACIÓN DE TÉRMINOS
                </h3>
                <p>
                  Al acceder y utilizar los servicios de PrintyHub, usted acepta estar sujeto a estos términos de servicio.
                  Si no está de acuerdo con estos términos, por favor no utilice nuestros servicios.
                </p>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  2. DESCRIPCIÓN DEL SERVICIO
                </h3>
                <p>
                  PrintyHub ofrece servicios de personalización de prendas mediante técnicas de impresión DTF, DTG,
                  bordado, tinte y etiquetado. También comercializamos blanks premium para personalización.
                </p>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  3. RESPONSABILIDADES DEL CLIENTE
                </h3>
                <p>
                  El cliente es responsable de proporcionar diseños de alta calidad y de asegurar que tiene los derechos
                  necesarios para utilizar las imágenes y textos proporcionados para personalización.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div>
            <h2 className="font-heading-md text-printy-black mb-6">
              POLÍTICA DE PRIVACIDAD
            </h2>
            <div className="space-y-6 font-body text-printy-carbon">
              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  1. INFORMACIÓN QUE RECOPILAMOS
                </h3>
                <p>
                  Recopilamos información personal necesaria para procesar sus pedidos, incluyendo nombre,
                  información de contacto, datos de facturación y detalles del proyecto.
                </p>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  2. USO DE LA INFORMACIÓN
                </h3>
                <p>
                  Utilizamos su información para procesar pedidos, proporcionar cotizaciones, mejorar nuestros
                  servicios y comunicarnos con usted sobre su proyecto.
                </p>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  3. PROTECCIÓN DE DATOS
                </h3>
                <p>
                  Implementamos medidas de seguridad para proteger su información personal contra acceso no autorizado,
                  alteración, divulgación o destrucción.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div>
            <h2 className="font-heading-md text-printy-black mb-6">
              ENVÍOS Y DEVOLUCIONES
            </h2>
            <div className="space-y-6 font-body text-printy-carbon">
              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  POLÍTICA DE ENVÍOS
                </h3>
                <p>
                  Realizamos envíos a nivel nacional e internacional. Los tiempos de entrega varían según
                  la ubicación y el método de envío seleccionado. Ofrecemos seguimiento de pedidos.
                </p>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  POLÍTICA DE DEVOLUCIONES
                </h3>
                <p>
                  Aceptamos devoluciones dentro de los primeros 7 días posteriores a la entrega, siempre y cuando
                  los productos estén en su estado original. Los costos de envío de devolución corren por cuenta del cliente.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-printy-smoke p-6 rounded-lg text-center">
            <h2 className="font-heading-md text-printy-black mb-4">
              ¿TIENE PREGUNTAS SOBRE NUESTRA POLÍTICA?
            </h2>
            <p className="font-body text-printy-carbon mb-6">
              Si tiene alguna pregunta sobre estos términos o necesita aclaraciones,
              no dude en contactarnos.
            </p>
            <a
              href="/contact"
              className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}