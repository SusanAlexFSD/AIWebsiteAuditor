interface ContentInput {
  h1Count: number;
  h2Count: number;
  images: number;
}

export function analyseContent(
  data: ContentInput
) {
  let score = 100;

  if (data.h1Count === 0) {
    score -= 30;
  }

  if (data.h2Count === 0) {
    score -= 20;
  }

  if (data.images === 0) {
    score -= 10;
  }

  return {
    score,
  };
}