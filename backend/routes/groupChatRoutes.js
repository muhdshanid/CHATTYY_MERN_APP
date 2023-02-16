import express from 'express'
import { accessGroupChats, addMembers, fetchGroupChats, getUsersToAdd, removeUser, updateGroup } from '../controllers/groupChatControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const groupChatRouter = express.Router()

groupChatRouter.post("/access-group-chat",verifyToken,accessGroupChats)
groupChatRouter.get("/fetch-group-chats",verifyToken,fetchGroupChats)
groupChatRouter.put("/edit-group/:id",verifyToken,updateGroup)
groupChatRouter.put("/remove-member",verifyToken,removeUser)
groupChatRouter.put("/add-members",verifyToken,addMembers)
groupChatRouter.get("/users-to-add/:groupId",verifyToken,getUsersToAdd)
export default groupChatRouter