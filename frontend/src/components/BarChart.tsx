import { FC, ReactNode } from "react";
import { Bar } from "react-chartjs-2";
import {
  ChartData,
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useThemeContext } from "../store";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
  data: ChartData<"bar", any>;
}

export const BarChart: FC<BarChartProps> = ({ data }) => {
  const { theme } = useThemeContext();

  const textColor = theme === "dark" ? "white" : "black";

  const options = {
    elements: {
      line: {
        tension: 0.3,
        borderColor: textColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        titleColor: textColor,
        bodyColor: textColor,
      },
    },
  };
  return <Bar data={data} options={options} className="translate-y-20" />;
};
