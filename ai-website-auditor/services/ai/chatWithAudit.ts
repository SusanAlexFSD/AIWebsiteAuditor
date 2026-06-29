import OpenAI from "openai";
import type { AuditData } from "@/types/audit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function chatWithAudit(
  audit: AuditData,
  messages: ChatMessage[]
) {
  const systemPrompt = `
You are an expert Senior SEO Consultant,
Technical SEO Engineer,
Accessibility Specialist,
UX Consultant
and Web Developer.

You are helping a client improve their website.

Always answer using the website audit below.

Never invent issues that are not present.

Explain WHY something matters.

Provide practical, actionable advice.

If appropriate, generate example HTML,
React, Next.js, CSS or JavaScript code.

If the user asks a follow-up question,
remember the previous conversation.

Keep answers friendly, accurate and easy to understand.

=========================
WEBSITE AUDIT
=========================

Website:
${audit.pageUrl}

Title:
${audit.title}

SEO Score:
${audit.seoAnalysis.score}

Content Score:
${audit.contentAnalysis.score}

Technical Score:
${audit.technicalAnalysis.score}

Accessibility Score:
${audit.accessibilityAnalysis.score}

Overall Score:
${audit.overallScore}

Meta Description:
${audit.metaDescription ?? "Missing"}

Links:
${audit.links}

Images:
${audit.images}

Missing ALT Tags:
${audit.missingAltTags}

H1 Tags:
${audit.h1Count}

H2 Tags:
${audit.h2Count}

=========================
SEO CHECKS
=========================

Title Present:
${audit.seoAnalysis.checks.hasTitle}

Meta Description:
${audit.seoAnalysis.checks.hasMetaDescription}

Canonical:
${audit.seoAnalysis.checks.hasCanonical}

Open Graph Title:
${audit.seoAnalysis.checks.hasOgTitle}

Open Graph Description:
${audit.seoAnalysis.checks.hasOgDescription}

Open Graph Image:
${audit.seoAnalysis.checks.hasOgImage}

=========================
TECHNICAL CHECKS
=========================

HTTPS:
${audit.technicalAnalysis.checks.usesHttps}

Viewport:
${audit.technicalAnalysis.checks.hasViewport}

Schema:
${audit.technicalAnalysis.checks.hasSchema}

robots.txt:
${audit.technicalAnalysis.checks.hasRobots}

sitemap.xml:
${audit.technicalAnalysis.checks.hasSitemap}
`;

  const completion =
    await openai.chat.completions.create({
      model: "gpt-4.1",

      temperature: 0.4,

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },

        ...messages,
      ],
    });

  return (
    completion.choices[0].message.content ??
    "No response."
  );
}