import { NextResponse } from "next/server";
import { validateUrl } from "@/lib/validateUrl";
import { crawlWebsite } from "@/services/crawler/crawlWebsite";
import { analyseSeo } from "@/services/seo/analyseSeo";
import { generateRecommendations } from "@/services/seo/generateRecommendations";


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
  return NextResponse.json(
    {
      success: false,
      message: auditData.error,
    },
    { status: 400 }
  );
}

    const seoAnalysis = analyseSeo({
        title: auditData.title,
        metaDescription:
            auditData.metaDescription,
        h1Count: auditData.h1Count,
        });

        const recommendations =
  generateRecommendations(
    seoAnalysis.checks
  );

 return NextResponse.json({
  success: true,
  data: {
    ...auditData,
    seoAnalysis,
    recommendations,
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