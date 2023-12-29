import { User } from "../models/userModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

function createToken(_id: string) {
  const word: string = process.env.SECRET as string;
  return jwt.sign({ _id }, word, { expiresIn: "3d" });
}
//signs up user
export async function signupUser(req: Request, res: Response) {
  console.log("signup");
  const { email, password, userName } = req.body;

  try {
    //add send to database ande respond it
    const user = await User.signup(email, password, userName);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
}

//login user
export async function loginUser(req: Request, res: Response) {
  console.log("login");
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.login(emailOrUsername, password);

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token: token });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
}

//delete user
export async function deleteUser(req: Request, res: Response) {
  console.log("delete");
}

//update user
export async function updateUser(req: Request, res: Response) {
  console.log("update");
}

//clear all collections => required in testing
export async function clearAllUsers(req:Request, res:Response) {
  const mongoUri: string = process.env.MONGO_URI as string;

  if (mongoose.connection.readyState === 1)
    console.log('Connected to MongoDB');  
  else{
    await mongoose.connect(mongoUri);
    console.log('Connecting... and connected to dB');
  }
  //if we are finally connected
  try{
    await User.deleteMany({});
    console.log('Users deleted succesfully');
    res.status(400).json({"msg":'Users deleted succesfully'});
  }
  catch (error:any){
    console.log('Failed to delete all Users');
    throw Error(error.message);
  }
 
}
