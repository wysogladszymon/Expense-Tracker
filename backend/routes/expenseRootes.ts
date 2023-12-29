import express from "express";
import { showAllExpenses, showExpense, createExpense,deleteExpense, updateExpense,deleteAllExpenses } from "../controllers/expenseControllers";

const router = express.Router();

//get all expenses
router.get('/',showAllExpenses);

//get a single expense
router.get('/:id',showExpense);

//post a new expense
router.post('/', createExpense);

//delete a single expense
router.delete('/:id', deleteExpense);

//delete all expenses
router.delete('/', deleteAllExpenses);

//update an expense
router.patch('/:id', updateExpense);


export default router;