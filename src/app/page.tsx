import Link from 'next/link';
import Image from 'next/image';
import Nav from '../components/Nav';
import { MorphyButton } from '@/components/ui/morphy-button';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="inline-block p-4 ml-8">
        <Image
          src="/Logo.png"
          alt="PrintyHub"
          width={120}
          height={40}
          className="h-16 w-auto"
        />
      </div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-printy-white">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/1111(1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-printy-smoke to-printy-stone opacity-50"></div>
        <div className="relative z-10 text-center max-w-none md:max-w-4xl mx-auto px-6">
          <h1 className="font-heading-xl text-white mb-6">
            BLANKS PREMIUM PARA TU MARCA
          </h1>
          <p className="font-body-lg text-white mb-8 max-w-2xl mx-auto">
            Descubre nuestra colección de blanks premium hechos con los mejores materiales.
            Perfectos para personalización con técnicas de impresión de alta calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <MorphyButton size="lg" className="rounded-none font-league-spartan uppercase tracking-wider">
                Ver Catálogo
              </MorphyButton>
            </Link>
            <Link href="/apply">
              <MorphyButton size="lg" animate="reverse" className="rounded-none font-league-spartan uppercase tracking-wider">
                Aplicar a B2B
              </MorphyButton>
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
            <div className="text-center flex flex-col justify-between min-h-[400px]">
              <div className="w-full h-64 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/tshirt.jpg"
                  alt="T-Shirts"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">T-SHIRTS</h3>
              <p className="font-body text-printy-carbon mb-4">
                Oversize premium con algodón peruano 100%
              </p>
              <Link href="/shop">
                <MorphyButton animate="reverse" className="rounded-none font-league-spartan uppercase tracking-wider">
                  Ver T-shirts
                </MorphyButton>
              </Link>
            </div>
            <div className="text-center flex flex-col justify-between min-h-[400px]">
              <div className="w-full h-64 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/HOODIE.png"
                  alt="Hoodies"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">HOODIES</h3>
              <p className="font-body text-printy-carbon mb-4">
                Con capucha y bolsillo canguro, máxima comodidad
              </p>
              <Link href="/shop">
                <MorphyButton animate="reverse" className="rounded-none font-league-spartan uppercase tracking-wider">
                  Ver Hoodies
                </MorphyButton>
              </Link>
            </div>
            <div className="text-center flex flex-col justify-between min-h-[400px]">
              <div className="w-full h-64 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/TANKTOPS.png"
                  alt="Tank Tops"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">TANK TOPS</h3>
              <p className="font-body text-printy-carbon mb-4">
                Deportivos y versátiles para diseños minimalistas
              </p>
              <Link href="/shop">
                <MorphyButton animate="reverse" className="rounded-none font-league-spartan uppercase tracking-wider">
                  Ver Tank Tops
                </MorphyButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-20 px-6 bg-printy-smoke">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading-lg text-printy-black text-center mb-12">
            SERVICIOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'DTF', desc: 'Impresión directa a tela de alta calidad', image: 'DTF.png' },
              { name: 'DTG', desc: 'Impresión digital directa en prenda', image: 'DTG.png' },
              { name: 'Bordado', desc: 'Bordado computarizado profesional', image: 'BORDADO.png' },
              { name: 'Tinte', desc: 'Tinte directo personalizado', image: 'TINTE.png' },
              { name: 'Etiquetado', desc: 'Etiquetas personalizadas', image: 'ETIQEUTADO.png' }
            ].map((service) => (
              <div key={service.name} className="bg-printy-white p-6 text-center rounded-lg">
                <div className="w-full h-32 mb-4 overflow-hidden rounded">
                  <Image
                    src={`/${service.image}`}
                    alt={service.name}
                    width={200}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading-sm text-printy-black mb-2">{service.name}</h3>
                <p className="font-body-sm text-printy-carbon mb-4">{service.desc}</p>
                <Link href="/services">
                  <MorphyButton animate="reverse" className="rounded-none font-league-spartan uppercase tracking-wider">
                    Cotizar
                  </MorphyButton>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso & Tiempos Section */}
      <section className="py-20 px-6 bg-printy-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading-lg text-printy-black text-center mb-12">
            PROCESO & TIEMPOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src="/DISEÑO.png"
                  alt="Diseño"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">DISEÑO</h3>
              <p className="font-body text-printy-carbon">
                Revisamos y optimizamos tu diseño para el mejor resultado
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src="/PRODUCCION.png"
                  alt="Producción"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading-md text-printy-black mb-2">PRODUCCIÓN</h3>
              <p className="font-body text-printy-carbon">
                Fabricamos con técnicas premium y control de calidad
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src="/DESPACHO.png"
                  alt="Entrega"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
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
