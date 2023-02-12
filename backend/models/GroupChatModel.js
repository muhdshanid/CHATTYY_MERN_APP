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
    groupProfile:{
        type:String,
        default:"https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png"
    },
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