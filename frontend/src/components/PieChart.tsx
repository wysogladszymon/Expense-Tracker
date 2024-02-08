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
import { useThemeContext } from "../store";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie", any>;
}

export const PieChart: FC<PieChartProps> = ({ data }) => {
  const { theme } = useThemeContext();
  
  const textColor = theme === 'dark' ? 'white' : 'black';

  const options = {
    elements: {
      line: {
        tension: 0.3, 
        borderColor: textColor,
      }
    },
    
    plugins: {
      legend: {
        labels: {
          color: textColor,
        }
      },
      tooltip: {
        titleColor: textColor, 
        bodyColor: textColor,
      }
    }
  };
  return <Pie data={data} options={options} className="-translate-y-0" />;
};
