interface MetricCardProps {
  title: string;
  score: number;
}

export default function MetricCard({
  title,
  score,
}: MetricCardProps) {
  let colour = "text-red-600";
  let bg = "bg-red-50";
  let border = "border-red-200";
  let status = "Needs Improvement";
  let icon = "🔴";

  if (score >= 80) {
    colour = "text-green-600";
    bg = "bg-green-50";
    border = "border-green-200";
    status = "Excellent";
    icon = "🟢";
  } else if (score >= 60) {
    colour = "text-yellow-600";
    bg = "bg-yellow-50";
    border = "border-yellow-200";
    status = "Good";
    icon = "🟡";
  }

  return (
    <div
      className={`
        ${bg}
        ${border}
        border
        rounded-2xl
        p-6
        text-center
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
      `}
    >
      <p className="text-sm font-semibold text-gray-600 mb-3">
        {icon} {title}
      </p>

      <p className={`text-5xl font-bold ${colour}`}>
        {score}
      </p>

      <p className={`mt-3 font-medium ${colour}`}>
        {status}
      </p>
    </div>
  );
}