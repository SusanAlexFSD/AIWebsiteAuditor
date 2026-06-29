"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface TrendChartProps {
  labels: string[];
  scores: number[];
}

export default function TrendChart({
  labels,
  scores,
}: TrendChartProps) {
  return (
    <div className="border rounded-xl p-6 bg-white mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Score Trend
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Overall Score",
              data: scores,
            },
          ],
        }}
      />
    </div>
  );
}