import OpenAI from "openai";
import type { AuditData } from "@/types/audit";

export async function generateAiRecommendations(
  auditData: AuditData
): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log(
    "OPENAI KEY EXISTS:",
    !!process.env.OPENAI_API_KEY
  );

  console.log(
    "KEY LENGTH:",
    process.env.OPENAI_API_KEY?.length
  );

  const prompt = `
You are a senior SEO consultant.

Analyse the website audit results and provide specific recommendations based on the actual issues found.

WEBSITE INFORMATION

Title:
${auditData.title}

Meta Description:
${auditData.metaDescription ?? "Missing"}

SEO SCORE:
${auditData.seoAnalysis.score}

CONTENT SCORE:
${auditData.contentAnalysis.score}

TECHNICAL SCORE:
${auditData.technicalAnalysis.score}

SEO CHECKS

Title Present:
${auditData.seoAnalysis.checks.hasTitle}

Meta Description Present:
${auditData.seoAnalysis.checks.hasMetaDescription}

Title Length Good:
${auditData.seoAnalysis.checks.titleLengthGood}

Meta Length Good:
${auditData.seoAnalysis.checks.metaLengthGood}

Single H1:
${auditData.seoAnalysis.checks.singleH1}

Canonical Tag:
${auditData.seoAnalysis.checks.hasCanonical}

Open Graph Title:
${auditData.seoAnalysis.checks.hasOgTitle}

Open Graph Description:
${auditData.seoAnalysis.checks.hasOgDescription}

Open Graph Image:
${auditData.seoAnalysis.checks.hasOgImage}

Images:
${auditData.images}

Missing ALT Tags:
${auditData.missingAltTags}

Links:
${auditData.links}

Return your response in EXACTLY this format:

SUMMARY:
Write 2-4 sentences summarising the overall website quality.

IMPROVEMENTS:
- Give specific improvements based on missing SEO items
- Mention missing ALT tags if any exist
- Mention missing Open Graph tags if any are missing
- Mention missing canonical tag if missing
- Mention title or meta length issues if present
- Give a maximum of 5 improvements

META_DESCRIPTION:
Return ONLY an improved meta description.
Do not include quotation marks.
Do not include HTML.
Maximum 155 characters.
`;

  const response =
    await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return (
    response.choices[0].message.content ??
    "No AI recommendations available."
  );
}