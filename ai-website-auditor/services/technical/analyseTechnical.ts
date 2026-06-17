interface TechnicalInput {
  links: number;
  images: number;
}

export function analyseTechnical(
  data: TechnicalInput
) {
  let score = 100;

  if (data.links < 5) {
    score -= 10;
  }

  if (data.images === 0) {
    score -= 10;
  }

  return {
    score,
  };
}