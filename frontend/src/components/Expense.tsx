import { FC, ReactNode } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";
import { useThemeContext } from "../store/ThemeContext";
import { Scrollbars } from "react-custom-scrollbars";

interface ExpenseProps {
  children?: ReactNode;
  date: Date;
  title: string;
  category: string;
  amount: Number | string;
  finanse:string;
}

export const Expense: FC<ExpenseProps> = ({
  children,
  amount,
  category,
  title,
  date,
  finanse
}) => {
  const { input } = useThemeContext().specifies;
  amount = Number(amount);
  const color = finanse === 'income' ? 'text-green-700' : 'text-red-900'; 
  return (
    <div
      className={`flex w-full h-10 border-b-2 content-center overflow-hidden`}
      style={{ maxHeight: "300px" }}
    >
      <p className={`basis-2/12 text-xs text-center h-full ${input}`}>
        {format(date, "dd/MM/yyyy HH:mm:ss")}
      </p>
      <p className={`pl-3 pt-2 basis-4/12 text-sm border-l-2 h-full ${input}`}>
        {title}
      </p>
      <p className={`pl-3 pt-2 basis-3/12 text-sm border-l-2 h-full ${input}`}>
        {category}
      </p>
      <p className={`pl-3 pt-2 basis-2/12 text-sm border-l-2 h-full ${input} ${color}`}>
        {String(amount.toFixed(2))}
      </p>
      <RiDeleteBin6Line
        className="pl-3 hover:cursor-pointer my-auto"
        size={30}
      />
    </div>
  );
};
