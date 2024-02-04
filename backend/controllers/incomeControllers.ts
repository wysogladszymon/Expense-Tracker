import { Finanse } from "../models/finanseModel";
import { MyRequest, MyResponse } from "../types/Requests";

import mongoose from "mongoose";
import { Category } from "../models/categoryModel";
import { categoryExists } from "./categoryController";

//get all incomes
export async function showAllIncomes(req: MyRequest, res: MyResponse) {
  const {user} = req;

  //show all incomes and sort them by their date
  const incomes = await Finanse.find({user_id:user, finanse: "income" }).sort({
    createdAt: -1,
  });

  res.status(200).json(incomes);
}

//get a single income
export async function showIncome(req: MyRequest, res: MyResponse) {

  //get id from req.params (from the path)
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such income" });
  }

  const income = await Finanse.findById(id);

  income
    ? res.status(200).json(income)
    : res.status(400).json({ message: "No such income" });
}

//create income
export async function createIncome(req: MyRequest, res: MyResponse) {

  const {user} = req;

  //get attributes send in json
  console.log("Create income");
  const { title, amount } = req.body;

  //check if it is valid
  let emptyFields = [];
  !title && emptyFields.push("title");
  !amount && emptyFields.push("amount");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all the fields", emptyFields });
  }
  let category: string = req.body.category;
  category = category && category.toLowerCase();

  const categoryExists = await Category.find({category});
  if (!categoryExists) return res.status(400).json({message: "Category not found"});
  //add to dB
  try {
    const income = await Finanse.create({
      title,
      amount,
      finanse: "income",
      category: category ? category : "other",
      user_id:user,
    });
    res.status(200).json(income);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

//delete income
export async function deleteIncome(req: MyRequest, res: MyResponse) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such income" });
  }
  const income = await Finanse.findOneAndDelete({ _id: id });

  income
    ? res.status(200).json({ message: "Income deleted succesfully" })
    : res.status(404).json({ message: "No such income" });
}

//update income
export async function updateIncome(req: MyRequest, res: MyResponse) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such income" });
  }

  let category: string = req.body.category;
  category = category && category.toLowerCase();

  if (category && !categoryExists(category)) return res.status(400).json({message: "Category not found"});

  const income = await Finanse.findByIdAndUpdate(id, { ...req.params });

  income
    ? res.status(404).json(income)
    : res.status(404).json({ message: "Failed to update" });
}

//delete all incomes
export async function deleteAllIncomes(req: MyRequest, res: MyResponse) {
  const mongoUri: string = process.env.MONGO_URI as string;
  const {user} = req;
  try {
    await Finanse.deleteMany({user_id:user, finanse: "income" });
    console.log("incomes deleted succesfully");
    res.status(400).json({ message: "incomes deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all incomes");
    throw Error(error.message);
  }
}
