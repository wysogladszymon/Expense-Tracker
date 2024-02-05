import { Finanse } from "../models/finanseModel";
import { MyRequest, MyResponse } from "../types/Requests";

import mongoose from "mongoose";
import { categoryExists } from "./categoryController";
//get all expenses
export async function showAllExpenses(req: MyRequest, res: MyResponse) {
  const { user } = req;
  //show all expenses and sort them by their date
  const expenses = await Finanse.find({
    user_id: user,
    finanse: "expense",
  }).sort({
    createdAt: -1,
  });

  res.status(200).json(expenses);
}

//get a single expense
export async function showExpense(req: MyRequest, res: MyResponse) {
  //get id from req.params (from the path)
  const { id } = req.params;

  const { user } = req;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such Expense" });
  }
  
  const expense = await Finanse.find({_id:id, user_id:user})
  expense
    ? res.status(200).json(expense)
    : res.status(400).json({ message: "No such Expense" });
}

//create expense
export async function createExpense(req: MyRequest, res: MyResponse) {
  const { user } = req;

  //get attributes send in json
  console.log("Create Expense");
  const { title, amount } = req.body;

  //check if it is valid
  let emptyFields = [];
  !title && emptyFields.push("title");
  !amount && emptyFields.push("amount");

  let category: string = req.body.category;

  category = category && category.toLowerCase();

  if (!categoryExists(category))
    return res.status(400).json({ message: "Category doesn't exist" });

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all the fields", emptyFields });
  }

  //add to dB
  try {
    const expense = await Finanse.create({
      title,
      amount,
      finanse: "expense",
      category: category ? category : "other",
      user_id:user,
    });
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

//delete expense
export async function deleteExpense(req: MyRequest, res: MyResponse) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such Expense" });
  }
  const expense = await Finanse.findOneAndDelete({ _id: id });

  expense
    ? res.status(200).json({ message: "Expense deleted succesfully" })
    : res.status(404).json({ message: "No such Expense" });
}

//update expense
export async function updateExpense(req: MyRequest, res: MyResponse) {
  const { id } = req.params;
  const category = req.body.categories;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such expense" });
  }

  const expense = await Finanse.findByIdAndUpdate(id, { ...req.params });

  expense
    ? res.status(404).json(expense)
    : res.status(404).json({ message: "Failed to update" });
}

//delete all expenses
export async function deleteAllExpenses(req: MyRequest, res: MyResponse) {
  const mongoUri: string = process.env.MONGO_URI as string;

  try {
    await Finanse.deleteMany({ finanse: "expense" });
    console.log("Expenses deleted succesfully");
    res.status(400).json({ message: "Expenses deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Expenses");
    throw Error(error.message);
  }
}
