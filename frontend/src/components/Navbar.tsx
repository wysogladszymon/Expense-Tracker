import { FC } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { ToggleThemeButton } from "./ToggleThemeButton";

interface NavbarProps {
  pageName:string,
}

export const Navbar: FC<NavbarProps> = ({pageName}) => {
  const { header } = useThemeContext().specifies;
  
  return (
    <div className={`w-full h-16  border-b-2  mb-10 relative flex justify-center items-center pl-5 pr-5 ${header}`}>
        <h1>{pageName}</h1>
        <ToggleThemeButton className=' ml-auto '/>
    </div>
  );
};
