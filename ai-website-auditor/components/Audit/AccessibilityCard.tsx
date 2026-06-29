import type { AuditData } from "@/types/audit";

interface Props {
  data: AuditData;
}

export default function AccessibilityCard({
  data,
}: Props) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">
        ♿ Accessibility
      </h3>

      <div className="space-y-3">

        <p>
          {data.h1Count > 0 ? "✅" : "❌"}{" "}
          H1 Heading Present
        </p>

        <p>
          {data.missingAltTags === 0
            ? "✅"
            : "❌"}{" "}
          Images have ALT tags
        </p>

        <p>
          <strong>Accessibility Score:</strong>{" "}
          {data.accessibilityAnalysis.score}/100
        </p>

        <p>
          <strong>Missing ALT Tags:</strong>{" "}
          {data.missingAltTags}
        </p>

      </div>
    </div>
  );
}