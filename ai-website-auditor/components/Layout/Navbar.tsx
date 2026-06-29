"use client";

import Link from "next/link";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {
  const { data: session } =
    useSession();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          AI Website Auditor
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="/history"
            className="hover:text-blue-600"
          >
            History
          </Link>

          <div className="flex items-center gap-4">
            {!session && (
              <div className="hidden lg:block text-sm text-gray-500 text-right">
                <p>Run audits for free.</p>
                <p>
                  Sign in to save your audit
                  history.
                </p>
              </div>
            )}

            {session ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome,{" "}
                  {session.user?.name}
                </span>

                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  signIn("google")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}