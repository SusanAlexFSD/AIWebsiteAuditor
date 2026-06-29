type Props = {
  totalAudits: number;
  averageScore: number;
  bestScore: number;
};

export default function StatsCards({
  totalAudits,
  averageScore,
  bestScore,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="border rounded-xl p-6 text-center bg-white">
        <p className="text-3xl font-bold">
          {totalAudits}
        </p>

        <p className="text-gray-600">
          Total Audits
        </p>
      </div>

      <div className="border rounded-xl p-6 text-center bg-white">
        <p className="text-3xl font-bold">
          {averageScore}
        </p>

        <p className="text-gray-600">
          Average Score
        </p>
      </div>

      <div className="border rounded-xl p-6 text-center bg-white">
        <p className="text-3xl font-bold">
          {bestScore}
        </p>

        <p className="text-gray-600">
          Best Score
        </p>
      </div>
    </div>
  );
}