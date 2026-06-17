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
${auditData.metaDescription}

SEO Score:
${auditData.seoAnalysis.score}

Content Score:
${auditData.contentAnalysis.score}

Technical Score:
${auditData.technicalAnalysis.score}

Provide:

1. A short summary
2. Top 3 improvements
3. Suggested meta description if one is missing

Keep the response concise.
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