import type { Metadata } from "next";
import { Bebas_Neue, Anton, League_Spartan, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import MainNav from "@/components/navigation/MainNav";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${anton.variable} ${leagueSpartan.variable} ${inter.variable} font-inter antialiased bg-printy-white text-printy-black pt-16`}
      >
        <Providers>
          <MainNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
