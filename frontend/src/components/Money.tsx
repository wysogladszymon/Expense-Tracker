import { FC, ReactNode } from "react";
import { useThemeContext } from "../store/ThemeContext";

interface MoneyProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const Money: FC<MoneyProps> = ({ children, className, title }) => {
    const {container} = useThemeContext().specifies;
  return (
    <div className={`${className} ${container} flex flex-col items-center w-4/12 h-4/6`}>
      <h1 className='mt-4'>{title}</h1>
      {children}
    </div>
  );
};
