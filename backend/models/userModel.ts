import mongoose, { Model } from "mongoose"; //package that allows to send data to mongoDB
import bcrypt from "bcrypt";
import {
  isPasswordValid,
  isEmailValid,
  isValidUsername,
} from "../validations/userValid";
import validator from "validator";
import { IUser, IUserModel } from "../types/types";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    required: true,
    type: String,
    unique: true,
  },
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

userSchema.statics.signup = async function (
  email: string,
  password: string,
  userName: string
) {
  if (!email || !password || !userName)
    throw Error("All fields must be filled");

  // if (!isEmailValid(email)) throw Error("Wrong Email!");
  if (!validator.isEmail(email)) throw Error("Wrong Email!");

  // if (!validator.isStrongPassword(password))
  //   throw Error("Your Password is too weak!");
  if (!isPasswordValid(password)) throw Error("Your Password is too weak!");

  if (!isValidUsername(userName)) throw Error("This Username is forbidden!");

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use");

  const userExists = await this.findOne({ userName });
  if (userExists) throw Error("Username already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //add to mongoose
  const user = await this.create({
    email: email,
    password: hash,
    userName: userName,
  });

  return user;
};

//manages logging in
userSchema.statics.login = async function (
  emailOrUsername: string,
  password: string
) {
  if (!emailOrUsername || !password) throw Error("All fields must be filled");

  const user = emailOrUsername.includes("@")
    ? await this.findOne({ email: emailOrUsername })
    : await this.findOne({ userName: emailOrUsername });

  if (!user) throw Error("User not found");

  const userExists: boolean = await bcrypt.compare(password, user.password);

  if (!userExists) throw Error("Wrong Password!");

  return user;
};

//exporting Schema of our objects in dB
export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  userSchema
);
