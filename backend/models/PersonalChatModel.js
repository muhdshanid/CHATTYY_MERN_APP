import mongoose from "mongoose";

const personalChatSchema = new mongoose.Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PersonalMessage"
    },
},{
    timestamps:true
})

const PersonalChatModel = mongoose.model("PersonalChat",personalChatSchema)

export default PersonalChatModel