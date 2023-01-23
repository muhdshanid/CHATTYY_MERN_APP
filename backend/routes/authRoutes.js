import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.js'
const authRouter = express.Router()

authRouter.post("/signup",registerUser)
authRouter.post("/login",loginUser)
export default authRouter