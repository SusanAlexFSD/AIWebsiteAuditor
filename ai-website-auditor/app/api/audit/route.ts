import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import type { AuditData } from "@/types/audit";

import { prisma } from "@/lib/prisma";
import { validateUrl } from "@/lib/validateUrl";

import { crawlWebsite } from "@/services/crawler/crawlWebsite";
import { analyseSeo } from "@/services/seo/analyseSeo";
import { analyseContent } from "@/services/content/analyseContent";
import { analyseTechnical } from "@/services/technical/analyseTechnical";
import { analyseAccessibility } from "@/services/accessibility/analyseAccessibility";

import { calculateOverallScore } from "@/services/scoring/calculateOverallScore";
import { generateRecommendations } from "@/services/seo/generateRecommendations";
import { generateAiRecommendations } from "@/services/ai/generateAiRecommendations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    const session = await getServerSession();

    let userId: string | null = null;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      userId = user?.id ?? null;
    }

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL is required",
        },
        { status: 400 }
      );
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid URL",
        },
        { status: 400 }
      );
    }

    const auditData = await crawlWebsite(url);

    if ("error" in auditData) {
      return NextResponse.json(
        {
          success: false,
          message: auditData.error,
          details: auditData.details,
        },
        { status: 400 }
      );
    }

    const seoAnalysis = analyseSeo({
      title: auditData.title,
      metaDescription: auditData.metaDescription,
      h1Count: auditData.h1Count,
      hasCanonical: auditData.hasCanonical,
      hasOgTitle: auditData.hasOgTitle,
      hasOgDescription: auditData.hasOgDescription,
      hasOgImage: auditData.hasOgImage,
    });

    const contentAnalysis = analyseContent({
      h1Count: auditData.h1Count,
      h2Count: auditData.h2Count,
      images: auditData.images,
    });

    const technicalAnalysis = analyseTechnical({
      hasViewport: auditData.hasViewport,
      hasSchema: auditData.hasSchema,
      usesHttps: auditData.usesHttps,
      hasRobots: auditData.hasRobots,
      hasSitemap: auditData.hasSitemap,
    });

    const accessibilityAnalysis = analyseAccessibility({
      title: auditData.title,
      h1Count: auditData.h1Count,
      missingAltTags: auditData.missingAltTags,
    });

    const overallScore = calculateOverallScore({
      seo: seoAnalysis.score,
      content: contentAnalysis.score,
      technical: technicalAnalysis.score,
      accessibility: accessibilityAnalysis.score,
    });

    const recommendations = generateRecommendations(
      seoAnalysis.checks
    );

    const auditResult: AuditData = {
      ...auditData,

      seoAnalysis,
      contentAnalysis,
      technicalAnalysis,
      accessibilityAnalysis,

      overallScore,

      recommendations,

      aiRecommendations: "",

      hasCanonical: seoAnalysis.checks.hasCanonical,
      hasOgTitle: seoAnalysis.checks.hasOgTitle,
      hasOgDescription: seoAnalysis.checks.hasOgDescription,
      hasOgImage: seoAnalysis.checks.hasOgImage,
    };

    try {
      auditResult.aiRecommendations =
        await generateAiRecommendations(
          auditResult
        );
    } catch (error) {
      console.error("AI ERROR:", error);

      auditResult.aiRecommendations =
        "AI recommendations unavailable.";
    }

    if (userId) {
      await prisma.audit.create({
        data: {
          userId,

          url: auditResult.pageUrl,
          title: auditResult.title,

          seoScore: auditResult.seoAnalysis.score,
          contentScore: auditResult.contentAnalysis.score,
          technicalScore: auditResult.technicalAnalysis.score,
          accessibilityScore:
            auditResult.accessibilityAnalysis.score,

          overallScore: auditResult.overallScore,

          metaDescription:
            auditResult.metaDescription,

          links: auditResult.links,
          images: auditResult.images,

          missingAltTags:
            auditResult.missingAltTags,

          h1Count: auditResult.h1Count,
          h2Count: auditResult.h2Count,

          hasCanonical:
            auditResult.hasCanonical,

          hasOgTitle:
            auditResult.hasOgTitle,

          hasOgDescription:
            auditResult.hasOgDescription,

          hasOgImage:
            auditResult.hasOgImage,

          hasViewport:
            auditData.hasViewport,

          hasSchema:
            auditData.hasSchema,

          hasRobots:
            auditData.hasRobots,

          hasSitemap:
            auditData.hasSitemap,

          usesHttps:
            auditData.usesHttps,

          screenshot:
            auditResult.screenshot,

          aiRecommendations:
            auditResult.aiRecommendations,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: auditResult,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Audit failed",
      },
      {
        status: 500,
      }
    );
  }
}