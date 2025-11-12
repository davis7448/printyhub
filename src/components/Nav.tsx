import Link from 'next/link';
import Image from 'next/image';
import {
  ToggleVault,
  ToggleVaultTrigger,
  ToggleVaultContent,
  ToggleVaultClose,
} from "@/components/ui/toggle-vault";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-printy-stone shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-1">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="PrintyHub"
              width={120}
              height={40}
              className="h-16 w-auto"
            />
          </Link>
          <ToggleVault>
            <ToggleVaultTrigger className="w-20 h-8 text-sm">
              MENU
            </ToggleVaultTrigger>
            <ToggleVaultClose className="w-20 h-8 text-sm">
              CLOSE
            </ToggleVaultClose>
            <ToggleVaultContent className="w-[300px] h-[250px] p-8 text-xl flex flex-col gap-4">
              <Link href="/" className="hover:text-printy-military transition-colors">INICIO</Link>
              <Link href="/shop" className="hover:text-printy-military transition-colors">CATÁLOGO</Link>
              <Link href="/services" className="hover:text-printy-military transition-colors">SERVICIOS</Link>
              <Link href="/turnaround" className="hover:text-printy-military transition-colors">TIEMPOS</Link>
              <Link href="/contact" className="hover:text-printy-military transition-colors">CONTACTO</Link>
              <Link href="/apply" className="hover:text-printy-military transition-colors">APLICAR B2B</Link>
            </ToggleVaultContent>
          </ToggleVault>
        </div>
      </div>
    </nav>
  );
}