import mongoose, { Model } from "mongoose";
import { ICategory } from "../types/types";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category:{
        type: String,
        required:true,
        unique: true
    },
    user: {
        type:String,
        required: true,
        enum: ['default', 'user']
    }
});

export const Category : Model<ICategory> = mongoose.model<ICategory>('Category',categorySchema);