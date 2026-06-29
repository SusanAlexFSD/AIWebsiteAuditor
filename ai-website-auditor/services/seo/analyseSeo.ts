interface SeoInput {
  title: string;
  metaDescription: string | null;
  h1Count: number;

  hasCanonical?: boolean;

  hasOgTitle?: boolean;
  hasOgDescription?: boolean;
  hasOgImage?: boolean;
}

export function analyseSeo(
  data: SeoInput
) {
  let score = 100;

  const titleLength =
    data.title?.trim().length || 0;

  const metaLength =
    data.metaDescription?.trim().length || 0;

  const checks = {
    hasTitle: !!data.title,

    hasMetaDescription:
      !!data.metaDescription,

    hasH1: data.h1Count > 0,

    titleLengthGood:
      titleLength >= 30 &&
      titleLength <= 60,

    metaLengthGood:
      metaLength >= 120 &&
      metaLength <= 160,

    singleH1:
      data.h1Count === 1,

    hasCanonical:
      !!data.hasCanonical,

    hasOgTitle:
      !!data.hasOgTitle,

    hasOgDescription:
      !!data.hasOgDescription,

    hasOgImage:
      !!data.hasOgImage,
  };

  if (!checks.hasMetaDescription)
    score -= 20;

  if (!checks.hasH1)
    score -= 20;

  if (!checks.titleLengthGood)
    score -= 5;

  if (!checks.metaLengthGood)
    score -= 5;

  if (!checks.singleH1)
    score -= 5;

  if (!checks.hasCanonical)
    score -= 10;

  if (!checks.hasOgTitle)
    score -= 5;

  if (!checks.hasOgDescription)
    score -= 5;

  if (!checks.hasOgImage)
    score -= 5;

  score = Math.max(score, 0);

  return {
    score,
    titleLength,
    metaLength,
    checks,
  };
}