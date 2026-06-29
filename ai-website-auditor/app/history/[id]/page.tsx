import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const audit = await prisma.audit.findUnique({
    where: {
      id,
    },
  });

  const previousAudit =
  audit
    ? await prisma.audit.findFirst({
        where: {
          userId: audit.userId,
          url: audit.url,
          createdAt: {
            lt: audit.createdAt,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : null;

  if (!audit) {
    notFound();
  }

  const scoreColor =
    audit.overallScore >= 80
      ? "bg-green-100 text-green-700"
      : audit.overallScore >= 60
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

      const overallDifference =
  previousAudit
    ? audit.overallScore -
      previousAudit.overallScore
    : null;

const seoDifference =
  previousAudit
    ? audit.seoScore -
      previousAudit.seoScore
    : null;

const contentDifference =
  previousAudit
    ? audit.contentScore -
      previousAudit.contentScore
    : null;

const technicalDifference =
  previousAudit
    ? audit.technicalScore -
      previousAudit.technicalScore
    : null;

const accessibilityDifference =
  previousAudit &&
  audit.accessibilityScore !== null &&
  previousAudit.accessibilityScore !== null
    ? audit.accessibilityScore -
      previousAudit.accessibilityScore
    : null;

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Audit Details
        </h1>

        <p className="text-gray-500 mt-2">
          Detailed website analysis report
        </p>
      </div>

      <div className="border rounded-2xl bg-white p-6 shadow-sm">
        {audit.screenshot && (
          <div className="mb-8">
            <Image
              src={audit.screenshot}
              alt={
                audit.title ||
                "Website Screenshot"
              }
              width={1400}
              height={900}
              className="w-full rounded-xl border"
            />
          </div>
        )}

        <div className="mb-8">
          <span
            className={`inline-block px-4 py-2 rounded-lg font-bold ${scoreColor}`}
          >
            Overall Score:{" "}
            {audit.overallScore}
          </span>

          {previousAudit && (
  <div className="mt-6 border rounded-xl p-6 bg-blue-50">
    <h2 className="text-2xl font-bold mb-6">
      Audit Comparison
    </h2>

    <div className="grid md:grid-cols-5 gap-4">

      <div className="border rounded-lg p-4 text-center bg-white">
        <p className="text-gray-500 text-sm">
          Overall
        </p>

        <p className="text-2xl font-bold">
          {previousAudit.overallScore}
          {" → "}
          {audit.overallScore}
        </p>

        <p
          className={`font-semibold ${
            overallDifference! >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {overallDifference! >= 0 ? "+" : ""}
          {overallDifference}
        </p>
      </div>

      <div className="border rounded-lg p-4 text-center bg-white">
        <p>SEO</p>

        <p className="font-bold">
          {previousAudit.seoScore}
          {" → "}
          {audit.seoScore}
        </p>

        <p className="text-green-600">
          {seoDifference! >= 0 ? "+" : ""}
          {seoDifference}
        </p>
      </div>

      <div className="border rounded-lg p-4 text-center bg-white">
        <p>Content</p>

        <p className="font-bold">
          {previousAudit.contentScore}
          {" → "}
          {audit.contentScore}
        </p>

        <p className="text-green-600">
          {contentDifference! >= 0 ? "+" : ""}
          {contentDifference}
        </p>
      </div>

      <div className="border rounded-lg p-4 text-center bg-white">
        <p>Technical</p>

        <p className="font-bold">
          {previousAudit.technicalScore}
          {" → "}
          {audit.technicalScore}
        </p>

        <p className="text-green-600">
          {technicalDifference! >= 0 ? "+" : ""}
          {technicalDifference}
        </p>
      </div>

      <div className="border rounded-lg p-4 text-center bg-white">
        <p>Accessibility</p>

        <p className="font-bold">
          {previousAudit.accessibilityScore ?? 0}
          {" → "}
          {audit.accessibilityScore ?? 0}
        </p>

        <p className="text-green-600">
          {accessibilityDifference !== null &&
          accessibilityDifference >= 0
            ? "+"
            : ""}
          {accessibilityDifference ?? "-"}
        </p>
      </div>

    </div>
  </div>
)}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Website Information
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Website:</strong>{" "}
                {audit.url}
              </p>

              <p>
                <strong>Title:</strong>{" "}
                {audit.title ||
                  "No title found"}
              </p>

              <p>
                <strong>
                  Meta Description:
                </strong>{" "}
                {audit.metaDescription ||
                  "No description found"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">
              Audit Scores
            </h2>

            <div className="space-y-3">
              <p>
                <strong>SEO:</strong>{" "}
                {audit.seoScore}
              </p>

              <p>
                <strong>Content:</strong>{" "}
                {audit.contentScore}
              </p>

              <p>
                <strong>Technical:</strong>{" "}
                {audit.technicalScore}
              </p>

              <p>
                <strong>Overall:</strong>{" "}
                {audit.overallScore}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">
            Page Structure
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">
                {audit.links ?? 0}
              </p>
              <p className="text-gray-500">
                Links
              </p>
            </div>

            <div className="border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">
                {audit.images ?? 0}
              </p>
              <p className="text-gray-500">
                Images
              </p>
            </div>

            <div className="border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">
                {audit.h1Count ?? 0}
              </p>
              <p className="text-gray-500">
                H1 Tags
              </p>
            </div>

            <div className="border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">
                {audit.h2Count ?? 0}
              </p>
              <p className="text-gray-500">
                H2 Tags
              </p>
            </div>
          </div>
        </div>

        {audit.aiRecommendations && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              AI Recommendations
            </h2>

            <div className="border rounded-xl p-6 bg-gray-50 whitespace-pre-wrap">
              {audit.aiRecommendations}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t">
          <p className="text-sm text-gray-500">
            Created:{" "}
            {new Date(
              audit.createdAt
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}