import asyncHandler from "express-async-handler";
import UserModel from '../models/UserModel.js'
import { comparePassword, createToken, hashedPassword } from "../services/authServices.js";

export const registerUser = asyncHandler(async (req, res) => {

    try {
      const { email } = req.body;
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist ) {
        const hashed = await hashedPassword(req.body.password);
        req.body.password = hashed
        const user = await UserModel.create(req.body);
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(201)
          .json({token,user });
      }
       else {
        //email already taken
       return res
       .status(400)
       .json({
         errors: [{ msg: `${email} is already exist`, param: "email" }],
       });
       
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error");
    }
});

export const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body

        try {
            const user = await UserModel.findOne({email})
            if(user){
                if(await comparePassword(password,user.password)) {
                    const token = createToken({id:user._id,name:user.name})
                    return res.status(200).json({token,user})
                }else{
                    return res.status(400).json({errors:[{msg:`password not matched!`,param:"password"}]})
                }
            }else{
                return res.status(400).json({errors:[{msg:`${email} is not found!`,param:"email"}]})
            } 
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error")
        }
})