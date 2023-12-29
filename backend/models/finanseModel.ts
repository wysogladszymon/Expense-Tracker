import mongoose, { Model } from "mongoose";
import { IFinanse } from "../types/types";
import categories from "../data/categories"; 

const Schema = mongoose.Schema;


const finanseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  finanse: {
    type: String,
    enum: ["expense", "income"],
    required: true,
  },
  category:{
    type: String,
    required: true,
    enum : categories
  }
  // user_id:{
  //   type:String,
  //   required: true,
  // }
}, {timestamps: true});

//timestamps is arg that adds date to our database

export const Finanse: Model<IFinanse> = mongoose.model<IFinanse>('Finanse', finanseSchema);