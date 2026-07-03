export default function AppFooter() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        <p className="font-medium">
          AI Website Auditor
        </p>

        <p className="mt-2">
          Built with Next.js,
          TypeScript, Tailwind CSS,
          OpenAI and Prisma.
        </p>

        <p className="mt-4">
          © {new Date().getFullYear()} AI Website Auditor
        </p>
      </div>
    </footer>
  );
}