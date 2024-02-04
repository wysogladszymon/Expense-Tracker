import { FC } from "react";
import { Navbar, Money } from "../components";
import { useThemeContext } from "../store/ThemeContext";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { specifies } = useThemeContext();
  const { background } = specifies;

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200  ${background}`}
    >
      <Navbar pageName="Home Page" />


      <div className="flex justify-center h-96">
        <Money title='Earnings'></Money>
        <Money className='ml-5' title='Expenses'></Money>
      </div>
    </div>
  );
};
