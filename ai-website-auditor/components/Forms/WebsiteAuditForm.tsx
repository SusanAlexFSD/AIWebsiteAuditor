"use client";

import { useState } from "react";
import type { AuditResponse } from "@/types/audit";

export default function WebsiteAuditForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<AuditResponse | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      setResult(data);

      console.log(
  JSON.stringify(data, null, 2)
);
    } catch (error) {
      console.error(error);

      setResult({
        success: false,
        message: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const seoScore =
    result?.data?.seoAnalysis?.score ?? 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl"
    >
      <input
        type="url"
        placeholder="https://yourwebsite.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded-lg p-4"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white rounded-lg p-4 hover:opacity-90"
      >
        {isLoading ? "Scanning..." : "Scan Website"}
      </button>

      {/* Error State */}

      {result && !result.success && (
        <div className="mt-6 border border-red-300 rounded-xl p-4">
          <p className="font-semibold text-red-600">
            Error
          </p>

          <p>{result.message}</p>
        </div>
      )}

      {/* Success State */}

      {result?.success && result?.data && (
        <div className="mt-8 w-full border rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Website Analysis
          </h2>

          {/* SEO SCORE CARD */}

          <div className="border rounded-xl p-6 mb-6 text-center">
            <p
              className={`text-6xl font-bold mb-2 ${
                seoScore >= 80
                  ? "text-green-600"
                  : seoScore >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {seoScore}
            </p>

            <img
            src={result.data.screenshot}
            alt="Website Screenshot"
            className="rounded-xl border mb-6"
            />

            <p className="text-lg font-semibold mb-6">
              SEO Score
            </p>

            <div className="space-y-2 text-left">
              <p>
                {result.data.seoAnalysis.checks
                  .hasTitle
                  ? "✅"
                  : "❌"}{" "}
                Title Tag
              </p>

              <p>
                {result.data.seoAnalysis.checks
                  .hasMetaDescription
                  ? "✅"
                  : "❌"}{" "}
                Meta Description
              </p>

              <p>
                {result.data.seoAnalysis.checks
                  .hasH1
                  ? "✅"
                  : "❌"}{" "}
                H1 Tag
              </p>
            </div>
          </div>

           {/* RECOMMENDATIONS DATA */}

          <div className="border rounded-xl p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">
                Recommendations
            </h3>

            <ul className="space-y-2">
                {result.data.recommendations &&
            result.data.recommendations.map(
                (recommendation, index) => (
                <li key={index}>
                    • {recommendation}
                </li>
                )
            )}
            </ul>
            </div>

          {/* WEBSITE DATA */}

          <div className="space-y-3">
            <p>
              <strong>Title:</strong>{" "}
              {result.data.title ||
                "No title found"}
            </p>

            <p>
              <strong>URL:</strong>{" "}
              {result.data.pageUrl}
            </p>

            <p>
              <strong>Meta Description:</strong>{" "}
              {result.data.metaDescription ||
                "No description found"}
            </p>

            <p>
              <strong>Links:</strong>{" "}
              {result.data.links}
            </p>

            <p>
              <strong>Images:</strong>{" "}
              {result.data.images}
            </p>

            <p>
              <strong>H1 Tags:</strong>{" "}
              {result.data.h1Count}
            </p>

            <p>
              <strong>H2 Tags:</strong>{" "}
              {result.data.h2Count}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}