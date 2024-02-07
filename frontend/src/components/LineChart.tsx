import { FC, ReactNode } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

interface LineChartProps {
  children?: ReactNode;
}

export const LineChart: FC<LineChartProps> = ({ children }) => {
  return <div className=''>{children} LineChart</div>;
};
