import asyncHandler from "express-async-handler";
import PersonalMessageModel from "../models/PersonalMessageModel.js";
import UserModel from "../models/UserModel.js";
import PersonalChatModel from "../models/PersonalChatModel.js";
import dotenv from 'dotenv'
dotenv.config()

export const createMessage = asyncHandler(async (req, res) => {
  try {
    const { message, chatId } = req.body;
    if (!message || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
    let msg = {
      sender: req.userId,
      message,
      chat: chatId,
    };
    let newMessage = 
    await PersonalMessageModel.create(msg);
    newMessage = await newMessage.populate("sender", "name profile email");
    newMessage = await newMessage.populate("chat");
    newMessage = await UserModel.populate(newMessage, {
      path: "chat.users",
      select: "name profile email",
    });
    await PersonalChatModel.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });
    return res.status(200).json(newMessage);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
export const allMessages = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.params;
    const allMessages = await 
    PersonalMessageModel.find({ chat: chatId })
    .populate("sender","name profile email")
    .populate("chat").sort({updatedAt:1});
    return res.status(200).json(allMessages)
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
export const uploadAudio = asyncHandler(async(req,res)=> {
  try {
    let filePath = "";
    if (req.file.filename) {
      filePath = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.AUDIO_PATH}/${req.file.filename}`;
    }
    if(filePath !== ""){
      const { chatId } = req.params;
      let message = {
        sender: req.userId,
        audioPath:filePath,
        chat: chatId,
      };
      let newMessage = 
    await PersonalMessageModel.create(message);
    newMessage = await newMessage.populate("sender", "name profile email");
    newMessage = await newMessage.populate("chat");
    newMessage = await UserModel.populate(newMessage, {
      path: "chat.users",
      select: "name profile email",
    });
    await PersonalChatModel.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });
    return res.status(200).json(newMessage);

    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})
export const uploadImage = asyncHandler(async(req,res)=> {
  try {
    let filePath = "";
    if (req.file.filename) {
      filePath = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.IMAGE_MSG_PATH}/${req.file.filename}`;
    }
    if(filePath !== ""){
      const { chatId } = req.params;
      let message = {
        sender: req.userId,
        imageUrl:filePath,
        chat: chatId,
      };
      let newMessage = 
    await PersonalMessageModel.create(message);
    newMessage = await newMessage.populate("sender", "name profile email");
    newMessage = await newMessage.populate("chat");
    newMessage = await UserModel.populate(newMessage, {
      path: "chat.users",
      select: "name profile email",
    });
    await PersonalChatModel.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });
    return res.status(200).json(newMessage);

    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})
