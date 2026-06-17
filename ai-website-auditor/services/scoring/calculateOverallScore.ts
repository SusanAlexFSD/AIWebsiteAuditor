interface ScoreInput {
  seo: number;
  content: number;
  technical: number;
}

export function calculateOverallScore(
  scores: ScoreInput
) {
  return Math.round(
    (
      scores.seo +
      scores.content +
      scores.technical
    ) / 3
  );
}