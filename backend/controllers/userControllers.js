import asyncHandler from "express-async-handler";
import UserModel from '../models/UserModel.js'


export const searchUsers = asyncHandler(async(req,res)=>{
   try {
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    } : {}

    const users =  await UserModel.find(keyword).find({_id:{$ne:req.userId}})
    res.status(200).json(users)
   } catch (error) {
    res.status(500);
    throw new Error(error.message);
   }
})
export const updateUser = asyncHandler(async(req,res)=>{
   try {
    const user = await UserModel.findById(req.userId)
    if(user){
        const updateUser = await UserModel.findByIdAndUpdate(req.userId,req.body,{new:true}).select("-password")
        return res.status(200).json({user:updateUser})
    }else{
        return res.status(404).json("User not found")
    }
   } catch (error) {
    res.status(500);
    throw new Error(error.message);
   }
    
})