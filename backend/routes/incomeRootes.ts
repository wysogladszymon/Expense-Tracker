import express from "express";
import { showAllIncomes, showIncome, createIncome,deleteIncome, updateIncome,deleteAllIncomes } from "../controllers/incomeControllers";

const router = express.Router();

//get all Incomes
router.get('/',showAllIncomes);

//get a single Income
router.get('/:id',showIncome);

//post a new Income
router.post('/', createIncome);

//delete a single Income
router.delete('/:id', deleteIncome);

//delete all Incomes
router.delete('/', deleteAllIncomes);

//update an Income
router.patch('/:id', updateIncome);


export default router;