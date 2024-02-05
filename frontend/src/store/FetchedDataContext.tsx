import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  ReactNode,
} from "react";
import { Category, Finanse } from "../types";

interface FetchedDataInterface {
  earnings: Finanse[];
  setEarnings: Dispatch<SetStateAction<Finanse[]>>;
  expenses: Finanse[];
  setExpenses: Dispatch<SetStateAction<Finanse[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

const defaultContextValue: FetchedDataInterface = {
  earnings: [],
  setEarnings: () => {},
  expenses: [],
  setExpenses: () => {},
  categories: [],
  setCategories: () => {},
};

const FetchedData = createContext<FetchedDataInterface>(defaultContextValue);

export const useFetchedDataContext = () => {
  const context = useContext(FetchedData);
  if (!context) {
    throw new Error(
      "useFetchedDataContext must be used within a FetchedDataContextProvider"
    );
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}
export const FetchedDataProvider: FC<ProviderProps> = ({ children }) => {
  const [earnings, setEarnings] = useState<Finanse[]>([]);
  const [expenses, setExpenses] = useState<Finanse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const contextValue: FetchedDataInterface = {
    earnings,
    setEarnings,
    expenses,
    setExpenses,
    categories,
    setCategories,
  };

  return (
    <FetchedData.Provider value={contextValue}>
      {children}
    </FetchedData.Provider>
  );
};
