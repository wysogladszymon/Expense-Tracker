import { Category } from "../models/categoryModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

//create user category
export async function createCategory(req: Request, res: Response) {
  console.log(req.body.category);
  
  const category: string = req.body.category.toLowerCase();

  if (!category) return res.status(400).json({ error: "Invalid Category" });

  const find = categoryExists(category);
  if (!find) return res.status(400).json({ error: "Category already exists" });

  const response = await Category.create({ category, user: "user" });
  response
    ? res.status(200).json(response)
    : res.status(400).json({ error: "Invalid Category" });
}

//delete all user categories
export async function deleteAllCategories(req: Request, res: Response) {
  const mongoUri: string = process.env.MONGO_URI as string;

  try {
    await Category.deleteMany({ user: "user" });
    console.log("Categories deleted succesfully");
    res.status(400).json({ msg: "Categories deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Categories");
    throw Error(error.message);
  }
}

//delete Category
export async function deleteCategory(req: Request, res: Response) {
  const category: string = req.body.category.toLowerCase();

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(404).json({ error: "No such Category" });
  }
  const cat = await Category.findOneAndDelete({ category, user: "user" });

  cat
    ? res.status(200).json({ msg: "Workout deleted succesfully" })
    : res.status(404).json({ error: "No such Category" });
}

//get categories
export async function showAllCategories(req: Request, res: Response) {
  //show all categories and sort them by alphabet
  const cats = await Category.find({}).sort({
    user: 1,
    category: 1,
  });

  res.status(200).json(cats);
}

export async function categoryExists(category: string): Promise<boolean> {
  category = category && category.toLowerCase();

  const cat = await Category.find({ category });
  const categoryExists = cat ? true : false;
  return categoryExists;
}

//------------------------------admin functions------------------------------------------

//create Default Category => for admin only for test purposes
export async function createDefaultCategory(req: Request, res: Response) {
  const category: string = req.body.category.toLowerCase();

  if (!category) return res.status(400).json({ error: "Invalid Category" });

  const find = categoryExists(category);
  if (!find) return res.status(400).json({ error: "Category already exists" });

  const response = await Category.create({ category, user: "default" });
  response
    ? res.status(200).json(response)
    : res.status(400).json({ error: "Invalid Category" });
}

//delete all admin categories
export async function deleteDefaultCategories(req: Request, res: Response) {
  const mongoUri: string = process.env.MONGO_URI as string;

  try {
    await Category.deleteMany({ user: "default" });
    console.log("Categories deleted succesfully");
    res.status(400).json({ msg: "Categories deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Categories");
    throw Error(error.message);
  }
}
