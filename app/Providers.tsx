'use client';

import { MedicationProvider } from './MedicationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MedicationProvider>
      {children}
    </MedicationProvider>
  );
}
