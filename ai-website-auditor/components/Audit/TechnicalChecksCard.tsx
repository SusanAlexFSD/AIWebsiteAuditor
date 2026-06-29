import type { AuditData } from "@/types/audit";

interface Props {
  data: AuditData;
}

export default function TechnicalChecksCard({
  data,
}: Props) {
  const checks =
    data.technicalAnalysis.checks;

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">
        Technical Checks
      </h3>

      <div className="space-y-3">

        <p>
          {checks.usesHttps
            ? "✅"
            : "❌"}{" "}
          HTTPS
        </p>

        <p>
          {checks.hasViewport
            ? "✅"
            : "❌"}{" "}
          Viewport Meta Tag
        </p>

        <p>
          {checks.hasRobots
            ? "✅"
            : "❌"}{" "}
          robots.txt
        </p>

        <p>
          {checks.hasSitemap
            ? "✅"
            : "❌"}{" "}
          sitemap.xml
        </p>

        <p>
          {checks.hasSchema
            ? "✅"
            : "❌"}{" "}
          Structured Data
        </p>

      </div>
    </div>
  );
}