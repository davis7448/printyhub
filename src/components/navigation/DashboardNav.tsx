'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardNav() {
  const { user, logout, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (loading) {
    return <div className="h-16 bg-printy-military"></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-printy-military text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold tracking-wider">
              PrintyHub
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-1">
              <NavLink href="/dashboard">Inicio</NavLink>
              
              {user.role === 'client' && (
                <>
                  <NavLink href="/dashboard/quotes/new">Nueva Cotización</NavLink>
                  <NavLink href="/dashboard/orders">Mis Pedidos</NavLink>
                </>
              )}
              
              {(user.role === 'admin' || user.role === 'commercial') && (
                <>
                  <NavLink href="/admin/products">Productos</NavLink>
                  <NavLink href="/admin/orders">Pedidos</NavLink>
                  <NavLink href="/admin/users">Usuarios</NavLink>
                  <NavLink href="/admin/pricing">Precios</NavLink>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-printy-deep-blue transition-colors"
              >
                <span className="hidden md:block">{user.name || user.email}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 text-gray-800">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-printy-military text-white">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-printy-deep-blue px-4 py-2">
        <div className="flex flex-wrap gap-2">
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
              <MobileNavLink href="/admin/users">Usuarios</MobileNavLink>
              <MobileNavLink href="/admin/pricing">Precios</MobileNavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-printy-deep-blue transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1 text-sm rounded bg-printy-deep-blue hover:bg-opacity-80 transition-colors"
    >
      {children}
    </Link>
  );
}
