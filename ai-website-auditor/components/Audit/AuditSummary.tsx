import Image from "next/image";

import MetricCard from "@/components/UI/MetricCard";
import type { AuditData } from "@/types/audit";

interface Props {
  data: AuditData;
}

export default function AuditSummary({
  data,
}: Props) {
  const score = data.overallScore;

  let colour = "text-red-600";
  let background = "bg-red-50";
  let status = "Needs Improvement";

  if (score >= 80) {
    colour = "text-green-600";
    background = "bg-green-50";
    status = "Excellent";
  } else if (score >= 60) {
    colour = "text-yellow-600";
    background = "bg-yellow-50";
    status = "Good";
  }

  return (
    <>
      <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">

        {data.screenshot && (
          <Image
            src={data.screenshot}
            alt="Website Screenshot"
            width={1280}
            height={720}
            priority
            className="h-auto w-full border-b object-cover"
          />
        )}

        <div className="p-8">

          <div className="text-center">

            <p className={`text-7xl font-bold ${colour}`}>
              {score}
            </p>

            <p
              className={`mt-3 inline-block rounded-full px-5 py-2 font-semibold ${background} ${colour}`}
            >
              {status}
            </p>

            <p className="mt-5 text-gray-500">
              Overall Website Score
            </p>

          </div>

          <div className="mt-8">

            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">

              <div
                className={`h-full transition-all duration-700 ${
                  score >= 80
                    ? "bg-green-500"
                    : score >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

        <MetricCard
          title="SEO"
          score={data.seoAnalysis.score}
        />

        <MetricCard
          title="Content"
          score={data.contentAnalysis.score}
        />

        <MetricCard
          title="Technical"
          score={data.technicalAnalysis.score}
        />

        <MetricCard
          title="Accessibility"
          score={data.accessibilityAnalysis.score}
        />

      </div>
    </>
  );
}