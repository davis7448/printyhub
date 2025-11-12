import type { Metadata } from "next";
import { Bebas_Neue, Anton, League_Spartan, Inter } from "next/font/google";
import "./globals.css";
import {
  ToggleVault,
  ToggleVaultTrigger,
  ToggleVaultContent,
  ToggleVaultClose,
} from "@/components/ui/toggle-vault";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const anton = Anton({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-anton",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PrintyHub - Blanks Premium para tu Marca",
  description: "Blanks premium de alta calidad para personalización. Servicios de DTF, DTG, Bordado, Tinte y Etiquetado.",
  icons: {
    icon: "/logo icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${anton.variable} ${leagueSpartan.variable} ${inter.variable} font-inter antialiased bg-printy-white text-printy-black`}
      >
        {children}
        <div className="fixed top-4 right-4 z-50">
          <ToggleVault>
            <ToggleVaultTrigger className="w-20 h-8 text-sm rounded-none shadow-none">
              MENU
            </ToggleVaultTrigger>
            <ToggleVaultClose className="w-20 h-8 text-sm rounded-none shadow-none">
              CLOSE
            </ToggleVaultClose>
            <ToggleVaultContent className="w-[90vw] max-w-[350px] h-[350px] p-8 text-lg flex flex-col gap-4 font-league-spartan uppercase">
              <Link href="/" className="hover:text-printy-military transition-colors">INICIO</Link>
              <Link href="/shop" className="hover:text-printy-military transition-colors">CATÁLOGO</Link>
              <Link href="/services" className="hover:text-printy-military transition-colors">SERVICIOS</Link>
              <Link href="/turnaround" className="hover:text-printy-military transition-colors">TIEMPOS</Link>
              <Link href="/contact" className="hover:text-printy-military transition-colors">CONTACTO</Link>
              <Link href="/apply" className="hover:text-printy-military transition-colors">APLICAR B2B</Link>
            </ToggleVaultContent>
          </ToggleVault>
        </div>
      </body>
    </html>
  );
}
