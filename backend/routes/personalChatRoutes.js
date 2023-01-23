import express from 'express'
import { accessChats, fetchChats } from '../controllers/personalChatControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const personalChatRouter = express.Router()

personalChatRouter.post("/access-chat",verifyToken,accessChats)
personalChatRouter.get("/fetch-chats",verifyToken,fetchChats)
export default personalChatRouter