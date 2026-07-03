import { NextResponse } from "next/server";
import { chatWithAudit } from "@/services/ai/chatWithAudit";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { audit, messages } = body;

    if (!audit) {
      return NextResponse.json(
        {
          success: false,
          message: "Audit data is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A conversation history is required.",
        },
        {
          status: 400,
        }
      );
    }

    const answer =
      await chatWithAudit(
        audit,
        messages
      );

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(
      "AI CHAT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate AI response.",
      },
      {
        status: 500,
      }
    );
  }
}