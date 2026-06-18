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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

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
      metaDescription: auditData.metaDescription,
      h1Count: auditData.h1Count,
    });

    const contentAnalysis = analyseContent({
      h1Count: auditData.h1Count,
      h2Count: auditData.h2Count,
      images: auditData.images,
    });

    const technicalAnalysis = analyseTechnical({
      links: auditData.links,
      images: auditData.images,
    });

    const overallScore = calculateOverallScore({
      seo: seoAnalysis.score,
      content: contentAnalysis.score,
      technical: technicalAnalysis.score,
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
    await prisma.audit.create({
      data: {
        url: auditData.pageUrl,
        title: auditData.title,

        seoScore: seoAnalysis.score,
        contentScore: contentAnalysis.score,
        technicalScore: technicalAnalysis.score,

        overallScore,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...auditData,
        seoAnalysis,
        contentAnalysis,
        technicalAnalysis,
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