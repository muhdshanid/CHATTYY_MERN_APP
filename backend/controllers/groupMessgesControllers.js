import asyncHandler from "express-async-handler";
import GroupMessageModel from "../models/GroupMessageModel.js";
import UserModel from "../models/UserModel.js";
import GroupChatModel from "../models/GroupChatModel.js";

export const createMessage = asyncHandler(async (req, res) => {
  try {
    const { message, groupChatId } = req.body;
    if (!message || !groupChatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
    let msg = {
      sender: req.userId,
      message,
      chat: groupChatId,
    };
    let newMessage = await GroupMessageModel.create(msg);
    newMessage = await newMessage.populate("sender", "name profile email");
    newMessage = await newMessage.populate("chat");
    newMessage = await UserModel.populate(newMessage, {
      path: "chat.groupMembers",
      select: "name profile email",
    });
    await GroupChatModel.findByIdAndUpdate(groupChatId, {
      latestMessage: newMessage,
    });
    return res.status(200).json(newMessage);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
export const allGroupMessages = asyncHandler(async (req, res) => {
  try {
    const { groupChatId } = req.params;
    const allGroupMessages = await 
    GroupMessageModel.find({ chat: groupChatId })
    .populate("sender","name profile email")
    .populate("chat").sort({updatedAt:1});
    return res.status(200).json(allGroupMessages)
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
