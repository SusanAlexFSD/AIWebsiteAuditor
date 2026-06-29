export function calculateOverallScore({
  seo,
  content,
  technical,
  accessibility,
}: {
  seo: number;
  content: number;
  technical: number;
  accessibility: number;
}) {
  return Math.round(
    (
      seo +
      content +
      technical +
      accessibility
    ) / 4
  );
}