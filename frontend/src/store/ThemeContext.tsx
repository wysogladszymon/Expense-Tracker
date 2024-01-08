import {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  FC,
  useReducer,
} from "react";

export interface Theme {
  container: string,
  button: string,
  input: string,
  header: string,
  label:string,
  background:string,
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
    container: "border-gray-600 bg-slate-50 ",
    button: "border-slate-200 hover:border-slate-300 text-black",
    input: " bg-white border-gray-300 text-black",
    header: "border-gray-600 bg-gray-300 text-black",
    label: 'text-black',
    background: 'bg-gray-100',
  },
  dark: {
    container: "border-black bg-gray-800 ",
    button: "border-gray-700 hover:border-gray-600 text-white",
    input: "bg-gray-900 border-gray-700 text-white",
    header: "border-black bg-gray-700 text-white",
    label: 'text-white',
    background:'bg-gray-600',
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
