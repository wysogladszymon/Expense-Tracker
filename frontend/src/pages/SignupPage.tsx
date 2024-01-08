import { FC } from "react";
import { Navbar, Signupform } from "../components";
import { useThemeContext } from "../store/ThemeContext";

interface SignupPageProps {}

export const SignupPage: FC<SignupPageProps> = () => {
  const { specifies } = useThemeContext();
  const { background } = specifies;

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200  ${background}`}
    >
      <Navbar pageName="Signup Page" />
      <Signupform />
    </div>
  );
};
