'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { QuoteProvider } from '@/contexts/QuoteContext';
import { Toaster } from 'react-hot-toast';
import DashboardNav from '@/components/navigation/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QuoteProvider>
        <Toaster position="top-right" />
        <DashboardNav />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </QuoteProvider>
    </AuthProvider>
  );
}
