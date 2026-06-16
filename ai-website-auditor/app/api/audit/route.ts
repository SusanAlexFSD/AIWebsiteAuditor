import { NextResponse } from "next/server";
import { validateUrl } from "@/lib/validateUrl";
import { crawlWebsite } from "@/services/crawler/crawlWebsite";

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

    return NextResponse.json({
      success: true,
      data: auditData,
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