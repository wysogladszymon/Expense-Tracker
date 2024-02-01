import { FC } from "react";
import { Navbar } from "../components";
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
      login: admin
      <br />
      password: ABCabc123!
    </div>
  );
};
