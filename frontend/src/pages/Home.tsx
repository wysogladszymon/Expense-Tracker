import { FC, useEffect, useState } from "react";
import { Navbar, Money, Expense } from "../components";
import { useThemeContext } from "../store/ThemeContext";
import { useAuthContext } from "../store/AuthContext";
import { myFetch, deleteFinanse } from "../store/Fetches";
import { useFetchedDataContext } from "../store/FetchedDataContext";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const { background, header } = useThemeContext().specifies;
  const {categories, earnings, expenses, setCategories,setEarnings,setExpenses} = useFetchedDataContext();
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

  const incomeSum = earnings.reduce((acc, income) => acc + income.amount, 0);
  const expenseSum = expenses.reduce(
    (acc, expense) => acc - Math.abs(expense.amount),
    0
  );

  return (
    <div
      className={`w-screen h-screen transition-colors duration-200 ${background}`}
    >
      <Navbar pageName="Home Page" />

      <div className="flex justify-center h-96">
        <Money
          categories={categories}
          className="ml-20"
          title="Incomes"
          headerStyle={header}
          suma={incomeSum}
        >
          {earnings.map((el, index) => (
            <Expense
              className={
                index === expenses.length - 1 && index > 4
                  ? "border-b-0"
                  : "border-b-2"
              }
              key={el._id}
              date={new Date(el.updatedAt)}
              amount={el.amount}
              category={el.category}
              title={el.title}
              finanse={el.finanse}
              trashClick={() => {
                async function func() {
                  setEarnings((prevEarnings) =>
                    prevEarnings.filter((item) => item._id !== el._id)
                  );
                  await deleteFinanse("income", user, el._id);
                }
                func();
              }}
            />
          ))}
        </Money>
        <Money
          categories={categories}
          className="ml-5 mr-20"
          title="Expenses"
          headerStyle={header}
          suma={expenseSum}
        >
          {expenses.map((el, index) => (
            <Expense
              className={
                index === expenses.length - 1 && index > 4
                  ? "border-b-0"
                  : "border-b-2"
              }
              key={el._id}
              date={new Date(el.updatedAt)}
              amount={-Math.abs(el.amount)}
              category={el.category}
              title={el.title}
              finanse={el.finanse}
              trashClick={() => {
                async function func() {
                  setExpenses((prevEarnings) =>
                    prevEarnings.filter((item) => item._id !== el._id)
                  );
                  await deleteFinanse("expense", user, el._id);
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
