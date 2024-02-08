import { Finanse } from "../types";

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const countMonthFinanse = (
  finanses: Finanse[],
  date: Date
): number[] => {
  const month = date.getMonth();
  const days = howManyDays(date);
  let result: number[] = Array(days).fill(0);
  for (const finanse of finanses) {
    if (
      new Date(finanse.createdAt).getFullYear() !== date.getFullYear() ||
      new Date(finanse.createdAt).getMonth() !== month
    )
      continue;

    result[new Date(finanse.createdAt).getDate() - 1] += Math.abs(
      finanse.amount
    );
  }
  return result;
};

export const countYearFinanse = (finanses: Finanse[], date: Date): number[] => {
  let result: number[] = Array(12).fill(0);
  for (const finanse of finanses) {
    if (new Date(finanse.createdAt).getFullYear() !== date.getFullYear())
      continue;

    result[new Date(finanse.createdAt).getMonth()] += Math.abs(finanse.amount);
  }
  return result;
};

export const countMonthBilance = (
  earnings: Finanse[],
  expenses: Finanse[],
  date: Date
): number[] => {
  const month = date.getMonth();
  const days = date.getDate();
  let result: number[] = Array(days).fill(0);
  for (const earning of earnings) {
    if (
      new Date(earning.createdAt).getFullYear() !== date.getFullYear() ||
      new Date(earning.createdAt).getMonth() !== month
    )
      continue;

    result[new Date(earning.createdAt).getDate() - 1] += Math.abs(
      earning.amount
    );
  }
  for (const expense of expenses) {
    if (
      new Date(expense.createdAt).getFullYear() !== date.getFullYear() ||
      new Date(expense.createdAt).getMonth() !== month
    )
      continue;

    result[new Date(expense.createdAt).getDate() - 1] -= Math.abs(
      expense.amount
    );
  }
  for (let i = 1; i < days; i++) {
    result[i] += result[i - 1];
  }

  return result;
};

export const countYearBalance = (
  earnings: Finanse[],
  expenses: Finanse[]
): number[] => {
  const today = new Date();
  const month = today.getMonth();
  let result = Array(month + 1).fill(0);

  for (const earning of earnings) {
    result[new Date(earning.createdAt).getMonth()] += Math.abs(earning.amount);
  }
  for (const expense of expenses) {
    result[new Date(expense.createdAt).getMonth()] -= Math.abs(expense.amount);
  }
  for (let i = 1; i < month + 1; i++) {
    result[i] += result[i - 1];
  }
  return result;
};

export const howManyDays = (date: Date): number => {
  const month = date.getMonth();
  const year = date.getFullYear();
  if (month === 1) return year % 4 === 0 ? 29 : 28;
  if (month % 2 === 1) return month > 6 ? 31 : 30;
  else return month > 6 ? 30 : 31;
};

export const finanseOfCategories = (
  finanses: Finanse[],
  categories: string[]
) => {
  let result: number[] = Array(categories.length).fill(0);
  for (const finanse of finanses) {
    result[categories.indexOf(finanse.category)] += finanse.amount;
  }
  return result;
};
