import express from 'express'
import { accessGroupChats, fetchGroupChats } from '../controllers/groupChatControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const groupChatRouter = express.Router()

groupChatRouter.post("/access-group-chat",verifyToken,accessGroupChats)
groupChatRouter.get("/fetch-group-chats",verifyToken,fetchGroupChats)
export default groupChatRouter