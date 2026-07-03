import type { AiIntent } from "./detectIntent";

export function getIntentPrompt(
  intent: AiIntent
): string {
  switch (intent) {
    case "seo-title":
      return `
Generate FIVE SEO-optimised page titles.

Requirements:

• 50-60 characters
• High click-through rate
• Include important keywords
• Explain which title is best.
`;

    case "meta-description":
      return `
Generate THREE compelling meta descriptions.

Requirements:

• Maximum 155 characters
• Encourage clicks
• Include keywords naturally
• Explain which description you recommend.
`;

    case "schema":
      return `
Generate production-ready JSON-LD Schema.

Explain:

• Why it matters
• Where to place it
• How to test it

Return complete JSON only.
`;

    case "metadata":
      return `
Generate a complete Next.js metadata.ts file.

Include:

• title
• description
• Open Graph
• Twitter
• Canonical
`;

    case "robots":
      return `
Generate a production-ready robots.txt file.

Explain where it belongs.
`;

    case "sitemap":
      return `
Generate a sitemap.xml example.

Explain how to generate one automatically in Next.js.
`;

    case "performance":
      return `
Focus only on performance.

Explain Core Web Vitals.

Prioritise the biggest improvements first.
`;

    case "accessibility":
      return `
Focus only on accessibility.

Reference WCAG best practices.

Explain every issue clearly.

Include code where appropriate.
`;

    case "content":
      return `
Act as a senior copywriter.

Rewrite content to improve:

• SEO
• Readability
• Conversion rate

Produce polished copy.
`;

    case "react":
      return `
Generate production-ready React code.

Use modern React.

Explain the implementation.
`;

    case "nextjs":
      return `
Generate production-ready Next.js code.

Use App Router.

Follow current best practices.
`;

    default:
      return `
Answer like a senior SEO consultant.

Explain your reasoning.

Give practical advice.

Provide examples where useful.
`;
  }
}