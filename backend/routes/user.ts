import express, { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {config} from 'dotenv';
import { updateUser, loginUser, signupUser, deleteUser, clearAllUsers, showAllUsers, createToken } from "../controllers/authFunctions";
import { User } from '../models/userModel';
import {MyRequest, MyResponse} from '../types/Requests'

const router = express.Router();
config();
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

//get all users for testing
router.get('/',showAllUsers);
export default router;


export async function requireAuth(req: MyRequest, res: MyResponse, next: NextFunction){
    console.log(req);
    
    const { authorization } = req.headers;
    console.log("auth: " ,authorization);
    
    const token: string | undefined = authorization && authorization.split(' ')[1];
    console.log("token:" ,token);
    

    try{
        const word: string = process.env.SECRET as string;
        console.log(word);
        
        const {_id} = token && jwt.verify(token, String(process.env.SECRET)) as any;
        
        req.user = await User.findOne({ _id }).select('_id')
        console.log("Token:", token);
        
        next();
    }catch(err : any){
        console.log(err.message);
        
        res.status(403).json({message:"Request is not authorized"})
    }
}
