import { Router } from "express";
import { Jwt } from "jsonwebtoken";
import { userMiddleware } from "../middlewares/usermiddleware";
import { ContentModel } from "../db";
import { userRouter } from "./user";

export const  contentRouter =  Router();

contentRouter.delete("/",async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })
})

contentRouter.post("/api/v1/content", userMiddleware,async (req,res)=> {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "Content Added"
    })

})

contentRouter.get("/api/v1/content",userMiddleware, async (req,res) => {

    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    })
    res.json({
        content
    })
})