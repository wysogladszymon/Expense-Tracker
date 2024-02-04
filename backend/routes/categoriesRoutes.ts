import express from "express";
import {createCategory,  createDefaultCategory,  deleteAllCategories, deleteDefaultCategories, showAllCategories } from "../controllers/categoryController";

const router = express.Router();

//add category
router.post("/",createCategory);

//delete all categories 
router.delete("/", deleteAllCategories);

//show all
router.get('/', showAllCategories);



//---------------------admin functions-------------------------------
//add default category
router.post('/adminadd',createDefaultCategory);

//delete user categories
router.delete('/admindelete',deleteDefaultCategories);

export default router;