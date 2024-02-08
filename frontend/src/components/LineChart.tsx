import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { useThemeContext } from '../store';

ChartJS.register(
  LineElement, CategoryScale, LinearScale, Tooltip, Legend,PointElement
);

interface LineChartProps {
  data: ChartData<'line', any>;
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  const {theme} = useThemeContext();
  const options = {
    elements: {
      line: {
        tension: 0.3, 
        borderColor: theme==='dark' ? 'white' : 'black',
      }
    }
  };

  return <Line typeof='line' data={data} options={options} className="translate-y-20" />;
};
