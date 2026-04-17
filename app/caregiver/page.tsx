'use client';

import { useMedication } from '../MedicationContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MedicationLog } from '../types';
import { useUser } from '@auth0/nextjs-auth0/client';

const DEMO_LOGS: MedicationLog[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 30), taken: true, note: 'took with breakfast' },
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
  const [showResetModal, setShowResetModal] = useState(false);

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

  // Streak: consecutive days (going back from today) where at least one dose was taken and none missed
  const streak = (() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const dateStr = day.toISOString().split('T')[0];
      const dayLogs = activeLogs.filter(
        (l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] === dateStr
      );
      if (dayLogs.length === 0) break;
      if (dayLogs.some((l: MedicationLog) => !l.taken)) break;
      count++;
    }
    return count;
  })();

  // Longest streak: scan all unique log days in order
  const longestStreak = (() => {
    const uniqueDays = [...new Set(
      activeLogs.map((l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0])
    )].sort();

    let best = 0;
    let current = 0;
    let prevDate: Date | null = null;

    for (const dateStr of uniqueDays) {
      const dayLogs = activeLogs.filter(
        (l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] === dateStr
      );
      const allTaken = dayLogs.every((l: MedicationLog) => l.taken);
      const day = new Date(dateStr);
      const isConsecutive = prevDate
        ? (day.getTime() - prevDate.getTime()) === 864e5
        : true;

      if (allTaken && isConsecutive) {
        current++;
        best = Math.max(best, current);
      } else {
        current = allTaken ? 1 : 0;
        if (allTaken) best = Math.max(best, current);
      }
      prevDate = day;
    }
    return best;
  })();

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
          <div className="flex gap-6 mb-4">
            <Link href="/" className="text-xl text-sky-300 hover:text-sky-200">
              ← Back to Home
            </Link>
            <Link href="/track" className="text-xl text-sky-300 hover:text-sky-200">
              Tracker →
            </Link>
          </div>
          {!isPreview && (
            <div className="float-right space-x-4">
              <button
                onClick={() => setShowResetModal(true)}
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

        {/* 7-day strip */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 mb-8">
          <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-4">Past 7 Days</p>
          <div className="flex justify-between gap-2">
            {Array.from({ length: 7 }).map((_, i) => {
              const day = new Date();
              day.setDate(day.getDate() - (6 - i));
              const dateStr = day.toISOString().split('T')[0];
              const dayLogs = activeLogs.filter(
                (l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] === dateStr
              );
              const hasTaken = dayLogs.some((l: MedicationLog) => l.taken);
              const hasMissed = dayLogs.some((l: MedicationLog) => !l.taken);
              const isToday = i === 6;

              let dotColor = 'bg-white/10 border-white/10';
              let label = 'No log';
              if (hasTaken && !hasMissed) { dotColor = 'bg-emerald-500 border-emerald-400'; label = 'Taken'; }
              else if (hasMissed && !hasTaken) { dotColor = 'bg-red-500 border-red-400'; label = 'Missed'; }
              else if (hasTaken && hasMissed) { dotColor = 'bg-yellow-500 border-yellow-400'; label = 'Mixed'; }

              return (
                <div key={dateStr} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-full aspect-square rounded-full border-2 ${dotColor} ${isToday ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' : ''}`}
                    title={`${day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}: ${label}`}
                  />
                  <span className={`text-xs font-medium ${isToday ? 'text-white' : 'text-slate-500'}`}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-6 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Taken</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Missed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />Mixed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white/10 inline-block" />No log</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
          <div className={`p-8 rounded-2xl border-2 ${streak >= 3 ? 'bg-orange-500/20 border-orange-500/50' : 'bg-white/5 border-white/10'}`}>
            <div className={`text-lg font-semibold mb-2 ${streak >= 3 ? 'text-orange-200' : 'text-slate-300'}`}>
              Day Streak
            </div>
            <div className={`text-6xl font-bold ${streak >= 3 ? 'text-orange-300' : 'text-slate-200'}`}>
              {streak === 0 ? '—' : streak}
            </div>
            {streak > 0 && (
              <div className="text-sm mt-2 text-slate-400">
                {streak === 1 ? 'day in a row' : 'days in a row'}
              </div>
            )}
          </div>
          <div className="p-8 rounded-2xl border-2 bg-white/5 border-white/10">
            <div className="text-slate-300 text-lg font-semibold mb-2">
              Longest Streak
            </div>
            <div className="text-6xl font-bold text-slate-200">
              {longestStreak === 0 ? '—' : longestStreak}
            </div>
            {longestStreak > 0 && (
              <div className="text-sm mt-2 text-slate-400">
                {longestStreak === 1 ? 'day' : 'days'} best
              </div>
            )}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Recent Activity</h2>
            {activeLogs.length > 0 && (
              <button
                onClick={() => {
                  const rows = [
                    ['Date', 'Time', 'Status', 'Note'],
                    ...activeLogs.map((l: MedicationLog) => {
                      const d = new Date(l.timestamp);
                      return [
                        d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                        l.taken ? 'Taken' : 'Missed',
                        l.note ?? '',
                      ];
                    }),
                  ];
                  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `medication-logs-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="py-2 px-4 bg-white/5 hover:bg-white/10 text-sky-300 hover:text-sky-200 text-sm font-bold rounded-xl border border-sky-300/30 transition"
                aria-label="Export logs as CSV"
              >
                Export CSV
              </button>
            )}
          </div>

          {(() => {
            const todayStr = new Date().toISOString().split('T')[0];
            const yesterdayStr = new Date(Date.now() - 864e5).toISOString().split('T')[0];

            const groups: { label: string; logs: MedicationLog[] }[] = [
              { label: 'Today', logs: activeLogs.filter((l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] === todayStr) },
              { label: 'Yesterday', logs: activeLogs.filter((l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] === yesterdayStr) },
              { label: 'Earlier', logs: activeLogs.filter((l: MedicationLog) => new Date(l.timestamp).toISOString().split('T')[0] < yesterdayStr) },
            ].filter(g => g.logs.length > 0);

            if (groups.length === 0) {
              return (
                <div className="text-center py-12 text-slate-400 text-xl">
                  No medication logs yet. Go to the tracker to log your first medication.
                </div>
              );
            }

            return (
              <div className="space-y-8">
                {groups.map(group => (
                  <div key={group.label}>
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-3">
                      {group.label}
                    </h3>
                    <div className="space-y-4">
                      {group.logs.map((log: MedicationLog) => (
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
                              {log.note && (
                                <div className="text-sm text-slate-400 mt-1">{log.note}</div>
                              )}
                            </div>
                          </div>
                          <div className="text-slate-400 text-lg">
                            {formatTime(log.timestamp)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

      </div>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Reset all logs?</h2>
              <p className="text-slate-400">This will permanently delete all medication logs. This cannot be undone.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { resetLogs(); setShowResetModal(false); }}
                className="flex-1 py-3 px-6 bg-red-500 hover:bg-red-400 text-white font-bold rounded-2xl transition"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/15 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
