import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="border-b bg-white">
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

        <nav className="flex gap-6">
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
      </div>
    </header>
  );
}