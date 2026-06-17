interface MetricCardProps {
  title: string;
  score: number;
}

export default function MetricCard({
  title,
  score,
}: MetricCardProps) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <p className="text-sm font-medium">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2">
        {score}
      </p>
    </div>
  );
}