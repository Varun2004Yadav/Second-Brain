import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { userMiddleware } from "./middlewares/usermiddleware";
import {ContentModel, userModel} from "./db"
import { LinkModel } from "./db";
import { random } from "./utils";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const jwtPassword = process.env.JWT_USER_PASSWORD;
if (!jwtPassword) {
  throw new Error(" JWT_USER_PASSWORD is not defined in the .env file.");
}
const mongoUrl = process.env.MONGO_URL as string;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in the .env file.");
}

app.post('/api/v1/signup',async (req,res) => {
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



app.post("/api/v1/signin", async (req,res) => {
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email:email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id, 
        },jwtPassword);
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


app.post("/api/v1/content", userMiddleware,async (req,res)=> {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "Content Added"
    })

})

app.get("/api/v1/content",userMiddleware, async (req,res) => {

    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "email");

    res.json({
        content
    })
})

app.delete("/",async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req,res) =>{
    const share = req.body.share;
    if(share){
       const existingLink = await LinkModel.findOne({
            userId: req.userId
        })

        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
        }


       const hash = random(10);
       await LinkModel.create({
            userId: req.userId,
            hash: hash,
        })

    res.json({
        message: `/share/${hash}`
    })

    }else{
       await LinkModel.deleteOne({
        userId: req.userId

        });
        res.json({
        message: "Removed Link"
    })
    }

    


})

app.get("/api/v1/brain/:shareLink", async (req,res) => {

    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message:"Sorry incorrect Input"
        })
        return;
    }

    //userId
    const content = await ContentModel.find({
        userId: link.userId,
    })

    console.log(link);
    const user = await userModel.findOne({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "User Not found "
        })
    }

    res.json({
        email: user?.email,
        content: content
    })
})



async function main(){
    await mongoose.connect(mongoUrl);
    app.listen(3000);
    console.log("Listening on Port 3000");
}
main();
