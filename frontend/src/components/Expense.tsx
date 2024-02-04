import { FC, ReactNode } from 'react';

interface ExpenseProps {
  children?: ReactNode;
}

export const Expense: FC<ExpenseProps> = ({ children }) => {
  return <div className=''>{children} Expense</div>;
};
