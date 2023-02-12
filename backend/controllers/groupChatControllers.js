import asyncHandler from "express-async-handler";
import GroupChatModel from "../models/GroupChatModel.js";
import UserModel from "../models/UserModel.js";

export const accessGroupChats = asyncHandler(async (req, res) => {
    try {
        const {groupName} = req.body
        let groupMembers = JSON.parse(req.body.groupMembers)
    var isGroupExist = await GroupChatModel.find({groupName})
    .populate("groupMembers","-password").populate("latestMessage")
    isGroupExist = await UserModel.populate(isGroupExist,{
        path:"latestMessage.sender",
        select:"name profile email"
    })
    if(isGroupExist.length > 0){
        return res.status(200).json(isGroupExist[0])
    }else{
        const user = await UserModel.findById(req.userId)
        groupMembers.push(user)
        const groupProfile = req.body.groupProfile
        const description = req.body.description ? req.body.description : ""
        const newGroup = await GroupChatModel.create({
            groupName,
            groupAdmin:user,
            groupMembers,
            groupProfile,
            description,
        })
        const allGroupChats = await GroupChatModel
        .findOne({_id:newGroup._id})
        .populate("groupMembers","-password").populate("groupAdmin","-password")
        return res.status(201).json(allGroupChats)
    }
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
    
});
export const fetchGroupChats = asyncHandler(async (req, res) => {
    try {
     let allGroupChats = await 
     GroupChatModel
     .find({groupMembers:{$elemMatch:{$eq:req.userId}}})
     .populate("groupMembers","-password")
     .populate("latestMessage").
     sort({updatedAt:-1})
     allGroupChats = await UserModel.populate(allGroupChats,{
        path:"latestMessage.sender",
        select:"name profile email"
     })
     return res.status(200).json(allGroupChats)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
    
});
