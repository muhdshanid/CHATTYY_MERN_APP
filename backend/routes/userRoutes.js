import express from 'express'
import { searchUsers, updateUser } from '../controllers/userControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const userRouter = express.Router()

userRouter.get("/search",verifyToken,searchUsers)
userRouter.put("/update",verifyToken,updateUser)
export default userRouter