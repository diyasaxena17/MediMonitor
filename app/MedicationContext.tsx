'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MedicationLog } from './types';

interface MedicationContextType {
  logs: MedicationLog[];
  addLog: (taken: boolean) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<MedicationLog[]>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('medicationLogs');
      if (stored) {
        const parsedLogs = JSON.parse(stored) as Array<{
          id: string;
          timestamp: string;
          taken: boolean;
        }>;
        return parsedLogs.map((log) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
      }
    }
    return [];
  });

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('medicationLogs', JSON.stringify(logs));
    }
  }, [logs]);

  const addLog = (taken: boolean) => {
    const newLog: MedicationLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      taken,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <MedicationContext.Provider value={{ logs, addLog }}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedication() {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
}
