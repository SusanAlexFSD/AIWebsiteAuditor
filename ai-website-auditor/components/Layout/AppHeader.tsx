"use client";

import Link from "next/link";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function AppHeader() {
  const { data: session } =
    useSession();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

        <div>
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            🤖 AI Website Auditor
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            Analyse • Improve • Optimise
          </p>
        </div>

        <div className="flex items-center gap-8">

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-medium text-gray-600 transition hover:text-black"
            >
              Dashboard
            </Link>

            <Link
              href="/history"
              className="font-medium text-gray-600 transition hover:text-black"
            >
              History
            </Link>
          </nav>

          <div className="flex items-center gap-4">

           {!session && (
            <div className="hidden text-right text-sm lg:block">
              <p className="font-medium text-green-600">
                🟢 Guest Mode
              </p>

              <p className="text-gray-500">
                Audits won't be saved.
              </p>
            </div>
          )}

            {session ? (
              <>
                <span className="hidden text-sm text-gray-600 md:block">
                  Welcome, {session.user?.name}
                </span>

                <button
                  type="button"
                  onClick={() => signOut()}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Sign In
              </button>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}