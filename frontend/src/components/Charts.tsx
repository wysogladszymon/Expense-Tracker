import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { ChartData, Chart as ChartJS } from "chart.js";
import { BarChart, PieChart, LineChart } from ".";
import {
  useFetchedDataContext,
  countYearBalance,
  months,
  howManyDays,
  countMonthFinanse,
  countYearFinanse,
  useThemeContext,
  countMonthBilance,
  finanseOfCategories,
} from "../store/";

interface ChartsProps {
  children?: ReactNode;
  className?: string;
}

export const Charts: FC<ChartsProps> = ({ children, className }) => {
  const today = new Date();
  const { expenses, earnings, categories } = useFetchedDataContext();
  const { theme } = useThemeContext();
  const [selectedChart, setSelectedChart] = useState<string>(
    `Balance in ${months[today.getMonth()]}`
  );
  const [chart, setChart] = useState<ReactNode>("");
  let bilance: number[] = [];
  let chartData: ChartData<any>;
  const days = Array.from(
    { length: howManyDays(today) },
    (_, index) => index + 1
  );

  const handleChange = (e: string) => {
    let color = theme === "dark" ? "white" : " rgb(156 163 175)";
    console.log("Theme:", theme);
    console.log("Color:", color);
    const cats = [
      ...categories
        .filter((e) => e.category !== "other")
        .map((e) => e.category),
      "other",
    ];
    setSelectedChart(e);

    switch (e) {
      case `Balance in ${months[today.getMonth()]}`:
        bilance = countMonthBilance(earnings, expenses, today);
        chartData = {
          labels: days,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<LineChart data={chartData} />);
        break;
      case `Balance in ${today.getFullYear()}`:
        bilance = countYearBalance(earnings, expenses);
        chartData = {
          labels: months,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<LineChart data={chartData} />);
        break;
      case `Expenses in ${today.getFullYear()}`:
        bilance = countYearFinanse(expenses, today);
        chartData = {
          labels: months,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<BarChart data={chartData} />);
        break;
      case `Incomes in ${today.getFullYear()}`:
        bilance = countYearFinanse(earnings, today);
        chartData = {
          labels: months,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<BarChart data={chartData} />);
        break;
      case `Income categories in ${today.getFullYear()}`:
        bilance = finanseOfCategories(earnings, cats);
        chartData = {
          labels: cats,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor:
                theme === "dark"
                  ? [
                      "#4d4d4d", // Szary
                      "#2ca02c", // Zielony
                      "#9467bd", // Fioletowy
                      "#8c564b", // Brązowy
                      "#7f7f7f", // Szary
                      "#e377c2", // Różowy
                      "#bcbd22", // Żółty
                      "#17becf", // Cyjan
                      "#1f77b4", // Niebieski (dodany)
                    ]
                  : [
                      "#d9d9d9", // Szary
                      "#1f77b4", // Niebieski
                      "#ff7f0e", // Pomarańczowy
                      "#2ca02c", // Zielony
                      "#9467bd", // Fioletowy
                      "#8c564b", // Brązowy
                      "#e377c2", // Różowy
                      "#7f7f7f", // Szary
                    ],
            },
          ],
        };
        setChart(
          <>
            <PieChart data={chartData} />
          </>
        );
        break;
      case `Expense categories in ${today.getFullYear()}`:
        bilance = finanseOfCategories(expenses, cats);
        chartData = {
          labels: cats,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor:
                theme === "dark"
                  ? [
                      "#4d4d4d", // Szary
                      "#2ca02c", // Zielony
                      "#9467bd", // Fioletowy
                      "#8c564b", // Brązowy
                      "#7f7f7f", // Szary
                      "#e377c2", // Różowy
                      "#bcbd22", // Żółty
                      "#17becf", // Cyjan
                      "#1f77b4", // Niebieski (dodany)
                    ]
                  : [
                      "#d9d9d9", // Szary
                      "#1f77b4", // Niebieski
                      "#ff7f0e", // Pomarańczowy
                      "#2ca02c", // Zielony
                      "#9467bd", // Fioletowy
                      "#8c564b", // Brązowy
                      "#e377c2", // Różowy
                      "#7f7f7f", // Szary
                    ],
            },
          ],
        };
        setChart(
          <>
            <PieChart data={chartData} />
          </>
        );
        break;
      case `Expenses in ${months[today.getMonth()]}`:
        bilance = countMonthFinanse(expenses, today);
        chartData = {
          labels: days,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<BarChart data={chartData} />);
        break;
      case `Incomes in ${months[today.getMonth()]}`:
        bilance = countMonthFinanse(earnings, today);
        chartData = {
          labels: days,
          datasets: [
            {
              label: e,
              data: bilance,
              borderWidth: 1,
              backgroundColor: color,
            },
          ],
        };
        setChart(<BarChart data={chartData} />);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleChange(selectedChart);
  }, [expenses, earnings, theme]);

  return (
    <div style={{ height: "300px" }} className={`flex ml-36`}>
      <div className="w-56 h-12 mr-10 mt-10 mb-10 ml-10">
        <label htmlFor="chartSelect">Choose chart</label>
        <select
          id="chartSelect"
          className={`w-56 h-8 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
          value={selectedChart}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value={`Balance in ${months[today.getMonth()]}`}>
            Balance in {months[today.getMonth()]}
          </option>
          <option value={`Balance in ${today.getFullYear()}`}>
            Balance in {today.getFullYear()}
          </option>
          <option value={`Expenses in ${today.getFullYear()}`}>
            Expenses in {today.getFullYear()}
          </option>
          <option value={`Incomes in ${today.getFullYear()}`}>
            Incomes in {today.getFullYear()}
          </option>
          <option value={`Expenses in ${months[today.getMonth()]}`}>
            Expenses in {months[today.getMonth()]}
          </option>
          <option value={`Incomes in ${months[today.getMonth()]}`}>
            Incomes in {months[today.getMonth()]}
          </option>
          <option value={`Income categories in ${today.getFullYear()}`}>
            Income categories in {today.getFullYear()}
          </option>
          <option value={`Expense categories in ${today.getFullYear()}`}>
            Expense categories in {today.getFullYear()}
          </option>
        </select>
      </div>
      <div
        className={`${className} ml-auto mr-auto overflow-hidden`}
        style={{ height: "300px", width: "400px" }}
      >
        {chart}
      </div>
    </div>
  );
};
