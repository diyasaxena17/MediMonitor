'use client';

import { useMedication } from '../MedicationContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MedicationLog } from '../types';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function CaregiverPage() {
  const { status } = useSession();
  const { logs, resetLogs } = useMedication();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is intentional to prevent hydration issues with localStorage
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur p-8 text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">Caregiver Dashboard</h1>
            <p className="text-lg text-slate-200">Please sign in to view the dashboard.</p>
            <div className="flex justify-center gap-4">
              <Link href="/" className="text-xl underline text-sky-300 hover:text-sky-200">Back to Home</Link>
              <button
                onClick={() => signIn('google')}
                className="py-3 px-6 bg-sky-500 hover:bg-sky-400 text-black text-xl font-bold rounded-2xl shadow-lg shadow-sky-500/20"
                aria-label="Sign in with Google"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const takenLogs = logs.filter((log: MedicationLog) => log.taken);
  const missedLogs = logs.filter((log: MedicationLog) => !log.taken);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xl text-sky-300 hover:text-sky-200 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
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
            <button
              onClick={() => signOut()}
              className="py-2 px-4 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-xl border border-white/15"
              aria-label="Sign out"
            >
              Sign out
            </button>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">
            Caregiver Dashboard
          </h1>
          <p className="text-xl text-slate-300">
            Medication adherence tracking and monitoring
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        </div>

        {/* Logs Display */}
        <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          {logs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xl">
              No medication logs yet. Go to the home page to log your first medication.
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log: MedicationLog) => (
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
          )}
        </div>
      </div>
    </main>
  );
}
