import { Router } from "express";
import jwt from "jsonwebtoken"
import {userModel} from "../db"
import { userMiddleware } from "../middlewares/usermiddleware";

export const  JWT_USER_PASSWORD="this is the secret key"

export const userRouter = Router();

userRouter.post('/signup',async (req,res) => {
    const {email,password} = req.body;
try{
    await userModel.create({
        email:email,
        password:password
    })
    res.status(200).json({
        message: "Singup Successful"
    })
}catch(e){
    res.status(411).json({
        message:"User Already Exist"
    })
}
    console.log(`Email: ${email} Password: ${password}`);
})



userRouter.post("/signin", async (req,res) => {
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email:email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id, 
        },JWT_USER_PASSWORD);
        console.log(token);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
    
})
