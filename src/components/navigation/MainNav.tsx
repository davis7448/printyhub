'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function MainNav() {
  const { user, logout, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (loading) {
    return <div className="h-16 bg-white border-b animate-pulse"></div>;
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-wider text-printy-military">
              PrintyHub
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-6">
              <NavLink href="/shop">Catálogo</NavLink>
              <NavLink href="/services">Servicios</NavLink>
              <NavLink href="/about">Nosotros</NavLink>
              <NavLink href="/contact">Contacto</NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="hidden md:block">{user.contactName || user.email}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 text-gray-800 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">{user.contactName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-printy-military text-white">
                        {user.role}
                      </span>
                    </div>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Mi Dashboard
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-printy-military hover:text-printy-deep-blue font-medium transition-colors">
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="bg-printy-military text-white px-4 py-2 rounded-lg hover:bg-printy-deep-blue transition-colors font-medium">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <div className="md:hidden border-t px-4 py-2 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
            {user.role === 'client' && (
              <>
                <MobileNavLink href="/dashboard/quotes/new">Nueva Cotización</MobileNavLink>
                <MobileNavLink href="/dashboard/orders">Mis Pedidos</MobileNavLink>
              </>
            )}
            {(user.role === 'admin' || user.role === 'commercial') && (
              <>
                <MobileNavLink href="/admin/products">Productos</MobileNavLink>
                <MobileNavLink href="/admin/orders">Pedidos</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-printy-military font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1 text-sm rounded bg-white border hover:bg-gray-100 transition-colors"
    >
      {children}
    </Link>
  );
}
