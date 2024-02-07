import { FC, ReactNode } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';

interface PieChartProps {
  children?: ReactNode;
}

export const PieChart: FC<PieChartProps> = ({ children }) => {
  return <div className=''>{children} PieChart</div>;
};
