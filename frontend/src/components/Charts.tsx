import { FC, ReactNode, useEffect, useState } from "react";
import { BarChart } from ".";
import { useFetchedDataContext } from "../store/FetchedDataContext";
import { Finanse } from "../types";
import { ChartData, Chart as ChartJS } from "chart.js";

interface ChartsProps {
  children?: ReactNode;
  className?: string;
}

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


export const Charts: FC<ChartsProps> = ({ children, className }) => {
  const { expenses, earnings, categories } = useFetchedDataContext();
  const [selectedChart, setSelectedChart] = useState<string>('');
  const year = new Date().getFullYear();
  
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: Array(12).fill(1),
        borderWidth: 1,
      },
    ],
  });
  
  return (
    <div style={{ height: "300px" }} className={`flex ml-36`}>
      <div className="w-36 h-12 m-10">
        <label htmlFor="chartSelect">Choose chart</label>
        <select id="chartSelect" className="w-40 h-8" value={selectedChart} onChange={(e)=>setSelectedChart(e.target.value)} >
          <option value={`Balance in ${year}`}>Balance in {year}</option>
          <option value={`Expenses in ${year}`}>Expenses in {year}</option>
          <option value={`Incomes in ${year}`}>Incomes in {year}</option>
          <option value={`Categories`}>Categories</option>
        </select>
      </div>
      <div
        className={`${className} ml-auto mr-auto overflow-hidden`}
        style={{ height: "300px", width: "400px" }}
      >
        {chartData && <BarChart data={chartData} />}
      </div>
    </div>
  );
};
