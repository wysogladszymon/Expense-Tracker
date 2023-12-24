import mongoose from "mongoose";

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
  category: {
    type: String,
    enum: ["expense", "income"],
    required: true,
  },
  user_id:{
    type:String,
    required: true,
  }
}, {timestamps: true});

//timestamps is arg that adds date to our database

export const Finanse = mongoose.model('Finanse', finanseSchema);