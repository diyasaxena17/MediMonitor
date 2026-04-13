'use client';

import { useMedication } from '../MedicationContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MedicationLog } from '../types';

type LogResult = 'taken' | 'missed' | null;

function useElapsed(timestamp: Date | null) {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!timestamp) return;

    const update = () => {
      const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
      if (seconds < 60) setElapsed(`${seconds}s ago`);
      else if (seconds < 3600) setElapsed(`${Math.floor(seconds / 60)}m ago`);
      else if (seconds < 86400) setElapsed(`${Math.floor(seconds / 3600)}h ago`);
      else setElapsed(`${Math.floor(seconds / 86400)}d ago`);
    };

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return elapsed;
}

export default function TrackPage() {
  const { addLog, logs } = useMedication();
  const [lastLog, setLastLog] = useState<LogResult>(null);

  const mostRecentLog: MedicationLog | null = logs.length > 0 ? logs[0] : null;
  const elapsed = useElapsed(mostRecentLog ? mostRecentLog.timestamp : null);

  // Text-to-speech on page load
  useEffect(() => {
    const speak = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Time to take your medication');
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    };

    const timer = setTimeout(speak, 500);
    return () => clearTimeout(timer);
  }, []);

  // Clear confirmation after 4 seconds
  useEffect(() => {
    if (!lastLog) return;
    const timer = setTimeout(() => setLastLog(null), 4000);
    return () => clearTimeout(timer);
  }, [lastLog]);

  const handleTookMedication = () => {
    addLog(true);
    setLastLog('taken');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance('Medication logged successfully'));
    }
  };

  const handleMissedMedication = () => {
    addLog(false);
    setLastLog('missed');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance('Medication marked as missed'));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Main message - large, high contrast */}
        <h1
          className="text-6xl md:text-8xl font-bold text-white leading-tight"
          role="alert"
          aria-live="polite"
        >
          Time to take your medication
        </h1>

        {/* Last dose elapsed */}
        <div className="text-xl text-slate-400">
          {mostRecentLog ? (
            <>
              Last dose:{' '}
              <span className={`font-semibold ${mostRecentLog.taken ? 'text-emerald-300' : 'text-slate-300'}`}>
                {elapsed}
              </span>
              {' '}—{' '}
              <span className={mostRecentLog.taken ? 'text-emerald-400' : 'text-slate-400'}>
                {mostRecentLog.taken ? 'taken' : 'missed'}
              </span>
            </>
          ) : (
            <span className="text-slate-500">No doses logged yet</span>
          )}
        </div>

        {/* Post-log confirmation */}
        <div className="h-16 flex items-center justify-center">
          {lastLog === 'taken' && (
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-300 text-2xl font-bold"
              role="status"
              aria-live="polite"
            >
              <span className="text-3xl">✓</span> Logged — great job!
            </div>
          )}
          {lastLog === 'missed' && (
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border-2 border-white/15 text-slate-300 text-2xl font-bold"
              role="status"
              aria-live="polite"
            >
              <span className="text-3xl">✗</span> Marked as missed
            </div>
          )}
        </div>

        {/* Action buttons - high contrast, accessible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <button
            onClick={handleTookMedication}
            className="w-full py-12 px-16 bg-sky-500 hover:bg-sky-400 text-black text-4xl md:text-5xl font-bold rounded-3xl active:bg-sky-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
            aria-label="I took my medication - Click to log"
          >
            I took my medication
          </button>

          <button
            onClick={handleMissedMedication}
            className="w-full py-12 px-16 bg-white/10 hover:bg-white/15 text-white text-4xl md:text-5xl font-bold rounded-3xl border border-white/15 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            aria-label="I did not take my medication - Click to log as missed"
          >
            I did not take it
          </button>
        </div>

        {/* Link to caregiver page */}
        <div className="pt-8">
          <Link
            href="/caregiver"
            className="text-2xl text-sky-300 hover:text-sky-200 underline"
            aria-label="View caregiver dashboard"
          >
            Caregiver Dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
