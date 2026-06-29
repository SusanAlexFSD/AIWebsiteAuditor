import { NextResponse } from "next/server";
import { validateUrl } from "@/lib/validateUrl";
import { crawlWebsite } from "@/services/crawler/crawlWebsite";
import { analyseSeo } from "@/services/seo/analyseSeo";
import { generateRecommendations } from "@/services/seo/generateRecommendations";
import { analyseContent } from "@/services/content/analyseContent";
import { analyseTechnical } from "@/services/technical/analyseTechnical";
import { calculateOverallScore } from "@/services/scoring/calculateOverallScore";
import { generateAiRecommendations } from "@/services/ai/generateAiRecommendations";
import { prisma } from "@/lib/prisma";
import { analyseAccessibility }
from "@/services/accessibility/analyseAccessibility";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    const session =
  await getServerSession();

let userId: string | null = null;

if (session?.user?.email) {
  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session.user.email,
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
      console.error(auditData.details);

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
  metaDescription:
    auditData.metaDescription,
  h1Count: auditData.h1Count,

  hasCanonical:
    auditData.hasCanonical,

  hasOgTitle:
    auditData.hasOgTitle,

  hasOgDescription:
    auditData.hasOgDescription,

  hasOgImage:
    auditData.hasOgImage,
});

    const contentAnalysis = analyseContent({
      h1Count: auditData.h1Count,
      h2Count: auditData.h2Count,
      images: auditData.images,
    });

    const accessibilityAnalysis =
  analyseAccessibility({
    title: auditData.title,
    h1Count: auditData.h1Count,
    missingAltTags:
      auditData.missingAltTags,
  });

  const technicalAnalysis =
  analyseTechnical({
    hasViewport:
      auditData.hasViewport,

    hasSchema:
      auditData.hasSchema,

    usesHttps:
      auditData.usesHttps,

    hasRobots:
      auditData.hasRobots,

    hasSitemap:
      auditData.hasSitemap,
  });

    const overallScore =
  calculateOverallScore({
    seo: seoAnalysis.score,
    content: contentAnalysis.score,
    technical: technicalAnalysis.score,
    accessibility:
      accessibilityAnalysis.score,
  });

    const recommendations = generateRecommendations(
      seoAnalysis.checks
    );

    let aiRecommendations = "";

    try {
      aiRecommendations =
        (await generateAiRecommendations({
          ...auditData,
          seoAnalysis,
          contentAnalysis,
          technicalAnalysis,
        })) || "";
    } catch (error) {
      console.error("AI ERROR:", error);

      aiRecommendations =
        "AI recommendations unavailable.";
    }

    // SAVE AUDIT TO DATABASE
if (userId) {
  await prisma.audit.create({
    data: {
      userId,

      url: auditData.pageUrl,
      title: auditData.title,

      seoScore: seoAnalysis.score,
      contentScore:
        contentAnalysis.score,

      technicalScore:
        technicalAnalysis.score,

      accessibilityScore:
        accessibilityAnalysis.score,

      overallScore,

      metaDescription:
        auditData.metaDescription,

      links: auditData.links,
      images: auditData.images,

      missingAltTags:
        auditData.missingAltTags,

      h1Count:
        auditData.h1Count,

      h2Count:
        auditData.h2Count,

      hasCanonical: auditData.hasCanonical,
      hasOgTitle: auditData.hasOgTitle,
      hasOgDescription: auditData.hasOgDescription,
      hasOgImage: auditData.hasOgImage,

      hasViewport: auditData.hasViewport,
      hasSchema: auditData.hasSchema,
      hasRobots: auditData.hasRobots,
      hasSitemap: auditData.hasSitemap,
      usesHttps: auditData.usesHttps,

      screenshot:
        auditData.screenshot,

      aiRecommendations,
    },
  });
}

    return NextResponse.json({
      success: true,
      data: {
        ...auditData,
        seoAnalysis,
        contentAnalysis,
        technicalAnalysis,
        accessibilityAnalysis,
        overallScore,
        recommendations,
        aiRecommendations,
      },
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Audit failed",
      },
      { status: 500 }
    );
  }
}