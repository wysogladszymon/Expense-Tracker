import express from "express";
import { updateUser, loginUser, signupUser, deleteUser, clearAllUsers } from "../controllers/authFunctions";

const router = express.Router();

//login
router.post('/login', loginUser);

// signup
router.post('/signup',signupUser);

//delete user from db
router.delete('/:id', deleteUser);

//update user in db
router.patch('/:id', updateUser);

//delete all => for testing purposes
router.delete('/', clearAllUsers);

export default router;