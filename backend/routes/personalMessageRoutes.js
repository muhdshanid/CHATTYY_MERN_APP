import express from 'express'
import { allMessages, createMessage, uploadAudio, uploadImage } from '../controllers/personalMessgesControllers.js'
import { audioUpload, imageMsgFileUpload } from '../middlewares/uploadHelper.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const personalMessageRouter = express.Router()

personalMessageRouter.post("/create-msg",verifyToken,createMessage)
personalMessageRouter.post("/upload-audio/:chatId",[verifyToken,audioUpload],uploadAudio)
personalMessageRouter.post("/upload-image/:chatId",[verifyToken,imageMsgFileUpload],uploadImage)
personalMessageRouter.get("/get-msgs/:chatId",verifyToken,allMessages)
export default personalMessageRouter