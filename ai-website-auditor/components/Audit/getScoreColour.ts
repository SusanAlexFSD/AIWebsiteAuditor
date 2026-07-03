export default function getScoreColour(
  score: number
): "green" | "yellow" | "red" {
  if (score >= 80) {
    return "green";
  }

  if (score >= 60) {
    return "yellow";
  }

  return "red";
}