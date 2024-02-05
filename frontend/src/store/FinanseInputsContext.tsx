import {
  createContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export interface FinanseInputContextInterface {
  incomes: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
  };
  expenses: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
  } ;
}

const defaultContext: FinanseInputContextInterface = {
  incomes: {
    title: "",
    setTitle: () => {},
    category: "",
    setCategory: () => {},
    amount: 0,
    setAmount: () => {},
  },
  expenses: {
    title: "",
    setTitle: () => {},
    category: "",
    setCategory: () => {},
    amount: 0,
    setAmount: () => {},
  },
};

const FinanseInputContext =
  createContext<FinanseInputContextInterface>(defaultContext);

interface ProviderProps {
  children: React.ReactNode;
}

export const FinanseInputContextProvider: FC<ProviderProps> = ({ children }) => {
  const [iTitle, isetTitle] = useState<string>("");
  const [iCategory, isetCategory] = useState<string>("");
  const [iAmount, isetAmount] = useState<number>(0);
  const [etitle, esetTitle] = useState<string>("");
  const [eCategory, esetCategory] = useState<string>("");
  const [eAmount, esetAmount] = useState<number>(0);

  const contextValue: FinanseInputContextInterface = {
    incomes: {
      title: iTitle,
      setTitle: isetTitle,
      category: iCategory,
      setCategory: isetCategory,
      amount: iAmount,
      setAmount: isetAmount,
    },
    expenses: {
      title: etitle,
      setTitle: esetTitle,
      category: eCategory,
      setCategory: esetCategory,
      amount: eAmount,
      setAmount: esetAmount,
    },
  };

  return (
    <FinanseInputContext.Provider value={contextValue}>
      {children}
    </FinanseInputContext.Provider>
  );
};

export function useFinanseContext() {
  const context = useContext(FinanseInputContext);
  if (context) return context;
  else
    throw Error(
      "useFinanseInputContext should be used in FinanseInputContextProvider"
    );
}
