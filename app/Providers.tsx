'use client';

import { SessionProvider } from 'next-auth/react';
import { MedicationProvider } from './MedicationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MedicationProvider>
        {children}
      </MedicationProvider>
    </SessionProvider>
  );
}
