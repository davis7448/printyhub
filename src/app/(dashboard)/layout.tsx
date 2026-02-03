'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { QuoteProvider } from '@/contexts/QuoteContext';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QuoteProvider>
        <Toaster position="top-right" />
        {children}
      </QuoteProvider>
    </AuthProvider>
  );
}
