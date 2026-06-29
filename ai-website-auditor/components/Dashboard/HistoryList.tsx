"use client";

import { useState } from "react";
import Link from "next/link";

type Audit = {
  id: string;
  url: string;
  title: string | null;
  overallScore: number;
  createdAt: Date;
};

export default function HistoryList({
  audits,
}: {
  audits: Audit[];
}) {
  const [search, setSearch] =
    useState("");

  const filteredAudits =
    audits.filter((audit) => {
      const term =
        search.toLowerCase();

      return (
        audit.url
          .toLowerCase()
          .includes(term) ||
        (audit.title || "")
          .toLowerCase()
          .includes(term)
      );
    });

  const deleteAudit = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Delete this audit?"
      );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/audit/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete audit"
        );
      }

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete audit."
      );
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search audits..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-4 mb-6"
      />

      <div className="space-y-4">
        {filteredAudits.map((audit) => (
          <Link
            key={audit.id}
            href={`/history/${audit.id}`}
          >
            <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
              <p>
                <strong>Website:</strong>{" "}
                {audit.url}
              </p>

              <p>
                <strong>Title:</strong>{" "}
                {audit.title ||
                  "No title"}
              </p>

              <div className="mt-3 mb-3">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-bold ${
                    audit.overallScore >=
                    80
                      ? "bg-green-100 text-green-700"
                      : audit.overallScore >=
                        60
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Overall Score:{" "}
                  {audit.overallScore}
                </div>
              </div>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  audit.createdAt
                ).toLocaleString()}
              </p>

              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    deleteAudit(
                      audit.id
                    );
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Audit
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}