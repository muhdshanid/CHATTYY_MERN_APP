import express from 'express'
import { allGroupMessages, createMessage } from '../controllers/groupMessgesControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const groupMessageRouter = express.Router()

groupMessageRouter.post("/create-msg",verifyToken,createMessage)
groupMessageRouter.get("/get-msgs/:groupChatId",verifyToken,allGroupMessages)
export default groupMessageRouter