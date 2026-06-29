interface TechnicalInput {
  hasViewport: boolean;
  hasSchema: boolean;
  usesHttps: boolean;
  hasRobots: boolean;
  hasSitemap: boolean;
}

export function analyseTechnical(
  data: TechnicalInput
) {
  let score = 100;

  const checks = {
    hasViewport:
      data.hasViewport,

    hasSchema:
      data.hasSchema,

    usesHttps:
      data.usesHttps,

    hasRobots:
      data.hasRobots,

    hasSitemap:
      data.hasSitemap,
  };

  if (!checks.usesHttps) {
    score -= 20;
  }

  if (!checks.hasViewport) {
    score -= 20;
  }

  if (!checks.hasRobots) {
    score -= 20;
  }

  if (!checks.hasSitemap) {
    score -= 20;
  }

  if (!checks.hasSchema) {
    score -= 20;
  }

  score = Math.max(score, 0);

  return {
    score,
    checks,
  };
}