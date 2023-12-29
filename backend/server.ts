import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/user";
import expenseRouter from "./routes/expenseRootes";
import incomeRouter from "./routes/incomeRootes";
import categoriesRouter from "./routes/categoriesRoutes";
dotenv.config();

//using express.js
const app = express();

//middleware parse into json
app.use(express.json());

//midleware to log request details
app.use((req,res,next) => {
    console.log(`Fetch: ${req.method}      Path: ${req.path}`);
    next();    
})

//routes
app.use("/api/auth", authRouter);
app.use("/api/expense",expenseRouter);
app.use("/api/income",incomeRouter);
app.use("/api/categories", categoriesRouter);
//app.use...


//connect to db
const arg: string = process.env.MONGO_URI as string;
mongoose
  .connect(arg)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and Listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });