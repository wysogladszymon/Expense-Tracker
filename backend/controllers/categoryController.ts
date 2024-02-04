import { Category } from "../models/categoryModel";
import mongoose from "mongoose";
import { MyRequest, MyResponse } from "../types/Requests";

//create user category
export async function createCategory(req: MyRequest, res: MyResponse) {
  console.log(req.body.category);
  const { user } = req;
  const category: string = req.body.category.toLowerCase();

  if (!category) return res.status(400).json({ message: "Invalid Category" });

  const find = categoryExists(category);
  if (!find) return res.status(400).json({ message: "Category already exists" });

  const response = await Category.create({ category, user: "user", user_id:user });
  response
    ? res.status(200).json(response)
    : res.status(400).json({ message: "Invalid Category" });
}

//delete all user categories
export async function deleteAllCategories(req: MyRequest, res: MyResponse) {
  const mongoUri: string = process.env.MONGO_URI as string;
  const {user} = req;

  try {
    await Category.deleteMany({ user: "user",user_id:user });
    console.log("Categories deleted succesfully");
    res.status(400).json({ message: "Categories deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Categories");
    throw Error(error.message);
  }
}

//delete Category
export async function deleteCategory(req: MyRequest, res: MyResponse) {
  const {user} = req;
  const category: string = req.body.category.toLowerCase();

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(404).json({ message: "No such Category" });
  }
  const cat = await Category.findOneAndDelete({ category,user_id:user, user: "user" });

  cat
    ? res.status(200).json({ message: "Workout deleted succesfully" })
    : res.status(404).json({ message: "No such Category" });
}

//get categories
export async function showAllCategories(req: MyRequest, res: MyResponse) {
  const { user } = req;

  //show all categories and sort them by alphabet
  const cats = await Category.find({ user_id: user }).sort({
    user: 1,
    category: 1,
  });
  const defs = await Category.find({ user: "default" }).sort({
    user: 1,
    category: 1,
  });

  res.status(200).json([...defs, ...cats]);
}

export async function categoryExists(
  category: string,
  user_id: string = ""
): Promise<boolean> {
  category = category && category.toLowerCase();
  let cat: Array<Object> = [];

  if (user_id) cat = await Category.find({ category, user_id: user_id });
  const def = await Category.find({ category, user: "default" });
  cat = [...cat, ...def];

  return cat ? true : false;
}

//------------------------------admin functions------------------------------------------

//create Default Category => for admin only for test purposes
export async function createDefaultCategory(req: MyRequest, res: MyResponse) {
  const category: string = req.body.category.toLowerCase();

  if (!category) return res.status(400).json({ message: "Invalid Category" });

  const find = categoryExists(category);
  if (!find) return res.status(400).json({ message: "Category already exists" });

  const response = await Category.create({ category, user: "default",user_id:'default' });
  response
    ? res.status(200).json(response)
    : res.status(400).json({ message: "Invalid Category" });
}

//delete all admin categories
export async function deleteDefaultCategories(req: MyRequest, res: MyResponse) {
  const mongoUri: string = process.env.MONGO_URI as string;

  try {
    await Category.deleteMany({ user: "default" });
    console.log("Categories deleted succesfully");
    res.status(400).json({ message: "Categories deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Categories");
    throw Error(error.message);
  }
}
