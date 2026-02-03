import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Video Background */}
      <section className="relative h-screen flex items-center justify-center bg-printy-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/1111(1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="font-heading-xl text-white mb-6">
            BLANKS PREMIUM PARA TU MARCA
          </h1>
          <p className="font-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Descubre nuestra colección de blanks premium hechos con los mejores materiales.
            Perfectos para personalización con técnicas de impresión de alta calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-printy-military text-printy-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-printy-military/90 transition-colors focus-ring"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/apply"
              className="border-2 border-white text-white px-8 py-4 font-league-spartan uppercase tracking-wider hover:bg-white hover:text-printy-military transition-colors focus-ring"
            >
              Aplicar a B2B
            </Link>
          </div>
        </div>
      </section>

      {/* Nuestros Blanks Section */}
      <section className="py-20 px-6 bg-printy-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading-lg text-printy-black text-center mb-12">
            NUESTROS BLANKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                <Image
                  src="/images/tshirt.jpg"
                  alt="T-Shirt Premium"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">T-SHIRTS</h3>
              <p className="font-body text-printy-carbon">
                Oversize premium con algodón peruano 100%
              </p>
            </div>
            <div className="text-center">
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                <Image
                  src="/images/HOODIE.png"
                  alt="Hoodie Premium"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">HOODIES</h3>
              <p className="font-body text-printy-carbon">
                Con capucha y bolsillo canguro, máxima comodidad
              </p>
            </div>
            <div className="text-center">
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                <Image
                  src="/images/TANKTOPS.png"
                  alt="Tank Top Premium"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">TANK TOPS</h3>
              <p className="font-body text-printy-carbon">
                Deportivos y versátiles para diseños minimalistas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section - Larger Images */}
      <section className="py-20 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading-lg text-printy-black text-center mb-12">
            SERVICIOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'DTF', desc: 'Impresión directa a tela', img: '/images/DTF.png' },
              { name: 'DTG', desc: 'Impresión digital directa', img: '/images/DTG.png' },
              { name: 'Bordado', desc: 'Bordado profesional', img: '/images/BORDADO.png' },
              { name: 'Tinte', desc: 'Tinte personalizado', img: '/images/TINTE.png' },
              { name: 'Etiquetado', desc: 'Etiquetas a medida', img: '/images/ETIQEUTADO.png' }
            ].map((service) => (
              <div key={service.name} className="bg-printy-white p-6 text-center rounded-xl hover:shadow-lg transition-shadow h-full">
                <div className="w-full h-40 mb-4 relative">
                  <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <h3 className="font-heading-sm text-printy-black mb-2">{service.name}</h3>
                <p className="font-body-sm text-printy-carbon mb-3">{service.desc}</p>
                <Link
                  href="/services"
                  className="text-printy-military font-league-spartan uppercase tracking-wider text-sm hover:underline focus-ring"
                >
                  Ver más
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso & Tiempos Section - With Images */}
      <section className="py-20 px-6 bg-printy-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading-lg text-printy-black text-center mb-12">
            PROCESO & TIEMPOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-full h-48 mb-6 relative flex items-center justify-center">
                <Image
                  src="/images/DISEÑO.png"
                  alt="Diseño"
                  width={180}
                  height={180}
                  className="object-contain rounded-full shadow-lg"
                />
              </div>
              <div className="w-16 h-16 bg-printy-military rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-printy-white font-heading-sm text-xl">1</span>
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">DISEÑO</h3>
              <p className="font-body text-printy-carbon">
                Revisamos y optimizamos tu diseño para el mejor resultado
              </p>
            </div>
            <div className="text-center">
              <div className="w-full h-48 mb-6 relative flex items-center justify-center">
                <Image
                  src="/images/PRODUCCION.png"
                  alt="Producción"
                  width={180}
                  height={180}
                  className="object-contain rounded-full shadow-lg"
                />
              </div>
              <div className="w-16 h-16 bg-printy-military rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-printy-white font-heading-sm text-xl">2</span>
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">PRODUCCIÓN</h3>
              <p className="font-body text-printy-carbon">
                Fabricamos con técnicas premium y control de calidad
              </p>
            </div>
            <div className="text-center">
              <div className="w-full h-48 mb-6 relative flex items-center justify-center">
                <Image
                  src="/images/DESPACHO.png"
                  alt="Despacho"
                  width={180}
                  height={180}
                  className="object-contain rounded-full shadow-lg"
                />
              </div>
              <div className="w-16 h-16 bg-printy-military rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-printy-white font-heading-sm text-xl">3</span>
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">ENTREGA</h3>
              <p className="font-body text-printy-carbon">
                Envío rápido y seguro a tu ubicación
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/turnaround"
              className="bg-printy-deep-blue text-printy-white px-6 py-3 font-league-spartan uppercase tracking-wider hover:bg-printy-deep-blue/90 transition-colors focus-ring"
            >
              Ver Tiempos de Entrega
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
