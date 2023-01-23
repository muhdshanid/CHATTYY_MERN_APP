import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema({
    groupName:{
        type:String,
        trim:true,
        unique:true
    },
    groupMembers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    adminOnly:{
        type:Boolean,
        default:false
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupMessage"
    },
    description:String,
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const GroupChatModel = mongoose.model("GroupChat",groupChatSchema)

export default GroupChatModel