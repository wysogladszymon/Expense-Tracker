import { FC, ReactNode } from "react";
import { Pie } from "react-chartjs-2";
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie", any>;
}

export const PieChart: FC<PieChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  return <Pie data={data} options={options} className="-translate-y-0" />;
};
