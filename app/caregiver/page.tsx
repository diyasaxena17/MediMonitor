'use client';

import { useMedication } from '../MedicationContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MedicationLog } from '../types';
import { useUser } from '@auth0/nextjs-auth0/client';

const DEMO_LOGS: MedicationLog[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 30), taken: true },
  { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), taken: true },
  { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49), taken: false },
  { id: '4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 73), taken: true },
  { id: '5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 97), taken: true },
  { id: '6', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 121), taken: false },
];

export default function CaregiverPage() {
  const { user } = useUser();
  const { logs, resetLogs } = useMedication();
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12 text-slate-400 text-xl">
            Loading...
          </div>
        </div>
      </main>
    );
  }

  const isPreview = !user;
  const activeLogs = isPreview ? DEMO_LOGS : logs;
  const takenLogs = activeLogs.filter((log: MedicationLog) => log.taken);
  const missedLogs = activeLogs.filter((log: MedicationLog) => !log.taken);
  const adherenceRate = activeLogs.length > 0
    ? Math.round((takenLogs.length / activeLogs.length) * 100)
    : null;

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getLogsForDay = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split('T')[0];
    const dayLogs = activeLogs.filter((log: MedicationLog) => {
      const logDateStr = new Date(log.timestamp).toISOString().split('T')[0];
      return logDateStr === dateStr;
    });
    return {
      taken: dayLogs.filter((l) => l.taken).length,
      missed: dayLogs.filter((l) => !l.taken).length,
    };
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
      <div className="max-w-6xl mx-auto">

        {/* Preview banner */}
        {isPreview && (
          <div className="mb-6 p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sky-200 font-semibold">You are viewing a preview with sample data.</p>
              <p className="text-sky-300/70 text-sm">Sign in to see real medication logs.</p>
            </div>
            <a
              href="/auth/login"
              className="shrink-0 py-2 px-5 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-xl transition"
            >
              Sign in
            </a>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xl text-sky-300 hover:text-sky-200 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          {!isPreview && (
            <div className="float-right space-x-4">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all medication logs? This cannot be undone.')) {
                    resetLogs();
                  }
                }}
                className="py-2 px-4 bg-white/5 hover:bg-white/10 text-red-300 hover:text-red-200 text-sm font-bold rounded-xl border border-red-300/30 inline-block"
                aria-label="Reset medication logs"
              >
                Reset Logs
              </button>
              <a
                href="/auth/logout"
                className="py-2 px-4 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-xl border border-white/15 inline-block"
                aria-label="Sign out"
              >
                Sign out
              </a>
            </div>
          )}
          <h1 className="text-5xl font-bold text-white mb-2">
            Caregiver Dashboard
          </h1>
          <p className="text-xl text-slate-300">
            Medication adherence tracking and monitoring
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-500/20 p-8 rounded-2xl border-2 border-emerald-500/50">
            <div className="text-emerald-200 text-lg font-semibold mb-2">
              Medications Taken
            </div>
            <div className="text-6xl font-bold text-emerald-300">
              {takenLogs.length}
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border-2 border-white/10">
            <div className="text-slate-300 text-lg font-semibold mb-2">
              Medications Missed
            </div>
            <div className="text-6xl font-bold text-slate-200">
              {missedLogs.length}
            </div>
          </div>
          <div className={`p-8 rounded-2xl border-2 ${
            adherenceRate === null ? 'bg-white/5 border-white/10' :
            adherenceRate >= 80 ? 'bg-sky-500/20 border-sky-500/50' :
            adherenceRate >= 50 ? 'bg-yellow-500/20 border-yellow-500/50' :
            'bg-red-500/20 border-red-500/50'
          }`}>
            <div className={`text-lg font-semibold mb-2 ${
              adherenceRate === null ? 'text-slate-300' :
              adherenceRate >= 80 ? 'text-sky-200' :
              adherenceRate >= 50 ? 'text-yellow-200' :
              'text-red-200'
            }`}>
              Adherence Rate
            </div>
            <div className={`text-6xl font-bold ${
              adherenceRate === null ? 'text-slate-400' :
              adherenceRate >= 80 ? 'text-sky-300' :
              adherenceRate >= 50 ? 'text-yellow-300' :
              'text-red-300'
            }`}>
              {adherenceRate === null ? '—' : `${adherenceRate}%`}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={prevMonth}
                className="py-2 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg border border-white/15"
                aria-label="Previous month"
              >
                ← Prev
              </button>
              <button
                onClick={nextMonth}
                className="py-2 px-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg border border-white/15"
                aria-label="Next month"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-slate-300 font-semibold py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
              const day = i + 1;
              const { taken, missed } = getLogsForDay(day);
              const hasLogs = taken > 0 || missed > 0;

              return (
                <div
                  key={day}
                  className={`aspect-square p-2 rounded-lg border-2 flex flex-col items-center justify-center text-center transition ${
                    hasLogs
                      ? 'bg-white/10 border-sky-400/50'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="text-white font-bold text-sm">{day}</div>
                  {hasLogs && (
                    <div className="text-xs mt-1 space-y-1">
                      {taken > 0 && (
                        <div className="text-emerald-300 font-semibold">
                          ✓ {taken}
                        </div>
                      )}
                      {missed > 0 && (
                        <div className="text-red-300 font-semibold">
                          ✗ {missed}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded" />
              <span className="text-emerald-300">Medications Taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span className="text-red-300">Medications Missed</span>
            </div>
          </div>
        </div>

        {/* Logs Display */}
        <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {activeLogs.map((log: MedicationLog) => (
              <div
                key={log.id}
                className={`flex justify-between items-center p-6 rounded-xl border-2 ${
                  log.taken
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                      log.taken ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {log.taken ? '✓' : '✗'}
                  </div>
                  <div>
                    <div className={`text-xl font-semibold ${
                      log.taken ? 'text-emerald-300' : 'text-slate-300'
                    }`}>
                      {log.taken ? 'Medication Taken' : 'Medication Missed'}
                    </div>
                  </div>
                </div>
                <div className="text-slate-400 text-lg">
                  {formatTime(log.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
