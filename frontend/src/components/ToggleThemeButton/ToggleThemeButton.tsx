import { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ToggleThemeButton.module.css";
import { ThemeType, useThemeContext } from "../../store/ThemeContext";

interface ToggleThemeButtonProps {
  className : string,
}

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = ({className}) => {
  const { theme, dispatchTheme } = useThemeContext();

  const handleClickTheme = () => {
    if (theme == ThemeType.Light) dispatchTheme({ type: ThemeType.Dark });
    else dispatchTheme({ type: ThemeType.Light });
  };

  const buttoncolor = theme == ThemeType.Light ?  'bg-gray-400': 'bg-gray-800';
  const circleStyle = theme == ThemeType.Light ? "transform translate-x-7" : "transform translate-x-0"
  const { button, check, moon, sun , circle, div} = styles;

  return (
    <div className={`${className} ${div}`} >
      <label htmlFor={check} className={` ${button} ${buttoncolor}`}>
        <input
          type="checkbox"
          onClick={handleClickTheme}
          id={check}
        />
        <FaSun className={sun} />
        <FaMoon color='white' className={moon} />
        <span className={`${circle} ${circleStyle}`}/>
      </label>
    </div>
  );
};
