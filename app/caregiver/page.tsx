'use client';

import { useMedication } from '../MedicationContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MedicationLog } from '../types';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function CaregiverPage() {
  const { status } = useSession();
  const { logs } = useMedication();
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
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12 text-gray-500 text-xl">
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow p-8 text-center space-y-6">
            <h1 className="text-4xl font-bold text-black">Caregiver Dashboard</h1>
            <p className="text-lg text-gray-700">Please sign in to view the dashboard.</p>
            <div className="flex justify-center gap-4">
              <Link href="/" className="text-xl underline text-gray-700 hover:text-black">Back to Home</Link>
              <button
                onClick={() => signIn('google')}
                className="py-3 px-6 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-700 active:bg-blue-800"
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
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xl text-gray-600 hover:text-black mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="float-right">
            <button
              onClick={() => signOut()}
              className="py-2 px-4 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 active:bg-gray-700"
              aria-label="Sign out"
            >
              Sign out
            </button>
          </div>
          <h1 className="text-5xl font-bold text-black mb-2">
            Caregiver Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Medication adherence tracking and monitoring
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-100 p-8 rounded-2xl border-4 border-green-600">
            <div className="text-green-800 text-lg font-semibold mb-2">
              Medications Taken
            </div>
            <div className="text-6xl font-bold text-green-900">
              {takenLogs.length}
            </div>
          </div>
          <div className="bg-red-100 p-8 rounded-2xl border-4 border-red-600">
            <div className="text-red-800 text-lg font-semibold mb-2">
              Medications Missed
            </div>
            <div className="text-6xl font-bold text-red-900">
              {missedLogs.length}
            </div>
          </div>
        </div>

        {/* Logs Display */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            Recent Activity
          </h2>

          {logs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xl">
              No medication logs yet. Go to the home page to log your first medication.
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log: MedicationLog) => (
                <div
                  key={log.id}
                  className={`flex justify-between items-center p-6 rounded-xl border-2 ${
                    log.taken
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        log.taken ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {log.taken ? '✓' : '✗'}
                    </div>
                    <div>
                      <div className={`text-xl font-semibold ${
                        log.taken ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {log.taken ? 'Medication Taken' : 'Medication Missed'}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 text-lg">
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
