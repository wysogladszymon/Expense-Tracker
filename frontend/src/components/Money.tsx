import { FC, ReactNode } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { Scrollbars } from "react-custom-scrollbars";

interface MoneyProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  headerStyle?: string;
}

export const Money: FC<MoneyProps> = ({
  children,
  className,
  title,
  headerStyle,
}) => {
  const { container } = useThemeContext().specifies;
  return (
    <div
      className={`${className} ${container} flex flex-col w-1/2 h-4/6 border-solid border-2 relative rounded-s rounded-e p5`}
    >
      <h1
        className={`pl-6 pb-4 border-0 border-b-2 w-full pt-4 text-xl ${headerStyle}`}
      >
        {title}
      </h1>
      <Scrollbars style={{height:"100%"}}>{children}</Scrollbars>
    </div>
  );
};
