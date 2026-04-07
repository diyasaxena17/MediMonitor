'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AboutPage() {
  const { user } = useUser();

  const isAuthed = !!user;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero */}
        <header className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Medication adherence platform</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">MediMonitor</h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl">
              A focused adherence companion for patients and caregivers: accessible one-tap medication logging, instant caregiver visibility, and secure login.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">High contrast, WCAG-friendly</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Instant logging</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Caregiver visibility</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Secure sign-in</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthed ? (
                <>
                  <Link
                    href="/track"
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 transition"
                    aria-label="Open medication tracker"
                  >
                    Open Tracker
                  </Link>
                  <Link
                    href="/caregiver"
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition"
                    aria-label="Open caregiver dashboard"
                  >
                    Caregiver Dashboard
                  </Link>
                  <a
                    href="/auth/logout"
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 transition"
                    aria-label="Sign out"
                  >
                    Sign out
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/auth/login"
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 transition"
                    aria-label="Sign in"
                  >
                    Sign in
                  </a>
                  <Link
                    href="/track"
                    className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition"
                    aria-label="Preview the tracker"
                  >
                    Preview the tracker
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-3xl bg-white/5 border border-white/10 shadow-2xl p-8 backdrop-blur space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Sign in</p>
                  <p className="text-2xl font-bold text-white">Secure login</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold border border-emerald-400/30">
                  Live
                </div>
              </div>

              {isAuthed ? (
                <div className="space-y-4">
                  <p className="text-slate-200">You are signed in. Jump into the app.</p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/track"
                      className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 transition"
                      aria-label="Open medication tracker"
                    >
                      Open Tracker
                    </Link>
                    <Link
                      href="/caregiver"
                      className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition"
                      aria-label="Open caregiver dashboard"
                    >
                      Caregiver Dashboard
                    </Link>
                    <a
                      href="/auth/logout"
                      className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 transition"
                      aria-label="Sign out"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-200">Sign in to log medications and share adherence with caregivers.</p>
                  <a
                    href="/auth/login"
                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 transition"
                    aria-label="Sign in"
                  >
                    Sign in
                  </a>
                  <p className="text-sm text-slate-400 text-center">We use Auth0 for secure, passwordless access.</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 text-sm text-slate-200">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold">TTS Reminders</p>
                  <p className="text-slate-400">Gentle voice prompts.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold">One-tap Logging</p>
                  <p className="text-slate-400">Taken or missed instantly.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-semibold">Caregiver View</p>
                  <p className="text-slate-400">See adherence live.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Details */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-2xl font-bold mb-2">Accessibility-first</h3>
            <p className="text-slate-200">High-contrast layouts, large tap targets, screen-reader-friendly labels, and keyboard navigation built in.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-2xl font-bold mb-2">Instant logging</h3>
            <p className="text-slate-200">One-tap taken/missed logging with voice confirmations so patients and caregivers stay aligned.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-2xl font-bold mb-2">Auth0-secured</h3>
            <p className="text-slate-200">Sign in with Auth0 to keep dashboards protected while keeping onboarding simple.</p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Ready to monitor adherence?</h2>
            <p className="text-slate-200">Start with sign-in, then open the tracker or caregiver dashboard.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/auth/login"
              className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 transition"
              aria-label="Sign in"
            >
              Sign in
            </a>
            <Link
              href="/track"
              className="inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition"
              aria-label="Preview the tracker"
            >
              Preview the tracker
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
