import WebsiteAuditForm from "@/components/Forms/WebsiteAuditForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">

      <h1 className="text-6xl font-bold text-center">
        AI Website Auditor
      </h1>

      <p className="mt-4 mb-8 text-gray-500 text-center text-lg">
        AI-powered SEO, Accessibility and UX Analysis
      </p>

      <WebsiteAuditForm />

    </main>
  );
}