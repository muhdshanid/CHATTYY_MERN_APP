import asyncHandler from "express-async-handler";
import PersonalChatModel from "../models/PersonalChatModel.js";
import UserModel from "../models/UserModel.js";

export const accessChats = asyncHandler(async (req, res) => {
    try {
        const {receiverId} = req.body
    var isExistChat = await PersonalChatModel.find({
        $and:[
            {users:{$elemMatch:{$eq:req.userId}}},
            {users:{$elemMatch:{$eq:receiverId}}},
        ]
    }).populate("users","-password").populate("latestMessage")
    isExistChat = await UserModel.populate(isExistChat,{
        path:"latestMessage.sender",
        select:"name profile email"
    })
    if(isExistChat.length > 0){
        return res.status(200).json(isExistChat[0])
    }else{
        const newChat = await PersonalChatModel.create({
            users:[req.userId,receiverId]
        })
        const allChats = await PersonalChatModel
        .findOne({_id:newChat._id})
        .populate("users","-password")
        return res.status(201).json(allChats)
    }
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
    
});
export const fetchChats = asyncHandler(async (req, res) => {
    try {
     let allChats = await 
     PersonalChatModel
     .find({users:{$elemMatch:{$eq:req.userId}}})
     .populate("users","-password")
     .populate("latestMessage").
     sort({updatedAt:-1})
     allChats = await UserModel.populate(allChats,{
        path:"latestMessage.sender",
        select:"name profile email"
     })
     return res.status(200).json(allChats)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
    
});
