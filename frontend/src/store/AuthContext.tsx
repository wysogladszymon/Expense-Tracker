import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";

export interface AuthContextInterface {
  user: {
    email: string;
    token: string;
  } | null;
  dispatchLogin: Dispatch<useReducerActionInterface>;
}

const AuthContext = createContext({ user: null } as AuthContextInterface);

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface useReducerStateInterface {
  user: {
    email: string;
    token: string;
  } | null;
}

export interface useReducerActionInterface {
  type: string;
  payload: {
    email: string;
    token: string;
  } | null;
}

export const authReducer = (
  state: useReducerStateInterface,
  action: useReducerActionInterface
): useReducerStateInterface => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [loginState, dispatchLogin] = useReducer(authReducer, {
    user: null,
  } as useReducerStateInterface);

  // useEffect(() => {
  //   const userString = localStorage.getItem("user");
  //   const user = userString ? JSON.parse(userString) : null;

  //   if (user) {
  //     dispatchLogin({ type: "LOGIN", payload: user });
  //   }
  // }, []);
  // console.log(loginState.user);
  
  return (
    <AuthContext.Provider value={{ ...loginState, dispatchLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) return context;
  else throw Error("useAuthContext should be used in AuthContextProvider");
};
