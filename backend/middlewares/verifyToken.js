import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
// import UserModel from '../models/UserModel.js'
dotenv.config()
export const verifyToken = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token  = req.headers.authorization.split(" ")[1]
        try {
            if(token){
                console.log(token);
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                req.userId = decoded.id
                next()
            }else{
                throw new Error("Token is not available")
            }
        } catch (error) {  
            throw new Error("Not authorized token expired,Please login again")
        }
    }else{
        throw new Error("Token is not available")
    }
})

