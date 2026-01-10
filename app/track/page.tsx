'use client';

import { useMedication } from '../MedicationContext';
import { useEffect } from 'react';
import Link from 'next/link';

export default function TrackPage() {
  const { addLog } = useMedication();

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

    // Speak after a short delay to ensure page is loaded
    const timer = setTimeout(speak, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTookMedication = () => {
    addLog(true);
    
    // Provide feedback via speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Medication logged successfully');
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMissedMedication = () => {
    addLog(false);

    // Provide feedback via speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Medication marked as missed');
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Main message - large, high contrast */}
        <h1 
          className="text-6xl md:text-8xl font-bold text-black leading-tight"
          role="alert"
          aria-live="polite"
        >
          Time to take your medication
        </h1>

        {/* Action buttons - high contrast, accessible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <button
            onClick={handleTookMedication}
            className="w-full py-12 px-16 bg-black text-white text-4xl md:text-5xl font-bold rounded-3xl hover:bg-gray-800 active:bg-gray-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            aria-label="I took my medication - Click to log"
          >
            I took my medication
          </button>

          <button
            onClick={handleMissedMedication}
            className="w-full py-12 px-16 bg-red-600 text-white text-4xl md:text-5xl font-bold rounded-3xl hover:bg-red-700 active:bg-red-800 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            aria-label="I did not take my medication - Click to log as missed"
          >
            I did not take it
          </button>
        </div>

        {/* Link to caregiver page */}
        <div className="pt-8">
          <Link
            href="/caregiver"
            className="text-2xl text-gray-600 hover:text-black underline"
            aria-label="View caregiver dashboard"
          >
            Caregiver Dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
