import { FC, ReactNode } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";
import { useThemeContext } from "../store/ThemeContext";

interface ExpenseProps {
  children?: ReactNode;
  date: Date;
  title: string;
  category: string;
  amount: Number | string;
  finanse:string;
  className?:string;
  trashClick?: ()=> void;
}

export const Expense: FC<ExpenseProps> = ({
  amount,
  category,
  title,
  date,
  finanse,
  className,
  trashClick
}) => {
  const { input } = useThemeContext().specifies;
  amount = Number(amount);
  const color = finanse === 'income' ? 'text-green-700' : 'text-red-600';
  return (
    <div
      className={`${className} flex w-full h-10 content-center border-b-2  ${input} `}
      style={{ maxHeight: "300px" }}
    >
      <p className={`basis-2/12 text-xs text-center h-full ${input}`}>
        {format(date, "dd/MM/yyyy HH:mm:ss")}
      </p>
      <p className={`pl-3 pt-2 basis-4/12 text-sm border-l-2 h-full ${input}`}>
        {title}
      </p>
      <p className={`pl-3 pt-2 basis-3/12 text-sm border-l-2 h-full border-r-2 ${input}`}>
        {category}
      </p>
      <p className={`pl-3 pt-2 basis-2/12 text-sm h-full ${color}`}>
        {String(amount.toFixed(2))}
      </p>
      {trashClick ? <RiDeleteBin6Line onClick={trashClick}
        className="pl-3 hover:cursor-pointer my-auto"
        size={30}
      /> : <RiDeleteBin6Line
      className="pl-3 hover:cursor-pointer my-auto"
      size={30}
    /> }
    </div>
  );
};
