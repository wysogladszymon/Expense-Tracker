import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
export interface iUser{
  email:string;
  token:string;
  username:string;
} 

type User = iUser | null;
export interface AuthContextInterface {
  user: User
  dispatchLogin: Dispatch<useReducerActionInterface>;
}

const AuthContext = createContext({ user: null } as AuthContextInterface);

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface useReducerStateInterface {
  user: User
}

export interface useReducerActionInterface {
  type: string;
  payload: User;
}

export const authReducer = (
  state: useReducerStateInterface,
  action: useReducerActionInterface
): useReducerStateInterface => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem('user');
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

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      dispatchLogin({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log(loginState.user);
  
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
