export default function ContactPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            CONTACTO
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos para cualquier consulta sobre nuestros
            productos y servicios.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="font-heading-md text-printy-black mb-4">
                  INFORMACIÓN DE CONTACTO
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-printy-military rounded-full flex items-center justify-center mt-1">
                      <span className="text-printy-white text-sm">📧</span>
                    </div>
                    <div>
                      <p className="font-body-sm text-printy-carbon">Email</p>
                      <p className="font-body text-printy-black">contacto@printyhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-printy-military rounded-full flex items-center justify-center mt-1">
                      <span className="text-printy-white text-sm">📱</span>
                    </div>
                    <div>
                      <p className="font-body-sm text-printy-carbon">WhatsApp</p>
                      <p className="font-body text-printy-black">+57 300 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-printy-military rounded-full flex items-center justify-center mt-1">
                      <span className="text-printy-white text-sm">📍</span>
                    </div>
                    <div>
                      <p className="font-body-sm text-printy-carbon">Ubicación</p>
                      <p className="font-body text-printy-black">Bogotá, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading-sm text-printy-black mb-3">
                  HORARIOS DE ATENCIÓN
                </h3>
                <div className="space-y-1 font-body-sm text-printy-carbon">
                  <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábado: 9:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="bg-printy-smoke p-6 rounded-lg">
              <h3 className="font-heading-md text-printy-black mb-4">
                ENVÍANOS UN MENSAJE
              </h3>
              <p className="font-body-sm text-printy-carbon mb-4">
                Para consultas comerciales, soporte técnico o información general,
                escríbenos por WhatsApp o envíanos un email.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white px-6 py-3 font-league-spartan uppercase tracking-wider text-sm hover:bg-green-700 transition-colors focus-ring text-center block"
                >
                  WhatsApp
                </a>

                <a
                  href="mailto:contacto@printyhub.com"
                  className="w-full bg-printy-military text-printy-white px-6 py-3 font-league-spartan uppercase tracking-wider text-sm hover:bg-printy-military/90 transition-colors focus-ring text-center block"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading-md text-printy-black mb-4">
            ¿NECESITAS AYUDA INMEDIATA?
          </h2>
          <p className="font-body text-printy-carbon mb-6">
            Para solicitudes de cotización, pedidos urgentes o consultas técnicas,
            nuestro equipo está disponible para atenderte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/apply"
              className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Solicitar Cotización
            </a>
            <a
              href="/help"
              className="border-2 border-printy-military text-printy-military px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military hover:text-printy-white transition-colors focus-ring"
            >
              Ver FAQ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}