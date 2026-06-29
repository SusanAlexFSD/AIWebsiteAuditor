import type { AuditData } from "@/types/audit";

interface Props {
  data: AuditData;
}

export default function SeoChecksCard({
  data,
}: Props) {
  const checks =
    data.seoAnalysis.checks;

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">
        SEO Checks
      </h3>

      <div className="space-y-3">

        <p>
          {checks.hasTitle ? "✅" : "❌"}{" "}
          Title Tag
        </p>

        <p>
          {checks.hasMetaDescription
            ? "✅"
            : "❌"}{" "}
          Meta Description
        </p>

        <p>
          {checks.hasH1 ? "✅" : "❌"}{" "}
          H1 Tag
        </p>

        <p>
          {checks.titleLengthGood
            ? "✅"
            : "❌"}{" "}
          Good Title Length
        </p>

        <p>
          {checks.metaLengthGood
            ? "✅"
            : "❌"}{" "}
          Good Meta Length
        </p>

        <p>
          {checks.singleH1
            ? "✅"
            : "❌"}{" "}
          Single H1
        </p>

        <p>
          {checks.hasCanonical
            ? "✅"
            : "❌"}{" "}
          Canonical Tag
        </p>

        <p>
          {checks.hasOgTitle
            ? "✅"
            : "❌"}{" "}
          Open Graph Title
        </p>

        <p>
          {checks.hasOgDescription
            ? "✅"
            : "❌"}{" "}
          Open Graph Description
        </p>

        <p>
          {checks.hasOgImage
            ? "✅"
            : "❌"}{" "}
          Open Graph Image
        </p>

      </div>
    </div>
  );
}