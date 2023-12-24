import mongoose from "mongoose"; //package that allows to send data to mongoDB

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

//exporting Schema of our objects in dB
export const User = mongoose.model("User", userSchema);
