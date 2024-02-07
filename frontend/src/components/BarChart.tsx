import { FC, ReactNode } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS , BarElement, CategoryScale, LinearScale, Tooltip, Legend} from "chart.js";


ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

interface BarChartProps {
  data: ChartData<'bar', any>;
}


export const BarChart: FC<BarChartProps> = ({ data }) => {
  const options = {
    responsive:true,
    maintainAspectRatio: true, 
  }
  return <Bar data={data} options={options} className="translate-y-20"/>;
};
