'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function OrderChart({ data }: { data: { timestamp: string; total: number }[] }) {
  const chartData: ChartData<'line'> = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'จำนวนออเดอร์',
        data: data.map((item) => item.total),
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}
