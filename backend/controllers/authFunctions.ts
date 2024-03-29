import { User } from "../models/userModel";
import { MyRequest, MyResponse } from "../types/Requests";;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export function createToken(_id: string) {
  const word: string = process.env.SECRET as string;
  return jwt.sign({ _id }, word, { expiresIn: "3d" });
}
//signs up user
export async function signupUser(req: MyRequest, res: MyResponse) {
  console.log("signup");
  const { email, password, username } = req.body;

  try {
    //add send to database ande respond it
    const user = await User.signup(email, password, username);

    const token = createToken(user._id);
    res.status(200).json({ email, token, username });
  } catch (error: any) {
    console.log(error.message);
    // throw error;
    res.status(400).json({ message: error.message });
  }
}

//login user
export async function loginUser(req: MyRequest, res: MyResponse) {
  console.log("login");
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.login(emailOrUsername, password);

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token: token, username:user.username });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

//delete user
export async function deleteUser(req: MyRequest, res: MyResponse) {
  console.log("delete");
}

//update user
export async function updateUser(req: MyRequest, res: MyResponse) {
  console.log("update");
}

//clear all collections => required in testing
export async function clearAllUsers(req: MyRequest, res: MyResponse) {
  const mongoUri: string = process.env.MONGO_URI as string;

  if (mongoose.connection.readyState === 1) console.log("Connected to MongoDB");
  else {
    await mongoose.connect(mongoUri);
    console.log("Connecting... and connected to dB");
  }
  //if we are finally connected
  try {
    await User.deleteMany({});
    console.log("Users deleted succesfully");
    res.status(400).json({ msg: "Users deleted succesfully" });
  } catch (error: any) {
    console.log("Failed to delete all Users");
    throw Error(error.message);
  }
}

//get all users
export async function showAllUsers(req: MyRequest, res: MyResponse) {
  //show all Users and sort them by alphabet
  const users = await User.find({}).sort({
    email: 1,
  });

  res.status(200).json(users);
}
