import { FC } from "react";
import { Navbar, Loginform } from "../components";
import { useThemeContext } from "../store/ThemeContext";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  const { specifies } = useThemeContext();
  const { background } = specifies;

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200  ${background}`}
    >
      <Navbar pageName="Login Page" />
      <Loginform />
    </div>
  );
};
