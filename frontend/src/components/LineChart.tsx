import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { useThemeContext } from '../store';

ChartJS.register(
  LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement
);

interface LineChartProps {
  data: ChartData<'line', any>;
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  const { theme } = useThemeContext();
  
  const textColor = theme === 'dark' ? 'white' : 'black';

  const options = {
    elements: {
      line: {
        tension: 0.3, 
        borderColor: textColor,
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
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

  return <Line data={data} options={options} className="translate-y-20" />;
};
