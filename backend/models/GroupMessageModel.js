import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    message:{
        type: Map,
        of: String,
    },
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"GroupChat"},
},{
    timestamps:true
})

const GroupMessageModel = mongoose.model("GroupMessage",groupMessageSchema)

export default GroupMessageModel