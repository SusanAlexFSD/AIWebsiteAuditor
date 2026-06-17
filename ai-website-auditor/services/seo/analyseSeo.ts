interface SeoInput {
  title: string;
  metaDescription: string | null;
  h1Count: number;
}

export function analyseSeo(
  data: SeoInput
) {
  let score = 100;

  const checks = {
    hasTitle: !!data.title,
    hasMetaDescription:
      !!data.metaDescription,
    hasH1: data.h1Count > 0,
  };

  if (!checks.hasMetaDescription) {
    score -= 20;
  }

  if (!checks.hasH1) {
    score -= 20;
  }

  return {
    score,
    checks,
  };
}