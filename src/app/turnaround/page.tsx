const turnaroundData = [
  {
    service: 'DTF (Direct To Film)',
    times: [
      { quantity: '1-24', time: '3 días hábiles' },
      { quantity: '25-99', time: '4 días hábiles' },
      { quantity: '100-499', time: '5 días hábiles' },
      { quantity: '500+', time: '7 días hábiles' }
    ]
  },
  {
    service: 'DTG (Direct To Garment)',
    times: [
      { quantity: '1-24', time: '2 días hábiles' },
      { quantity: '25-99', time: '3 días hábiles' },
      { quantity: '100-499', time: '4 días hábiles' },
      { quantity: '500+', time: '5 días hábiles' }
    ]
  },
  {
    service: 'Bordado Computarizado',
    times: [
      { quantity: '1-24', time: '4 días hábiles' },
      { quantity: '25-99', time: '5 días hábiles' },
      { quantity: '100-499', time: '6 días hábiles' },
      { quantity: '500+', time: '7 días hábiles' }
    ]
  },
  {
    service: 'Tinte Directo',
    times: [
      { quantity: '1-24', time: '5 días hábiles' },
      { quantity: '25-99', time: '6 días hábiles' },
      { quantity: '100-499', time: '7 días hábiles' },
      { quantity: '500+', time: '8 días hábiles' }
    ]
  },
  {
    service: 'Etiquetado Personalizado',
    times: [
      { quantity: '1-99', time: '2 días hábiles' },
      { quantity: '100-499', time: '3 días hábiles' },
      { quantity: '500+', time: '4 días hábiles' }
    ]
  }
];

export default function TurnaroundPage() {
  return (
    <main className="min-h-screen bg-printy-white">
      {/* Header */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading-lg text-printy-black text-center mb-4">
            TIEMPOS DE ENTREGA
          </h1>
          <p className="font-body text-printy-carbon text-center max-w-2xl mx-auto">
            Conoce nuestros tiempos de producción estándar. Los plazos pueden variar
            según la complejidad del diseño y la temporada.
          </p>
        </div>
      </section>

      {/* Turnaround Tables */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {turnaroundData.map((service) => (
            <div key={service.service} className="bg-printy-white border border-printy-stone p-6">
              <h2 className="font-heading-md text-printy-black mb-6">
                {service.service}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-printy-stone">
                      <th className="text-left py-3 px-4 font-league-spartan uppercase tracking-wider text-sm text-printy-black">
                        Cantidad
                      </th>
                      <th className="text-left py-3 px-4 font-league-spartan uppercase tracking-wider text-sm text-printy-black">
                        Tiempo de Entrega
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.times.map((time, index) => (
                      <tr key={index} className="border-b border-printy-stone/50 hover:bg-printy-smoke/50 transition-colors">
                        <td className="py-4 px-4 font-body text-printy-black">
                          {time.quantity} unidades
                        </td>
                        <td className="py-4 px-4 font-body text-printy-military font-medium">
                          {time.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 px-6 bg-printy-smoke">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading-md text-printy-black text-center mb-6">
            INFORMACIÓN ADICIONAL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-printy-white p-6">
              <h3 className="font-heading-sm text-printy-black mb-3">
                FACTORES QUE PUEDEN AFECTAR LOS TIEMPOS
              </h3>
              <ul className="space-y-2 font-body-sm text-printy-carbon">
                <li>• Complejidad del diseño</li>
                <li>• Número de colores en el diseño</li>
                <li>• Técnica de impresión requerida</li>
                <li>• Temporada alta de producción</li>
                <li>• Personalización especial</li>
              </ul>
            </div>

            <div className="bg-printy-white p-6">
              <h3 className="font-heading-sm text-printy-black mb-3">
                OPCIONES EXPRESS
              </h3>
              <p className="font-body-sm text-printy-carbon mb-3">
                Ofrecemos servicios express con tiempos reducidos para pedidos urgentes.
                Los costos adicionales aplican según la urgencia.
              </p>
              <p className="font-body-sm text-printy-military font-medium">
                Contáctanos para cotizar opciones express
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="font-body text-printy-carbon mb-4">
              ¿Tienes preguntas sobre tiempos de entrega o necesitas una cotización personalizada?
            </p>
            <a
              href="/apply"
              className="inline-block bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Solicitar Información
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}