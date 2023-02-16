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

export const updateGroup = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
     const group = await GroupChatModel.findById(id)
     if(group){
         const updatedGrop = await GroupChatModel.findByIdAndUpdate(id,req.body,{new:true}) .populate("groupMembers","-password").populate("latestMessage")
         return res.status(200).json(updatedGrop)
     }else{
         return res.status(404).json("group not found")
     }
    } catch (error) {
     res.status(500);
     throw new Error(error.message);
    }
     
 })
export const removeUser = asyncHandler(async(req,res)=>{
    try {
    const {userId,groupId} = req.body
    const user = await UserModel.findById(req.userId)
     const group = await GroupChatModel.findById(groupId)
     if(user._id.toString() === group.groupAdmin.toString()){
         const updatedGrop = await GroupChatModel.findByIdAndUpdate(groupId,{$pull:{groupMembers:userId}},{new:true}) .populate("groupMembers","-password").populate("latestMessage")
         return res.status(200).json(updatedGrop)
     }else{
         return res.status(404).json("you are not an admin")
     }
    } catch (error) {
     res.status(500);
     throw new Error(error.message);
    }
     
 })
export const addMembers = asyncHandler(async(req,res)=>{
    try {
    const {users,groupId} = req.body
    const user = await UserModel.findById(req.userId)
     const group = await GroupChatModel.findById(groupId)
     if(user._id.toString() === group.groupAdmin.toString()){
         const addMembers = await GroupChatModel.findByIdAndUpdate(groupId,
            { $push: { groupMembers: { $each: users } } },{new:true})
            .populate("groupMembers","-password").populate("latestMessage")
         return res.status(200).json(addMembers)
     }else{
         return res.status(404).json("you are not an admin")
     }
    } catch (error) {
     res.status(500);
     throw new Error(error.message);
    }
     
 })

 export const getUsersToAdd = asyncHandler(async(req,res)=>{
    try {
        const {groupId} = req.params
     const keyword = req.query.search ? {
         $or:[
             {name:{$regex:req.query.search,$options:"i"}},
             {email:{$regex:req.query.search,$options:"i"}}
         ]
     } : {}
     const users =  await UserModel.find(keyword).find({_id:{$ne:req.userId}})
     const groupMembers = await GroupChatModel.findById(groupId).populate("groupMembers","-password")
     const remainingUsers = users.filter(user => {
        return !groupMembers.groupMembers.some(removeUser => removeUser._id.toString() === user._id.toString());
      });
     res.status(200).json(remainingUsers)
    } catch (error) {
     res.status(500);
     throw new Error(error.message);
    }
 })