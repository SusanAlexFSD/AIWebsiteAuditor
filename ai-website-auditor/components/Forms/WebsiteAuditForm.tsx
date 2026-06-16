"use client";

import { useState } from "react";

export default function WebsiteAuditForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

      console.log(data);
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
        className="bg-black text-white rounded-lg p-4"
      >
        {isLoading ? "Scanning..." : "Scan Website"}
      </button>

      {/* Error State */}

      {result && !result.success && (
        <div className="mt-6 border border-red-300 rounded-xl p-4">
          <p className="font-semibold">
            Error
          </p>

          <p>
            {result.message}
          </p>
        </div>
      )}

      {/* Success State */}

      {result?.success && result?.data && (
        <div className="mt-8 w-full border rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Website Analysis
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Title:</strong>{" "}
              {result.data.title}
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
          </div>
        </div>
      )}
    </form>
  );
}