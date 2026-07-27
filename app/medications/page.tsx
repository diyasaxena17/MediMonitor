'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useMedication } from '../MedicationContext';

export default function MedicationsPage() {
  const { schedules, addSchedule, removeSchedule } = useMedication();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDosage = dosage.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedName || !trimmedDosage || !reminderTime) {
      setMessage('Enter a medication name, dosage, and reminder time.');
      return;
    }

    addSchedule({
      name: trimmedName,
      dosage: trimmedDosage,
      reminderTime,
      frequency: 'daily',
      notes: trimmedNotes || undefined,
    });

    setName('');
    setDosage('');
    setReminderTime('');
    setNotes('');
    setMessage(`${trimmedName} was added to your daily schedule.`);
  };

  const formatTime = (time: string) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

  const handleRemove = (id: string, medicationName: string) => {
    if (window.confirm(`Remove ${medicationName} from your schedule?`)) {
      removeSchedule(id);
      setMessage(`${medicationName} was removed from your schedule.`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-4">
          <Link href="/" className="text-sky-300 hover:text-sky-200 underline">
            ← Back to Home
          </Link>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
              Daily routine
            </p>
            <h1 className="text-4xl md:text-6xl font-bold">Medication Schedule</h1>
            <p className="mt-3 text-lg text-slate-300">
              Add the medications and reminder times prescribed for you.
            </p>
          </div>
        </header>

        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 space-y-5"
          >
            <h2 className="text-3xl font-bold">Add a medication</h2>

            <div className="space-y-2">
              <label htmlFor="medication-name" className="block font-semibold">
                Medication name
              </label>
              <input
                id="medication-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-lg"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dosage" className="block font-semibold">
                Dosage
              </label>
              <input
                id="dosage"
                value={dosage}
                onChange={(event) => setDosage(event.target.value)}
                placeholder="For example, 500 mg"
                className="w-full rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-lg"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reminder-time" className="block font-semibold">
                Daily reminder time
              </label>
              <input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(event) => setReminderTime(event.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block font-semibold">
                Instructions <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="For example, take with food"
                rows={3}
                className="w-full rounded-xl bg-slate-900 border border-white/20 px-4 py-3 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-sky-500 hover:bg-sky-400 text-black text-xl font-bold rounded-2xl"
            >
              Add medication
            </button>

            <p className="text-sm text-slate-400">
              MediMonitor records the schedule you enter and does not provide dosage advice.
            </p>
          </form>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold">Your medications</h2>
              <Link href="/track" className="text-sky-300 hover:text-sky-200 underline">
                Open tracker
              </Link>
            </div>

            <p aria-live="polite" className="min-h-6 text-emerald-300">
              {message}
            </p>

            {schedules.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-dashed border-white/20 text-center">
                <p className="text-xl font-semibold">No medications added yet</p>
                <p className="mt-2 text-slate-400">
                  Use the form to create your first daily schedule.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {schedules.map((schedule) => (
                  <li
                    key={schedule.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold">{schedule.name}</h3>
                        <p className="mt-1 text-lg text-slate-200">
                          {schedule.dosage} · Daily at {formatTime(schedule.reminderTime)}
                        </p>
                        {schedule.notes && (
                          <p className="mt-2 text-slate-400">{schedule.notes}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(schedule.id, schedule.name)}
                        className="px-4 py-2 rounded-xl border border-red-300/30 text-red-300 hover:bg-red-400/10"
                        aria-label={`Remove ${schedule.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
