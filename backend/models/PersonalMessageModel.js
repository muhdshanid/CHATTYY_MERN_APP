import mongoose from "mongoose";

const personalMessageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"PersonalChat"},
},{
    timestamps:true
})

const PersonalMessageModel = mongoose.model("PersonalMessage",personalMessageSchema)

export default PersonalMessageModel