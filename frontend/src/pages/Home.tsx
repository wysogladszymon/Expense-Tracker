import { FC, useEffect, useState } from "react";
import { Navbar, Money, Expense } from "../components";
import { useThemeContext } from "../store/ThemeContext";
import { Finanse } from "../types";
import { useAuthContext } from "../store/AuthContext";
interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { background, header } = useThemeContext().specifies;
  const [earnings, setEarnings] = useState<Finanse[]>([]);
  const [expenses, setExpenses] = useState<Finanse[]>([]);
  const { user } = useAuthContext();

  async function getAll(path: string): Promise<Finanse[]> {
    const response = await fetch(`/api/${path}/`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    return data;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inc = await getAll("income");
        setEarnings(inc);
        const exp = await getAll("expense");
        setExpenses(exp);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200 ${background}`}
    >
      <Navbar pageName="Home Page" />

      <div className="flex justify-center h-96">
        <Money className="ml-20" title="Incomes" headerStyle={header}>
          {earnings.map((el) => (
            <Expense
              key={el._id}
              date={new Date(el.updatedAt)}
              amount={el.amount}
              category={el.category}
              title={el.title}
              finanse={el.finanse}
            />
          ))}
        </Money>
        <Money
          className="ml-5 mr-20"
          title="Expenses"
          headerStyle={header}
        >{expenses.map((el) => (
          <Expense
            key={el._id}
            date={new Date(el.updatedAt)}
            amount={el.amount}
            category={el.category}
            title={el.title}
            finanse={el.finanse}
          />
        ))}</Money>
      </div>
    </div>
  );
};
