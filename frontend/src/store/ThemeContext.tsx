import {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  FC,
  useReducer,
  useEffect,
} from "react";

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  font: string;
}

export enum ThemeType {
  Light = "light",
  Dark = "dark",
}

export interface ThemeContextInterface {
  theme: ThemeType;
  specifies: Theme;
  dispatch: Dispatch<ActionInterface>;
}

export const themes: Record<ThemeType, Theme> = {
  light: {
    primary: "#b0bec5",
    secondary: "#ffccbc",
    background: "#fafafa",
    font: "#546e7a",
  },
  dark: {
    primary: "#546e7a",
    secondary: "#d84315",
    background: "#263238",
    font: "#eceff1",
  },
};

export interface ActionInterface {
  type: string;
  payload?: string;
}

export interface StateInterface {
  theme: ThemeType;
  specifies: Theme;
}
//creating context
export const ThemeContext = createContext({
  theme: "light",
  specifies: themes.light,
  dispatch: () => {},
} as ThemeContextInterface);

//reducer for our theme change
export const themeReducer = (
  state: StateInterface,
  action: ActionInterface
) => {
  switch (action.type) {
    //if it is light return dark and opposite
    case ThemeType.Dark:
      return { ...state, theme: ThemeType.Dark, specifies: themes.dark };
    case ThemeType.Light:
      return { ...state, theme: ThemeType.Light, specifies: themes.light };
    default:
      return state;
  }
};

//themeContext Provider
export interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const initialState: StateInterface = {
    theme: ThemeType.Light,
    specifies: themes.light,
  };
  //using useReducer (i know that in this useState will be more appropriate, but I need to practice this hook)
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

//useTheme hook
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context) return context;
  else throw Error("useThemeContext should be used in ThemeContextProvider");
};
