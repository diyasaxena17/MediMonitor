'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MedicationLog, MedicationSchedule } from './types';

type NewMedicationSchedule = Omit<MedicationSchedule, 'id' | 'createdAt'>;

interface MedicationContextType {
  schedules: MedicationSchedule[];
  addSchedule: (schedule: NewMedicationSchedule) => void;
  removeSchedule: (id: string) => void;
  logs: MedicationLog[];
  addLog: (taken: boolean, note?: string) => void;
  resetLogs: () => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([]);
  const [logs, setLogs] = useState<MedicationLog[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('medicationSchedules');
      if (stored) {
        const parsedSchedules = JSON.parse(stored) as Array<
          Omit<MedicationSchedule, 'createdAt'> & { createdAt: string }
        >;

        // Loading an external browser store after mount prevents SSR hydration mismatches.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSchedules(
          parsedSchedules.map((schedule) => ({
            ...schedule,
            createdAt: new Date(schedule.createdAt),
          })),
        );
      }
    } catch {
      localStorage.removeItem('medicationSchedules');
    }

    try {
      const stored = localStorage.getItem('medicationLogs');
      if (stored) {
        const parsedLogs = JSON.parse(stored) as Array<{
          id: string;
          timestamp: string;
          taken: boolean;
        }>;
        setLogs(
          parsedLogs.map((log) => ({
            ...log,
            timestamp: new Date(log.timestamp),
          })),
        );
      }
    } catch {
      localStorage.removeItem('medicationLogs');
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (schedules.length === 0) {
      localStorage.removeItem('medicationSchedules');
      return;
    }

    localStorage.setItem('medicationSchedules', JSON.stringify(schedules));
  }, [hydrated, schedules]);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (logs.length > 0) {
      localStorage.setItem('medicationLogs', JSON.stringify(logs));
    } else {
      localStorage.removeItem('medicationLogs');
    }
  }, [hydrated, logs]);

  const addSchedule = (schedule: NewMedicationSchedule) => {
    const newSchedule: MedicationSchedule = {
      ...schedule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setSchedules((current) => [...current, newSchedule]);
  };

  const removeSchedule = (id: string) => {
    setSchedules((current) => current.filter((schedule) => schedule.id !== id));
  };

  const addLog = (taken: boolean, note?: string) => {
    const newLog: MedicationLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      taken,
      ...(note?.trim() ? { note: note.trim() } : {}),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const resetLogs = () => {
    setLogs([]);
    localStorage.removeItem('medicationLogs');
  };

  return (
    <MedicationContext.Provider
      value={{
        schedules,
        addSchedule,
        removeSchedule,
        logs,
        addLog,
        resetLogs,
      }}
    >
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
