import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"GroupChat"},
},{
    timestamps:true
})

const GroupMessageModel = mongoose.model("GroupMessage",groupMessageSchema)

export default GroupMessageModel