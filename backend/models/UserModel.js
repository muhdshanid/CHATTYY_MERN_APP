import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    about:String,
    profile:String,
    
},{
    timestamps:true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel