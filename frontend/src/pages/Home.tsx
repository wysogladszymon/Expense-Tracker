import { FC, useEffect, useState } from "react";
import { Navbar, Money, Expense } from "../components";
import { useThemeContext } from "../store/ThemeContext";
import { Category, Finanse } from "../types";
import { useAuthContext } from "../store/AuthContext";
import { myFetch, deleteFinanse } from "../store/Fetches";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { background, header } = useThemeContext().specifies;
  const [earnings, setEarnings] = useState<Finanse[]>([]);
  const [expenses, setExpenses] = useState<Finanse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inc = await myFetch("/api/income/", user, "GET");
        setEarnings(inc);
        const exp = await myFetch("/api/expense/", user, "GET");
        setExpenses(exp);
        const cat = await myFetch("/api/categories/", user, "GET");
        setCategories(cat);
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
              trashClick={() => {
                async function func() { 
                  await deleteFinanse("income", user, el._id);
                  setEarnings(prevEarnings => prevEarnings.filter(item => item._id !== el._id));
                }
                func();
              }}
            />
          ))}
        </Money>
        <Money className="ml-5 mr-20" title="Expenses" headerStyle={header}>
          {expenses.map((el, index) => (
            <Expense
              className={index === 0 ? "border-t-0" : ""}
              key={el._id}
              date={new Date(el.updatedAt)}
              amount={el.amount}
              category={el.category}
              title={el.title}
              finanse={el.finanse}
              trashClick={() => {
                async function func() { 
                  await deleteFinanse("expense", user, el._id);
                  setEarnings(prevEarnings => prevEarnings.filter(item => item._id !== el._id));
                }
                func();
              }}
            />
          ))}
        </Money>
      </div>
    </div>
  );
};
