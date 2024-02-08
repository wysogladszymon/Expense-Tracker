import { FC } from "react";
import { Navbar } from "../components";
import { useThemeContext } from "../store/ThemeContext";

interface NotloggedProps {}

export const Notlogged: FC<NotloggedProps> = () => {
  const { specifies } = useThemeContext();
  const { background } = specifies;

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200  ${background}`}
    >
      <Navbar pageName="Home Page" />
      <h1 className="ml-5">Login Brother! </h1>
      <p className='ml-5 left-3'>login: admin</p>
      <p className='ml-5 left-3'>password: ABCabc123!</p>
    </div>
  );
};
