import { FC, ReactNode } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { Scrollbars } from "react-custom-scrollbars";
import { Category } from "../types";
import { BsDatabaseAdd } from "react-icons/bs";
import { useFinanseContext } from "../store/FinanseInputsContext";
import { useAuthContext } from "../store/AuthContext";
import { useFetchedDataContext } from "../store/FetchedDataContext";
interface MoneyProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  headerStyle?: string;
  suma?: number;
  categories: Category[];
}

export const Money: FC<MoneyProps> = ({
  children,
  className,
  title,
  headerStyle,
  suma,
  categories,
}) => {
  const { specifies, theme } = useThemeContext();
  const { container, input } = specifies;
  const {user} = useAuthContext();
  const { incomes, expenses } = useFinanseContext();
  const fetchedData = useFetchedDataContext();

  const handleClick = ()=>{
    async function f(){
      let category,amount, myTitle;
      if (title === 'Expenses'){
        category = expenses.category;
        amount = expenses.amount;
        myTitle = expenses.title;
      }else{
        category = incomes.category;
        amount = incomes.amount;
        myTitle = incomes.title;
      }
      console.log(category, amount, myTitle);
      const cats = categories.map((cat)=>cat.category);
      console.log(cats);
      
      if ( amount > 0 && myTitle !== '' && cats.includes(category)){
        console.log("elo");
        
        const ask = title === 'Expenses' ? 'expense' : 'income';
        console.log(JSON.stringify({category, title:myTitle, amount }));
        
        const response = await fetch(`/api/${ask}/`, {
          method:"POST",
          headers: {'Content-Type': 'application/json', Authorization: `Bearer ${user && user.token}` },
          body: JSON.stringify({category, title:myTitle, amount })
        });
        const data = await response.json();
        expenses.setCategory('');
        expenses.setTitle('');
        expenses.setAmount(0);
        incomes.setCategory('');
        incomes.setTitle('');
        incomes.setAmount(0);

        title === 'Expenses' ? fetchedData.setExpenses([data,...fetchedData.expenses]) : fetchedData.setEarnings([data,...fetchedData.earnings])
        return data;
      } 
    }
    f();
  }
  return (
    <div
      className={`${className} ${container} flex flex-col w-1/2 h-5/6 border-solid border-2 relative rounded-s rounded-e `}
    >
      <div className={`flex border-0 border-b-2 ${headerStyle}`}>
        <h1 className={`pl-6 pb-4  basis-8/12 pt-4 text-xl `}>
          {title}
          <BsDatabaseAdd
            className={`cursor-pointer`}
            onClick={() => {
              const element = document.querySelector(
                `.${title}title`
              ) as HTMLElement;
              element && element.focus();
            }}
          />
        </h1>
        <p className="basis-4/12 self-center">
          total: {suma === undefined || String(suma.toFixed(2))}
        </p>
      </div>
      {/* inputs */}
      <div
        className={` flex w-full h-0 content-center border-b-2  overflow-hidden focus-within:h-16 ${input} transition: ease-in-out duration-300 delay-100`}
      >
        <div
          className={`w-2/12 text-xs h-full text-center self-center justify-self-center flex flex-col justify-content items-center ${
            theme !== "dark" ? "text-gray-600" : "text-gray-200"
          } ${input}`}
        >
          <button
          onClick={handleClick}
            className={`clear mb-2 mt-2 w-24 h-10 justify-self-center self-center border-solid border-2 hover:-translate-y-1 rounded-s rounded-e transition ease-in-out duration-300 hover:cursor-pointer hover:transition-transform hover:duration-300 hover:ease-in-out  ${specifies.button}`}
          >
            Add
          </button>
        </div>
        <input
          value={title === "Expenses" ? expenses.title : incomes.title}
          onChange={(e) => {
            title === "Expenses"
              ? expenses.setTitle(e.target.value)
              : incomes.setTitle(e.target.value);
          }}
          className={`pl-3 basis=6/12 w-4/12 text-xs border-l-2 h-full ${
            theme !== "dark"
              ? "text-gray-600 placeholder:text-gray-600"
              : "text-gray-200 placeholder:text-gray-200"
          } ${input} focus:outline-none  ${title + "title"}`}
          placeholder="title"
        />
        <select
        value={title === "Expenses" ? expenses.category : incomes.category}
        onChange={(e) => title === "Expenses" ? expenses.setCategory(e.target.value) : incomes.setCategory(e.target.value)}
          className={`hover:border-0 focus:border-0 pl-3 w-3/12 basis-3/12 text-xs border-l-2 h-full border-r-2 ${
            theme !== "dark" ? "text-gray-600" : "text-gray-200"
          } ${input} focus:outline-none hover:outline-none hover:cursor-pointer`}
        >
          <option value="----select category----">
            ----select category----
          </option>
          {categories?.map((cat, index) => ( cat.category !=='other' &&
            <option
              key={index}
              className={`cursor-pointer `}
              value={cat.category}
            >
              {cat.category}
            </option>
          ))}
          <option value="other">
            other
          </option>
        </select>
        <input
          value={title === "Expenses" ? expenses.amount : incomes.amount}
          type="number"
          onChange={(e) => {
            const newValue =
              Number(e.target.value) >= 0 ? Number(e.target.value) : 0;
            if (title === "Expenses") {
              expenses.setAmount(newValue);
            } else {
              incomes.setAmount(newValue);
            }
          }}
          className={`pl-3 w-3/12 basis-3/12 text-xs h-full ${
            theme !== "dark"
              ? "text-gray-600 placeholder:text-gray-600"
              : "text-gray-200 placeholder:text-gray-200"
          } ${input} focus:outline-none `}
          placeholder="amount"
        />
      </div>
      {/* titles */}
      <div
        className={` flex w-full h-7 content-center border-b-2  overflow-hidden ${input} `}
      >
        <p
          className={`basis-2/12 text-xs text-center h-7 text-gray-400 ${input}`}
        >
          date
        </p>
        <p
          className={` basis-4/12 text-xs text-center border-l-2 h-7 text-gray-400 ${input}`}
        >
          title
        </p>
        <p
          className={` basis-3/12 text-xs text-center border-l-2 h-7 border-r-2 text-gray-400 ${input}`}
        >
          category
        </p>
        <p
          className={` basis-3/12 text-xs text-center h-7 text-gray-400 ${input}`}
        >
          amount
        </p>
      </div>
      <Scrollbars style={{ height: "100%" }}>{children}</Scrollbars>
    </div>
  );
};
