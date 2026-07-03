"use client";

import { useState } from "react";
import type { AuditResponse } from "@/types/audit";

import { generatePdfReport } from "@/services/pdf/generatePdf";

import AuditSummary from "@/components/Audit/AuditSummary";
import SeoChecksCard from "@/components/Audit/SeoChecksCard";
import TechnicalChecksCard from "@/components/Audit/TechnicalChecksCard";
import AiAnalysisCard from "@/components/Audit/AiAnalysisCard";
import WebsiteInfoCard from "@/components/Audit/WebsiteInfoCard";
import AccessibilityCard from "../Audit/AccessibilityCard";
import AiChat from "@/components/AI/AiChat";

export default function WebsiteAuditForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const [result, setResult] =
    useState<AuditResponse | null>(null);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const formattedUrl =
      url.startsWith("http://") ||
      url.startsWith("https://")
        ? url
        : `https://${url}`;

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/audit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            url: formattedUrl,
          }),
        }
      );

      const data =
        await response.json();

      setResult(data);

      console.log(data);
    } catch (error) {
      console.error(error);

      setResult({
        success: false,
        message:
          "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const aiText =
    result?.data?.aiRecommendations ??
    "";

  const summary =
    aiText
      .split("IMPROVEMENTS:")[0]
      ?.replace("SUMMARY:", "")
      ?.trim() ?? "";

  const improvements =
    aiText
      .split("IMPROVEMENTS:")[1]
      ?.split("META_DESCRIPTION:")[0]
      ?.trim() ?? "";

  const metaDescriptionSuggestion =
    aiText
      .split("META_DESCRIPTION:")[1]
      ?.trim() ?? "";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-5xl"
    >
      <input
        type="text"
        placeholder="yourwebsite.com"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        className="border rounded-lg p-4"
      />

      <p className="text-sm text-gray-500">
        Enter a website address.
        https:// is added
        automatically.
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white rounded-lg p-4 hover:opacity-90 disabled:opacity-50"
      >
        {isLoading
          ? "Scanning..."
          : "Scan Website"}
      </button>

      {result &&
        !result.success && (
          <div className="border border-red-300 rounded-xl p-4 mt-6">
            <h3 className="font-bold text-red-600">
              Error
            </h3>

            <p>{result.message}</p>
          </div>
        )}

      {result?.success &&
        result.data && (
          <div className="mt-8 space-y-8">

            <h2 className="text-3xl font-bold">
              Website Analysis
            </h2>

            <AuditSummary
              data={result.data}
            />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <SeoChecksCard
                data={result.data}
            />

            <TechnicalChecksCard
                data={result.data}
            />

            <AccessibilityCard
                data={result.data}
            />

        </div>

            <AiAnalysisCard
              summary={summary}
              improvements={
                improvements
              }
              metaDescriptionSuggestion={
                metaDescriptionSuggestion
              }
            />

            <WebsiteInfoCard
              data={result.data}
            />

            <AiChat audit={result.data} />


            <button
              type="button"
              onClick={() =>
                generatePdfReport(
                  result.data
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-semibold"
            >
              Download PDF Report
            </button>

          </div>
        )}
    </form>
  );
}