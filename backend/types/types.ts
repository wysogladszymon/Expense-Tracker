import mongoose, { Model, Document } from "mongoose";
import { Request } from "express";

export interface IUser {
  username: string;
  email: string;
  password: string;
  _id: string;
}

export interface IUserModel extends Model<IUser & Document> {
  signup(
    email: string,
    password: string,
    username: string
  ): Promise<IUser & Document>;

  login(emailOrUsername: string, password: string): Promise<IUser & Document>;
}

export interface IFinanse extends Document {
  title: string;
  amount: number;
  category: "expense" | "income";
  user_id: string;
}

export interface IUserRequest extends Request {
  title: string;
  amount: number;
  category: "expense" | "income";
  user_id: string;
}

export interface ICategory extends Document {
  category: string;
}
