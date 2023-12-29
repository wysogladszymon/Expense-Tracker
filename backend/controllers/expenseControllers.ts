import { Finanse } from "../models/finanseModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import categories from "../data/categories";

//get all expenses
export async function showAllExpenses(req: Request, res: Response) {
  //show all expenses and sort them by their date
  const expenses = await Finanse.find({ finanse: "expense" }).sort({
    createdAt: -1,
  });

  res.status(200).json(expenses);
}

//get a single expense
export async function showExpense(req: Request, res: Response) {
  //get id from req.params (from the path)
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Expense" });
  }

  const expense = await Finanse.findById(id);

  expense
    ? res.status(200).json(expense)
    : res.status(400).json({ error: "No such Expense" });
}

//create expense
export async function createExpense(req: Request, res: Response) {
  //get attributes send in json
  console.log("Create Expense");
  const { title, amount } = req.body;

  //check if it is valid
  let emptyFields = [];
  !title && emptyFields.push("title");
  !amount && emptyFields.push("amount");

  let category: string = req.body.category;
  
  category = category && category.toLowerCase();
  if (category && !categories.includes(category)) {
    return res.status(400).json({ error: "Wrong Category" });
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add to dB
  try {
    const expense = await Finanse.create({
      title,
      amount,
      finanse: "expense",
      category: category ? category : "other",
    });
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

//delete expense
export async function deleteExpense(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Expense" });
  }
  const expense = await Finanse.findOneAndDelete({ _id: id });

  expense
    ? res.status(200).json({ msg: "Workout deleted succesfully" })
    : res.status(404).json({ error: "No such Expense" });
}

//update expense
export async function updateExpense(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await Finanse.findByIdAndUpdate(id, { ...req.params });

  expense
    ? res.status(404).json(expense)
    : res.status(404).json({ error: "Failed to update" });
}

//delete all expenses
export async function deleteAllExpenses(req: Request, res: Response) {
  const mongoUri: string = process.env.MONGO_URI as string;

  if (mongoose.connection.readyState === 1)
    console.log("You have been already connected to MongoDB");
  else {
    await mongoose.connect(mongoUri);
    console.log("Connected to dB");
  }
  try {
    await Finanse.deleteMany({ finanse: "expense" });
    console.log("Expenses deleted succesfully");
    res.status(400).json({ msg: "Expenses deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Expenses");
    throw Error(error.message);
  }
}
