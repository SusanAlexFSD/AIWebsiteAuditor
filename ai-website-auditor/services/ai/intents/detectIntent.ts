export type AiIntent =
  | "seo-title"
  | "meta-description"
  | "schema"
  | "metadata"
  | "robots"
  | "sitemap"
  | "accessibility"
  | "performance"
  | "content"
  | "react"
  | "nextjs"
  | "general";

export function detectIntent(
  message: string
): AiIntent {
  const text = message.toLowerCase();

  if (
    text.includes("title")
  )
    return "seo-title";

  if (
    text.includes("meta description") ||
    text.includes("description")
  )
    return "meta-description";

  if (
    text.includes("schema")
  )
    return "schema";

  if (
    text.includes("metadata")
  )
    return "metadata";

  if (
    text.includes("robots")
  )
    return "robots";

  if (
    text.includes("sitemap")
  )
    return "sitemap";

  if (
    text.includes("accessibility") ||
    text.includes("wcag") ||
    text.includes("aria")
  )
    return "accessibility";

  if (
    text.includes("performance") ||
    text.includes("core web vitals")
  )
    return "performance";

  if (
    text.includes("homepage") ||
    text.includes("rewrite") ||
    text.includes("content")
  )
    return "content";

  if (
    text.includes("react")
  )
    return "react";

  if (
    text.includes("next")
  )
    return "nextjs";

  return "general";
}