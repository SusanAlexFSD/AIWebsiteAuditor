import OpenAI from "openai";

export async function generateAiRecommendations(
  auditData: any
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
You are an expert SEO consultant.

Website Title:
${auditData.title}

Meta Description:
${auditData.metaDescription ?? "Missing"}

SEO Score:
${auditData.seoAnalysis.score}

Content Score:
${auditData.contentAnalysis.score}

Technical Score:
${auditData.technicalAnalysis.score}

Return your response in EXACTLY this format:

SUMMARY:
<summary>

IMPROVEMENTS:
- improvement 1
- improvement 2
- improvement 3

META_DESCRIPTION:
Return ONLY the meta description text.
Do not include HTML tags.
Do not include quotation marks.
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