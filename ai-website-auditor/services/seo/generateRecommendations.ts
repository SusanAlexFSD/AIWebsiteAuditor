interface RecommendationInput {
  hasTitle: boolean;
  hasMetaDescription: boolean;
  hasH1: boolean;
}

export function generateRecommendations(
  checks: RecommendationInput
) {
  const recommendations: string[] = [];

  if (!checks.hasTitle) {
    recommendations.push(
      "Add a page title to improve SEO."
    );
  }

  if (!checks.hasMetaDescription) {
    recommendations.push(
      "Add a meta description to improve search visibility."
    );
  }

  if (!checks.hasH1) {
    recommendations.push(
      "Add an H1 heading to improve page structure."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "No major SEO issues detected."
    );
  }

  return recommendations;
}