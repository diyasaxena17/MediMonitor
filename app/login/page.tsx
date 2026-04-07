'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function LoginPage() {
  const { user } = useUser();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-black">Login</h1>
        {user ? (
          <div className="space-y-6">
            <p className="text-xl text-gray-700">You are already logged in.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/" className="text-xl underline text-gray-700 hover:text-black">Go to Home</Link>
              <a
                href="/auth/logout"
                className="py-4 px-6 bg-gray-900 text-white text-xl font-bold rounded-2xl hover:bg-gray-800 active:bg-gray-700"
                aria-label="Sign out"
              >
                Sign out
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-gray-700">Sign in to continue</p>
            <a
              href="/auth/login"
              className="block w-full py-4 px-6 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-700 active:bg-blue-800"
              aria-label="Sign in"
            >
              Sign in
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
