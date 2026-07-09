import WebsiteAuditForm from "@/components/Forms/WebsiteAuditForm";
import StatsCards from "@/components/Dashboard/StatsCards";
import TrendChart from "@/components/Dashboard/TrendChart";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";

import type { Audit } from "@prisma/client";

export default async function Home() {
  const session = await getServerSession(authOptions);

  let totalAudits = 0;
  let averageScore = 0;
  let bestScore = 0;

  let labels: string[] = [];
  let scores: number[] = [];

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (user) {
      const audits: Audit[] =
        await prisma.audit.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

      totalAudits = audits.length;

      averageScore =
        totalAudits > 0
          ? Math.round(
              audits.reduce(
                (
                  sum: number,
                  audit: Audit
                ) => sum + audit.overallScore,
                0
              ) / totalAudits
            )
          : 0;

      bestScore =
        totalAudits > 0
          ? Math.max(
              ...audits.map(
                (audit: Audit) =>
                  audit.overallScore
              )
            )
          : 0;

      labels = audits.map(
        (audit: Audit) =>
          new Date(
            audit.createdAt
          ).toLocaleDateString()
      );

      scores = audits.map(
        (audit: Audit) =>
          audit.overallScore
      );
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-center">
        AI Website Auditor
      </h1>

      <p className="mt-4 mb-2 text-gray-500 text-center text-lg">
        AI-powered SEO, Accessibility and UX Analysis
      </p>

      <p className="mb-8 text-center text-sm text-gray-500">
        Run audits for free. Sign in to save your audit history and
        track progress over time.
      </p>

      {session && (
        <>
          <StatsCards
            totalAudits={totalAudits}
            averageScore={averageScore}
            bestScore={bestScore}
          />

          {totalAudits > 0 && (
            <TrendChart
              labels={labels}
              scores={scores}
            />
          )}
        </>
      )}

      <div className="flex justify-center mt-8">
        <WebsiteAuditForm />
      </div>
    </main>
  );
}