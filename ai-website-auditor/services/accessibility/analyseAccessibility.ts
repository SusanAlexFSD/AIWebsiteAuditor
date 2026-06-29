interface AccessibilityInput {
  missingAltTags: number;
  h1Count: number;
  title: string;
}

export function analyseAccessibility(
  data: AccessibilityInput
) {
  let score = 100;

  if (!data.title) {
    score -= 20;
  }

  if (data.h1Count === 0) {
    score -= 20;
  }

  if (data.missingAltTags > 0) {
    score -= Math.min(
      data.missingAltTags * 5,
      40
    );
  }

  return {
    score: Math.max(score, 0),
  };
}