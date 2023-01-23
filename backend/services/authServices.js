import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const hashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
  };

  export const createToken = (user) =>{
    const token = jwt.sign(user,JWT_SECRET,{
        expiresIn:"7d"
       })
       return token
}

export const comparePassword = async (password,dbPassword) => {
  return await bcrypt.compare(password,dbPassword)
}