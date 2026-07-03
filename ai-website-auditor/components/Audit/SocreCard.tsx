interface Props {
  title: string;
  score: number;
  icon: string;
  colour: "green" | "yellow" | "red";
}

export default function ScoreCard({
  title,
  score,
  icon,
  colour,
}: Props) {
  const colours = {
    green: {
      badge: "bg-green-100 text-green-700",
      bar: "bg-green-500",
    },
    yellow: {
      badge: "bg-yellow-100 text-yellow-700",
      bar: "bg-yellow-500",
    },
    red: {
      badge: "bg-red-100 text-red-700",
      bar: "bg-red-500",
    },
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {icon}
          </span>

          <h3 className="text-xl font-semibold">
            {title}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${colours[colour].badge}`}
        >
          {score}/100
        </span>
      </div>

      <div className="mb-2 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colours[colour].bar}`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <p className="text-sm text-gray-500">
        Overall score
      </p>
    </div>
  );
}