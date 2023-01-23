import express from 'express'
import { allMessages, createMessage } from '../controllers/personalMessgesControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const personalMessageRouter = express.Router()

personalMessageRouter.post("/create-msg",verifyToken,createMessage)
personalMessageRouter.get("/get-msgs/:chatId",verifyToken,allMessages)
export default personalMessageRouter